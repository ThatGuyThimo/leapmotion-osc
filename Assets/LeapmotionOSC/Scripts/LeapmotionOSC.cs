using Leap;
using Leap.Unity;
using UnityEngine;
using OscCore;

public class LeapmotionOSC : MonoBehaviour {

    public LeapServiceProvider LeapServiceProvider;
    private OscClient Client = new OscClient("127.0.0.1", 9000);
    private void OnEnable() { LeapServiceProvider.OnUpdateFrame += OnUpdateFrame; }
    private void OnDisable() { LeapServiceProvider.OnUpdateFrame -= OnUpdateFrame; }

    void OnUpdateFrame(Frame frame) {
        foreach (Hand hand in frame.Hands) {
            UpdateFingers(hand);
        }
    }

    void UpdateFingers(Hand hand) {
        foreach (Finger finger in hand.Fingers) {
            float dist = Vector3.Distance(finger.TipPosition, hand.PalmPosition);
            string path = (hand.IsLeft ? "left" : "right") + FormatParameter((finger.Type.ToString().Replace("TYPE_", "")).ToLower());

            Client.Send("/avatar/parameters/" + path, dist);
        }
    }

    string FormatParameter(string input) {
        return char.ToUpper(input[0]) + input.Substring(1);
    }

}