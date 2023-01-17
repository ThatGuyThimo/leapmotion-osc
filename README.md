**Disclaimer**: *This project does not support tracking hand position, it's limited to opening and closing each finger into a fist/open hand and spreading your fingers (side to side movement).* It was made as a proof of concept and a first OSC project. For the hand position you need additional controlers or trackers. If you are on PCVR, I recommend using a custom [SteamVR driver](https://github.com/SDraw/driver_leap) instead, as it enables both finger and hand tracking compatible with full body tracking.

# Leap Motion Controller finger tracking for VRChat OSC

Using a Leap Motion Controller from Ultraleap for finger tracking in VRChat.

![preview](https://user-images.githubusercontent.com/70418069/212970688-0c3d9517-9f3f-446d-8107-68ddc13402b5.png)

## Description

This project uses [OscCore](https://github.com/stella3d/OscCore) and the OpenUPM [Ultraleap Unity Plugin](https://openupm.com/packages/com.ultraleap.tracking/), to send finger tracking data from a Leap Motion Controller to VRChat via Open Sound Control.

## Getting Started

### Dependencies

* [Ultraleap Gemini 5.7.2](https://developer.leapmotion.com/tracking-software-download)

## Usage / Installation / Building

### Windows

Download and run the [installer](https://github.com/adeleine1412/leapmotion-osc/releases/download/release-1.1.0/leapmotionosc-1.1.0-windows-installer.exe) file of the latest release. If you want, you can also download the [archive file](https://github.com/adeleine1412/leapmotion-osc/releases/download/release-1.1.0/leapmotionosc-1.1.0-windows.zip) marked as the windows build, unzip it and run the executable file it contains.

### Linux

Download the [archive file](https://github.com/adeleine1412/leapmotion-osc/releases/download/release-1.1.0/leapmotionosc-1.1.0-linux.zip) marked as the linux build, extract it and run the application with:

```console
./LeapmotionOSC.x86_64
```

This is not tested yet, please open a new issue if this does not work.

### Building

If you want to build the project yourself, you will need to clone this respository and install [OscCore](https://github.com/stella3d/OscCore) & Ultraleaps [OpenUPM](https://openupm.com/packages/com.ultraleap.tracking/) (Ultraleap Unity Plugin version 6.1.0). This repository includes a prefab that you can use to set up the latest configuration in your hierarchy. Unity version used for the current release is [Unity 2021.3.16f1](https://unity3d.com/unity/whats-new/2021.3.16).

## Additional notes

### Tracking Mode / Configuration

The tracking optimization for the controllers is set to `HMD`, using Edit Time Pose `Head Mounted A`. This application uses the standard VRChat OSC port `9000`. If there is a discrepancy, you will need to create a new build, as there are no configuration options yet.

## Avatar Setup

Your avatar receives OSC inputs for 20 float parameters that you need to add to your avatar. You also need to create or use the [animation controller provided in the 1.1.0 release](https://github.com/adeleine1412/leapmotion-osc/releases/download/release-1.1.0/leapmotionosc-avatar-animation-controller.unitypackage) to create blendtrees that transition from the animations of each finger.

* leftThumb (float)
* leftIndex (float)
* leftMiddle (float)
* leftRing (float)
* leftPinky (float)
* rightThumb (float)
* rightIndex (float)
* rightMiddle (float)
* rightRing (float)
* rightPinky (float)
* leftThumbSpread (float)
* leftIndexSpread (float)
* leftMiddleSpread (float)
* leftRingSpread (float)
* leftPinkySpread (float)
* rightThumbSpread (float)
* rightIndexSpread (float)
* rightMiddleSpread (float)
* rightRingSpread (float)
* rightPinkySpread (float)

To do this, we created two layers in the gesture layer (one hand each) and added a custom bool parameter called "leapmotion" to turn OSC value playback on and off ingame. We recommend using a threshold of `0.4` to `1.0` for the blendtrees, as we have had the best results with this. Please note that the animations provided in the repo are customized to our avatars and have not been tested on other avatars yet. In the worst case you will have to set up the animations and blendtrees yourself. You will probably need to adjust the thresholds to fit your avatars hands correctly.

![image](https://user-images.githubusercontent.com/70418069/212783655-abdb916c-e793-4b69-8a06-e28b81811ea3.png)

![image](https://user-images.githubusercontent.com/70418069/212783698-89c0ac85-b7f0-41c3-b06a-873a50544781.png)

## Contributors
- [Zedzeen](https://github.com/Zedzeen) original NodeJS version.
- [-Thimo-](https://github.com/ThatGuyThimo) referral / help for new Unity standalone version and finger spreading implementation.

## Version History

* 1.1.0
    * Added finger spreading thanks to [-Thimo-](https://github.com/ThatGuyThimo).
* 1.0.3
    * Moved to standalone Unity application.
* 1.0.2
    * Added config file for server / client and leapjs settings. added oscRefreshRate as config variable, only send parameter when change happens.
* 1.0.1
    * Split distance calculation and OSC sending to separate functions.
* 1.0.0
    * Pull changes from Zedzeen, cleanup code, update license.
* 0.0.1
    * Initial Release.

## License

MIT License: Check the LICENSE file
