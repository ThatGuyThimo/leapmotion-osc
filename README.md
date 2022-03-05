# Leap Motion Controller finger tracking for VRChat OSC

Using a Leap Motion Controller from Ultraleap for finger tracking in VRChat without mods.

## Description

This project uses two npm packages, [leapjs](https://github.com/leapmotion/leapjs) and [node-osc](https://github.com/MylesBorins/node-osc), to send finger tracking data from a Leap Motion Controller to VRChat via OSC.

https://user-images.githubusercontent.com/53810001/154858534-3e3f626c-cc9a-4ff0-9159-09b783eec284.mp4

## Getting Started

### Dependencies

* [VRChat 2022.1.1, build 1167 and up](https://hello.vrchat.com/blog/vrchat-osc-for-avatars) (Open Beta)
* [NodeJS](https://nodejs.dev/)
* [Leap Motion Orion 3.2.1](https://developer.leapmotion.com/releases/leap-motion-orion-321-39frn-3b659) (I had problems with the new version of Ultraleap, maybe the new versions work for you)

### Installing

* Make sure that your operating system has NodeJS installed and can execute npm commands.
* Clone the repo and run `npm install` in its root directory.

### Executing program

* Run the script with `npm start`.

### Additional notes

The default mode for the controllers is `optimizeHMD`, if you want to use this on a flat surface instead, make sure you set `optimizeHMD:true` to `optimizeHMD:false` at the very beginning of the `Leap.loop` function.

## Avatar Setup

Your avatar receives OSC inputs for 10 float parameters that you need to add to your avatar. You also need to create or use the animations provided in the animations repo folder to create blendtrees that transition from the retracted to the extended state of each finger.

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

To do this, I created two layers in my gesture layer (one hand each) and added a custom bool parameter called "leapmotion" to turn OSC value playback on and off ingame.
I recommend using a threshold of `0.4` to `0.9` for the blendtrees, as I have had the best results with this. Please note that the animations provided in the repo are customized to my avatar and have not been tested on other avatars yet. In the worst case you will have to set up the animations and blendtrees yourself.

![image](https://user-images.githubusercontent.com/53810001/154858570-233b9e0b-21b5-4880-9ed7-c6087a911ef9.png)

![image](https://user-images.githubusercontent.com/53810001/154858549-dd4e3ef0-7a4f-490e-90b6-2b680d86793d.png)

You can edit my code at any time to add or remove prefixes or change the name of the fingers as you like.

## Contributors
[Zedzeen](https://github.com/Zedzeen)

## Version History
<<<<<<< HEAD
=======
* 1.0.2
    * added config file for server / client and leapjs settings
>>>>>>> origin/development
* 1.0.1
    * split distance calculation and OSC sending to separate functions
* 1.0.0
    * Pull changes from Zedzeen, cleanup code, update license
* 0.1
    * Initial Release

## License

MIT License: Check the LICENSE file
