/* const Server = require('./node_modules/node-osc/dist/lib/Server'); */
const Client = require('./node_modules/node-osc/dist/lib/Client');
var Leap = require('leapjs');

/* var oscServer = new Server(9001, '0.0.0.0', () => {
	console.log('OSC Server is listening');
}); */

const client = new Client('127.0.0.1', 9000);

/* oscServer.on('message', function (msg) {
	console.log('Message: ' + msg);
}); */

Leap.loop({optimizeHMD:true}, function(frame) {
	frame.hands.forEach(hand => {
		hand.fingers.forEach(finger => {
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

			client.send(osc_path, (dist / 100));
			console.log('Send: ' + osc_path + ',' + (dist / 100));
		})
	});
});

function fingerType(type) {
	switch(type) {
		case 0:
			return 'Thumb'
		case 1:
			return 'Index'
		case 2:
			return 'Middle'
		case 3:
			return 'Ring'
		case 4:
			return 'Pinky'
	}
}

process.on('SIGINT', () => {
	client.close();
	setTimeout(() => {
    console.log('OSC Client is closed')
		process.exit(0);
	}, 100);
});