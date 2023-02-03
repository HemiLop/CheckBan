require("dotenv").config();
const tmi = require("tmi.js");
const bot = new tmi.Client({
	connection: {
		reconnect: true,
		reconnectInterval: 2000,
		maxReconnectInterval: 3000
	},
	channels: ["hemybot","simplebot__"],
	identity: {
		username: process.env.TWITCH_BOT_USERNAME,
		password: process.env.TWITCH_OAUTH_TOKEN
	},
});

bot.connect()
.then(() => {
    console.log("Connesso")
}).catch((err) => {
    console.log("Errore " + err)
});

bot.on("message", (channel, _, message, self) => {
    if(self) return;
    let mex = message.split(" ");
    
    if(mex[0]=="?isbanned"){
        if(typeof mex[1] != "undefined"){
            bot.join(mex[1])
            .then((data) => {
                bot.say(channel, data[0].slice(1, data[0].length) + " non è bannato da twitch :)")
            }).catch((err) => {
                return (err=="msg_channel_suspended" || err=="tos_ban")? bot.say(channel, mex[1] + " è bannato da twitch :(") : bot.say(channel, " Errore :(");
            });
        }
    }
});