const Client = require('../node_modules/node-osc/dist/lib/Client');
const Server = require('../node_modules/node-osc/dist/lib/Server');
const Leap = require('leapjs');

// Properties
const config = require('config');
const oscRootPath = config.get('oscRootPath');

// OSC Client & Server
const client = new Client(config.get('client.host'), config.get('client.port'));
const oscServer = new Server(config.get('server.port'), config.get('server.host'), () => {
	console.log('OSC Server is listening.');
});

// Tracking data
let l_hand;
let r_hand;

oscServer.on('message', function (msg) {
	console.log('Message: ' + msg);
});

Leap.loop({optimizeHMD:config.get('optimizeHMD')}, (frame) => {
	frame.hands.forEach(hand => {
		if (hand.type == 'left') {
			l_hand = hand;
		} else {
			r_hand = hand;
		}
	});
});

console.log('Waiting for your beautiful hands.');

var time = 1000/60;
setInterval(function() {
	updateTrackingData(l_hand);
	updateTrackingData(r_hand);
}, time);

function updateTrackingData(hand) {
	if (hand == undefined) return
	hand.fingers.forEach(finger => {
		sendOSC(hand.type + fingerType(finger.type), getDistanceBetween(finger.dipPosition, hand.palmPosition));
	})
}

function sendOSC(path, value) {
	path = oscRootPath + path;
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

	return ((Math.sqrt(Math.pow(cx, 2) + Math.pow(cy, 2) + Math.pow(cz, 2))) / 100);
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