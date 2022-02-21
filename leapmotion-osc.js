const Client = require('./node_modules/node-osc/dist/lib/Client');
const Server = require('./node_modules/node-osc/dist/lib/Server');

const Leap = require('leapjs');
const client = new Client('127.0.0.1', 9000);
const oscServer = new Server(9001, '0.0.0.0', () => {
	console.log('OSC Server is listening');
});

oscServer.on('message', function (msg) {
	console.log('Message: ' + msg);
});

Leap.loop({optimizeHMD:true}, (frame) => {
	frame.hands.forEach(hand => {
		hand.fingers.forEach(finger => {
			const osc_path = '/avatar/parameters/' + hand.type + fingerType(finger.type);
			const osc_value = getDistanceBetween(finger.dipPosition, hand.palmPosition);

			sendOSC(osc_path, osc_value);
		})
	});
});

function sendOSC(path, value) {
	client.send(path, value);
	console.log('Send: ' + path + ',' + value);
}

function getDistanceBetween(pointA, pointB) {
	const ax = pointA[0];
	const ay = pointA[1];
	const az = pointA[2];

	const bx = pointB[0];
	const by = pointB[1];
	const bz = pointB[2];

	const cx = ax - bx;
	const cy = ay - by;
	const cz = az - bz;

	const dist = ((Math.sqrt(Math.pow(cx, 2) + Math.pow(cy, 2) + Math.pow(cz, 2))) / 100);
	
	return dist;
}

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