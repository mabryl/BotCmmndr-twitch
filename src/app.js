require('dotenv').config()
const tmi = require('tmi.js');

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		// Authenticating with Twitch
		username: process.env.BOT_USERNAME,
		password: process.env.OAUTH_TOKEN
	},
	channels: [ process.env.CHANNEL_NAME ]
});

client.connect();

client.on('message', (channel, userstate, message, self) => {
	// Ignore echoed messages.
	if(self) return;
	if (userstate.username === process.env.BOT_USERNAME) return;

	// Commands
	if(message.toLowerCase() === '!commands') {
		client.say(channel, `@${userstate.username}, !hello !language !aboutme !bot !coinflip`);
	}

	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${userstate.username}, Welcome to my chat :v type !commands for available chat commands`);
	}
	
	if(message.toLowerCase() === '!language') {
		client.say(channel, `@${userstate.username}, Please speak English or Polish in the chat`);
	}

	if(message.toLowerCase() === '!aboutme') {
		client.say(channel, `@${userstate.username}, My name is BitCommander or just Bit and I'm mediocre at video games. I'm streaming as a hobby and my IRL job is in IT`);
	}

	if(message.toLowerCase() === '!bot') {
		client.say(channel, `@${userstate.username}, No, U`);
	}

	if (message.toLowerCase() === '!coinflip') {
		coinflip();
		client.say(channel, `@${userstate.username}, The coin landed on ${side}`);
	}
});

// Function for the !coinflip command
function coinflip() {
	let result = Math.floor(Math.random() * 2);
    if (result == 0) {
        side = "Heads";
    }
    else {
        side = "Tails";
    }
  };