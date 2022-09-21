using Leap;
using Leap.Unity;
using UnityEngine;
using TMPro;
using UnityEngine.UI;

public class UnityUI : MonoBehaviour {
    public LeapServiceProvider LeapServiceProvider;
    public GameObject status;
    public GameObject cfps;
    public GameObject left_hand;
    public GameObject right_hand;
    private bool connected = false;

    void Awake() {
        Screen.SetResolution(320, 240, false, 30);
        Application.targetFrameRate = 30;
        QualitySettings.vSyncCount = 0;
    }

    void Update() {
        if (LeapServiceProvider.IsConnected() && !connected) ShowConnected();
        if (!LeapServiceProvider.IsConnected() && connected) ShowDisconnected();

        if (connected) {
            UpdateCurrentFramesPerSecond();
            CheckHandsVisibility();
        }
    }

    public void UpdateCurrentFramesPerSecond() {
        cfps.GetComponent<TextMeshProUGUI>().text = ((int)LeapServiceProvider.CurrentFrame.CurrentFramesPerSecond) + " fps";
    }

    public void ShowConnected() {
        status.GetComponent<TextMeshProUGUI>().text = "<color=#55ff55>Controller connected.</color>";
        right_hand.SetActive(true);
        left_hand.SetActive(true);
        cfps.SetActive(true);
        connected = true;
    }

    public void ShowDisconnected() {
        status.GetComponent<TextMeshProUGUI>().text = "<color=#ff5555>Controller not found.</color>";
        right_hand.SetActive(false);
        left_hand.SetActive(false);
        cfps.SetActive(false);
        connected = false;
    }

    public void CheckHandsVisibility() {
        bool left = false;
        bool right = false;

        foreach (Hand hand in LeapServiceProvider.CurrentFrame.Hands) {
            if (hand.IsLeft) left = true;
            if (hand.IsRight) right = true;
        }

        ShowHandsHighlighted(left, right);
    }

    public void ShowHandsHighlighted(bool left, bool right) {
        UnityEngine.UI.Image left_hand_img = left_hand.GetComponent<UnityEngine.UI.Image>();
        UnityEngine.UI.Image right_hand_img = right_hand.GetComponent<UnityEngine.UI.Image>();
        left_hand_img.color = new Color(255, 255, 255, left ? 1f : 0.25f);
        right_hand_img.color = new Color(255, 255, 255, right ? 1f : 0.25f);
    }
}