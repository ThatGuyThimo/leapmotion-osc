# Leap Motion Controller finger tracking for VRChat OSC

Using a Leap Motion Controller from Ultraleap for finger tracking in VRChat without mods.

## Description

This project uses two npm packages, [leapjs](https://github.com/leapmotion/leapjs) and [node-osc](https://github.com/MylesBorins/node-osc), to send finger tracking data from a Leap Motion Controller to VRChat via OSC.

## Getting Started

### Dependencies

* [VRChat 2022.1.1, build 1167 and up](https://hello.vrchat.com/blog/vrchat-osc-for-avatars) (Open Beta)
* [NodeJS](https://nodejs.dev/)
* [Leap Motion Orion 3.2.1](https://developer.leapmotion.com/releases/leap-motion-orion-321-39frn-3b659) (I had problems with the new version of Ultraleap, maybe the new versions work for you)

### Installing

* Make sure that your operating system has NodeJS installed and can execute npm commands.
* Clone the repo and run `npm install` in its root directory.

### Executing program

* Run the script with `node ./leapmotion-osc.js`.
* If you want to receive VRChat OSC output on port 9001, comment-in the commented-out code in the leapmotion-osc.js file.

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

You can edit my code at any time to add or remove prefixes or change the name of the fingers as you like.

## Version History

* 0.1
    * Initial Release

## License

You can use, edit or embed my code as you like.
