const Client = require('../node_modules/node-osc/dist/lib/Client');
const Server = require('../node_modules/node-osc/dist/lib/Server');
const Leap = require('leapjs');

// Properties
const config = require('config');

const client = new Client(config.get('client.host'), config.get('client.port'));
const oscServer = new Server(config.get('server.port'), config.get('server.host'), () => {
	console.log('OSC Server is listening');
});

let l_hand;
let r_hand;
let trackingFrame;

oscServer.on('message', function (msg) {
	const msg_info = msg.split(',');
	console.log(msg_info);
	console.log('Message: ' + msg);

	if (msg.contains('trackingFrame')) {
		trackingFrame = msg_info[1];
	}
});

Leap.loop({optimizeHMD:config.get('optimizeHMD')}, (frame) => {

	l_hand = frame.hands[0];
	r_hand = frame.hands[1];

	/* frame.hands.forEach(hand => {
		hand.fingers.forEach(finger => {
			const osc_path = '/avatar/parameters/' + hand.type + fingerType(finger.type);
			const osc_value = getDistanceBetween(finger.dipPosition, hand.palmPosition);

			sendOSC(osc_path, osc_value);
		})
	}); */
});

var time = 1000/1;
setInterval(function() {
	console.log('Previouse frame: ' + trackingFrame);
	
	if (trackingFrame == 1) {
		sendOSC('/avatar/parameters/trackingFrame', 1);
	} else {
		sendOSC('/avatar/parameters/trackingFrame', 0);
	}

}, time);

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