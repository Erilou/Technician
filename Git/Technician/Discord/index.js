/**
*crée par Erilia
*/
const Discord = require("discord.js");
const bot = new Discord.Client();
const YTDL = require("ytdl-core");
const PREFIX = ".";
var servers = {};

bot.on('ready', function () {
    console.log('Mistuha is good !');
	bot.user.setGame("à Shiro <3");
});
bot.on('message', message => {
	if(message.author.bot) return;
	if(!message.content.startsWith(PREFIX)) return;
	let command = message.content.split(" ")[0];
	command = command.slice(PREFIX.length);
	if (command === "ping") {
		message.channel.sendMessage(`\`${Date.now() - message.createdTimestamp} ms\``);
	  }
	  if (command === "play"){
		const voiceChannel = message.member.voiceChannel;
		if (!voiceChannel){
		  return message.channel.sendMessage(":x: Vous devez être dans un salon vocal!!");
		}
		voiceChannel.join()
		.then(connection => {
		const args = message.content.split(" ").slice(1);
		  let stream = YTDL(args.join(" "), {audioonly: true});
		  YTDL.getInfo(args.join(" "), function(err, info) {
		  const title = info.title
		  message.channel.sendMessage(`Maintenant Jouer \`${title}\``)
		  })
		  const dispatcher = connection.playStream(stream);
		  dispatcher.on('end', () => {
			 voiceChannel.leave();
		   }).catch(e =>{
			 console.error(e);
		   });
		})
	  }
	  if(command === "stop"){
		const voiceChannel = message.member.voiceChannel;
		voiceChannel.leave();
	  }

	});
	//372297937696587779

bot.login('MzcyMjk3OTM3Njk2NTg3Nzc5.DNCKeA.YL9uZ0tuQa933tfsixPBSjU8Ek8');