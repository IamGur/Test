const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '>';
const Dav = '324432889561219072';
const logs = '564076119461199892';
const error = '564076305881235466';
const Dm = '564076422642139146';
const acmd = '564086131914833931';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.channels.get(logs).send(`**Bot Logged in as ${client.user.tag}\, ${client.guilds.size} Servers \, ${client.users.size} Users Dav-ID:${Dav} !** `);
});
client.on('message', async(message) => {
    if (!message.content.startsWith(prefix)) {
       return undefined;
    }
    let msg = message.content.toLowerCase();
    let args = message.content.slice(prefix.length).trim().split(' ');
    let command = args.shift().toLowerCase();
   
try {
        if (command === 'help') { 
            let embed = new Discord.RichEmbed()
            .setColor('#00bbff')
            .addField('Commands',`DM - (dm)`)
        }
        if (command === 'dm') {
            if (message.author.id !== Dav) return;
            let std = client.users.get(args[0])
            let sayto = args.join (" ").slice(18);
            if(!args[0]) return message.channel.send('Give me user ID')
            if(!sayto) return message.channel.send(`${prefix}dm user id message `)
            message.channel.send(sayto);
           client.users.get(args[0]).send(sayto);
        
            let cembed = new Discord.RichEmbed()
            .setColor('#0400ff')
            .setAuthor(`${message.author.tag}`)
            .setDescription(`${message.author.tag} Used sendtodm Command`)
            .addField(`Trying to send dm message`,`${args[0]}`)
            .addField(`Message`, sayto)
            .setThumbnail(message.author.avatarURL)
            .setTimestamp();
            client.channels.get(acmd).send(cembed)
          }
} catch(e){
      console.log(e.stack)
      client.channels.get(error).send(`${e.stack}`);
        } finally {
        console.log(command)
          client.channels.get(botlog).send(`${command}`);
}
});
client.on('message', async(message) => {
    if (message.author.bot) return undefined;
    if(message.channel.type === "dm") {
      let embed = new Discord.RichEmbed()
      .setTimestamp()
      .setTitle(`Direct message from <@${message.author.id}> `)
      .setColor("RANDOM")
      .setThumbnail(message.author.displayAvatarURL)
      .setDescription(`Message: ${message.content}`)
      .setFooter(`DM Bot Messages | DM Logs`,`${message.author.displayAvatarURL}`)
      client.channels.get(Dm).send(embed)
    };
  });
client.on("guildCreate", guild => {

    let Embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('RANDOM')
    .setTitle(``)
    .setDescription(`**Guild Name**: ${guild.name}\n**Guild ID**: ${guild.id}\n**Members Gained**: ${guild.memberCount}`)
    .addField('Total Members', client.users.size);
    client.channels.get("564076213774057472").send(Embed)
  });
  client.on("guildDelete", guild => {
    let Embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('RANDOM')
    .setTitle(`Your Bot Has Stopped Serving A Guild`)
    .setDescription(`**Guild Name**: ${guild.name}\n**Guild ID**: ${guild.id}\n**Members Lost**: ${guild.memberCount}`)
    .addField('Total Members', client.users.size);
    client.channels.get("564076213774057472").send(Embed)
  });
client.login('process.env.BOTTOKEN');
