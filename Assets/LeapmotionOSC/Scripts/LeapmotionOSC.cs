using Leap;
using Leap.Unity;
using UnityEngine;
using OscCore;

public class LeapmotionOSC : MonoBehaviour {

    public LeapServiceProvider LeapServiceProvider;
    private OscClient Client = new OscClient("127.0.0.1", 9000);
    private void OnEnable() { LeapServiceProvider.OnUpdateFrame += OnUpdateFrame; }
    private void OnDisable() { LeapServiceProvider.OnUpdateFrame -= OnUpdateFrame; }

    readonly static Vector2[] ms_fingerLimits =
        {
            new Vector2(0f, 50f),
            new Vector2(-20f, 30f),
            new Vector2(-15f, 15f),
            new Vector2(-10f, 20f),
            new Vector2(-10f, 25f)
        };

    void OnUpdateFrame(Frame frame) {
        foreach (Hand hand in frame.Hands) {
            UpdateFingers(hand);
        }
    }

    void UpdateFingers(Hand hand) {
        foreach (Finger finger in hand.Fingers) {
            float dist = Vector3.Distance(finger.TipPosition, hand.PalmPosition) * 10;
            string path = (hand.IsLeft ? "left" : "right") + FormatParameter((finger.Type.ToString().Replace("TYPE_", "")).ToLower());
            float spread = (hand.IsLeft ? GetSpreadPosition(finger, false) : GetSpreadPosition(finger, true));

            Debug.Log(spread);

            Client.Send("/avatar/parameters/" + path, dist);
            Client.Send("/avatar/parameters/" + path + "Spread", spread);
        }
    }

    private float GetSpreadPosition(Leap.Finger l_finger, bool isRight)
    {

        float l_angle = 0f;

        Leap.Bone l_parent = l_finger.Bone(Leap.Bone.BoneType.TYPE_METACARPAL);
        Leap.Bone l_child = l_finger.Bone(Leap.Bone.BoneType.TYPE_PROXIMAL);

        Quaternion l_parentRot = new Quaternion(l_parent.Rotation.x, l_parent.Rotation.y, l_parent.Rotation.z, l_parent.Rotation.w);
        Quaternion l_childRot = new Quaternion(l_child.Rotation.x, l_child.Rotation.y, l_child.Rotation.z, l_child.Rotation.w);


        Quaternion l_diff = Quaternion.Inverse(l_parentRot) * l_childRot;

        // Spread - local Y rotation, but thumb is obnoxious
        l_angle = l_diff.eulerAngles.y;
        if (l_angle > 180f)
            l_angle -= 360f;

        if (l_finger.Type != Leap.Finger.FingerType.TYPE_THUMB)
        {
            if (l_angle < 0f)
            {
                return 0.5f * Mathf.InverseLerp(ms_fingerLimits[(int)l_finger.Type].x, 0f, l_angle);
            }
            else
            {
                return 0.5f + 0.5f * Mathf.InverseLerp(0f, ms_fingerLimits[(int)l_finger.Type].y, l_angle);
            }
        }
        else
        {
            if (isRight)
                l_angle *= -1f;

            return Mathf.InverseLerp(ms_fingerLimits[(int)l_finger.Type].x, ms_fingerLimits[(int)l_finger.Type].y, l_angle);
        }
    }

    string FormatParameter(string input) {
        return char.ToUpper(input[0]) + input.Substring(1);
    }

}