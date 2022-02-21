"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_osc_1 = require("node-osc");
var leapjs_1 = require("leapjs");
var client = new node_osc_1.Client('127.0.0.1', 9000);
leapjs_1.default.loop({ optimizeHMD: true }, function (frame) {
    frame.hands.forEach(function (hand) {
        hand.fingers.forEach(function (finger) {
            var osc_path = '/avatar/parameters/' + hand.type + fingerType(finger.type);
            var finger_x = finger.dipPosition[0];
            var finger_y = finger.dipPosition[1];
            var finger_z = finger.dipPosition[2];
            var hand_x = hand.palmPosition[0];
            var hand_y = hand.palmPosition[1];
            var hand_z = hand.palmPosition[2];
            var dx = finger_x - hand_x;
            var dy = finger_y - hand_y;
            var dz = finger_z - hand_z;
            var dist = (Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2)));
            // client.send(osc_path, (dist / 100), () => {
            // 	client.close();
            // });
            // client.send('/oscAddress', 200, () => {
            // 	client.close();
            //   });
            console.log('Send: ' + osc_path + ',' + (dist / 100));
        });
    });
});
function fingerType(type) {
    switch (type) {
        case 0:
            return 'Thumb';
        case 1:
            return 'Index';
        case 2:
            return 'Middle';
        case 3:
            return 'Ring';
        case 4:
            return 'Pinky';
        default:
            return 'Thumb';
    }
}
process.on('SIGINT', function () {
    client.close();
    setTimeout(function () {
        console.log('OSC Client is closed');
        process.exit(0);
    }, 100);
});
