const Client = require('./node_modules/node-osc/dist/lib/Client');
const Leap = require('leapjs');

const client = new Client('127.0.0.1', 9000);

Leap.loop({optimizeHMD:true}, (frame) => {
	frame.hands.forEach(hand => {
		hand.fingers.forEach(finger => {
			const osc_path = '/avatar/parameters/' + hand.type + fingerType(finger.type);

			const finger_x = finger.dipPosition[0];
			const finger_y = finger.dipPosition[1];
			const finger_z = finger.dipPosition[2];

			const hand_x = hand.palmPosition[0];
			const hand_y = hand.palmPosition[1];
			const hand_z = hand.palmPosition[2];

			const dx = finger_x - hand_x;
			const dy = finger_y - hand_y;
			const dz = finger_z - hand_z;
			
			const dist = (Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2)));

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