import { Client, Message } from 'node-osc';
import * as Leap from 'leapjs';

const client = new Client('127.0.0.1', 3333);


Leap.loop({optimizeHMD:true}, (frame: { hands: { fingers: { type: number; dipPosition: any[]; }[]; type: string; palmPosition: any[]; }[]; }) => {
	frame.hands.forEach((hand: { fingers: { type: number; dipPosition: any[]; }[]; type: string; palmPosition: any[]; }) => {
		hand.fingers.forEach((finger: { type: number; dipPosition: any[]; }) => {
			const osc_path = '/avatar/parameters/' + hand.type + fingerType(finger.type);
			
			let finger_x = finger.dipPosition[0];
			let finger_y = finger.dipPosition[1];
			let finger_z = finger.dipPosition[2];
			
			let hand_x = hand.palmPosition[0];
			let hand_y = hand.palmPosition[1];
			let hand_z = hand.palmPosition[2];

			let dx = finger_x - hand_x;
			let dy = finger_y - hand_y;
			let dz = finger_z - hand_z;
			
			const dist = (Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2))) / 100;
			
			
			const message = new Message(osc_path);
			message.append(dist);
			
			client.send(message, (err) => {
				if (err) {
				  console.error(new Error(err.message));
				}
				client.close();
			});

			console.log('Send: ' + osc_path + ',' + dist);
		})
	});
});

function fingerType(type: number) {
	switch(type) {
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

process.on('SIGINT', () => {
	client.close();
	setTimeout(() => {
    console.log('OSC Client is closed')
		process.exit(0);
	}, 100);
});