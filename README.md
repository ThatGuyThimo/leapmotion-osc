# Leap Motion Controller finger tracking for VRChat OSC

Using a Leap Motion Controller from Ultraleap for finger tracking in VRChat without mods. Version 1.0.3 of this project is now a standalone Unity application, as Ultraleap has discontinued its Javascript SDK.

![preview](https://user-images.githubusercontent.com/53810001/191473987-7695cc22-2935-4fa7-9028-788854c0054a.png)

## Description

This project uses [OscCore](https://github.com/stella3d/OscCore) and the OpenUPM [Ultraleap Unity Plugin](https://openupm.com/packages/com.ultraleap.tracking/), to send finger tracking data from a Leap Motion Controller to VRChat via Open Sound Control.

## Getting Started

### Dependencies

* [Ultraleap Gemini 5.7.2](https://developer.leapmotion.com/tracking-software-download)

## Usage / Installation / Building

### Windows

Download and run the [pre-packaged executable](https://github.com/adeleine1412/leapmotion-osc/releases/download/release-1.0.3/LeapmotionOSC-1.0.3.exe) file of the latest release.
If you want, you can also download the [archive file](https://github.com/adeleine1412/leapmotion-osc/releases/download/release-1.0.3/leapmotionosc-1.0.3-windows.zip) marked as the windows build, unzip it and run the executable file it contains.

### Linux

Download the [archive file](https://github.com/adeleine1412/leapmotion-osc/releases/download/release-1.0.3/leapmotionosc-1.0.3-linux.zip) marked as the linux build, extract it and run the application with:

```console
./LeapmotionOSC.x86_64
```

This is not tested yet, please open a new issue if this does not work.

### Building

If you want to build the project yourself, you will need to clone this respository and install [OscCore](https://github.com/stella3d/OscCore) & Ultraleaps [OpenUPM](https://openupm.com/packages/com.ultraleap.tracking/) (Ultraleap Unity Plugin). This repository includes a prefab that you can use to set up the latest configuration in your hierarchy. Unity version used for the current release is [Unity 2021.3.10f1](https://unity3d.com/unity/whats-new/2021.3.10).

## Additional notes

### Tracking Mode / Configuration

The tracking optimization for the controllers is set to `HMD`, using Edit Time Pose `Head Mounted A`. This application uses the standard VRChat OSC port `9000`. If there is a discrepancy, you will need to create a new build, as there are no configuration options yet.

## Avatar Setup

Your avatar receives OSC inputs for 10 float parameters that you need to add to your avatar. You also need to create or use the [animation controller provided in the 1.0.3 release](https://github.com/adeleine1412/leapmotion-osc/releases/download/release-1.0.3/leapmotionosc-avatar-animation-controller.unitypackage) to create blendtrees that transition from the retracted to the extended state of each finger.

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

To do this, we created two layers in the gesture layer (one hand each) and added a custom bool parameter called "leapmotion" to turn OSC value playback on and off ingame. We recommend using a threshold of `0.4` to `0.9` for the blendtrees, as we have had the best results with this. Please note that the animations provided in the repo are customized to our avatars and have not been tested on other avatars yet. In the worst case you will have to set up the animations and blendtrees yourself.

![image](https://user-images.githubusercontent.com/53810001/154858570-233b9e0b-21b5-4880-9ed7-c6087a911ef9.png)

![image](https://user-images.githubusercontent.com/53810001/154858549-dd4e3ef0-7a4f-490e-90b6-2b680d86793d.png)

## Contributors
- [Zedzeen](https://github.com/Zedzeen) original NodeJS version
- [-Thimo-](https://github.com/ThatGuyThimo) referral / help for new Unity standalone version

## Version History

* 1.0.3
    * moved to standalone Unity application
* 1.0.2
    * added config file for server / client and leapjs settings. added oscRefreshRate as config variable, only send parameter when change happens
* 1.0.1
    * split distance calculation and OSC sending to separate functions
* 1.0.0
    * Pull changes from Zedzeen, cleanup code, update license
* 0.1
    * Initial Release

## License

MIT License: Check the LICENSE file
