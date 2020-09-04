const { MessageEmbed } = require("discord.js")

const { COLOR } = require("../config.json");


module.exports = {
  name: "skip",
  description: "Lewati lagu atau geser diri Anda ke lagu berikutnya ",
  async execute(client, message, args) {
   
    
    
    
let embed = new MessageEmbed()
.setColor(COLOR);


    const { channel } = message.member.voice;

       
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("Anda Harus Masuk Voice Channel ")
      return message.channel.send(embed);
    }
    const serverQueue = message.client.queue.get(message.guild.id);
const vote = message.client.vote.get(message.guild.id)
    if (!serverQueue) {
      embed.setAuthor("Tidak ada pemutaran yang bisa saya lewati")
      return message.channel.send(embed);
    }
    
    const vcvote = Math.floor(message.guild.me.voice.channel.members.size / 2)
    const okie = Math.floor(message.guild.me.voice.channel.members.size / 2 - 1)
    console.log(message.guild.me.voice.channel.members.size)
     if(!message.member.hasPermission("ADMINISTRATOR")) {
       if(vote.vote > okie) {
         serverQueue.connection.dispatcher.end();
    embed.setDescription("VOTE - SKIP | Melompati Lagu")
    embed.setThumbnail(client.user.displayAvatarURL())
    return message.channel.send(embed);
       }
       
       if(vote.voters.includes(message.author.id)) {
         return message.channel.send("Anda Sudah Memilih Lagu Ini ")
       }
       
       if(vcvote === 2) {
          serverQueue.connection.dispatcher.end();
    embed.setDescription("✔ | Melompati Lagu")
    embed.setThumbnail(client.user.displayAvatarURL())
    return message.channel.send(embed);
       }
       
       
       
vote.vote++
       vote.voters.push(message.author.id)
       return message.channel.send(`Anda Memilih Lagu Untuk Dilewati, Tapi Saat Ini Kami Membutuhkan ${Math.floor(vcvote - vote.vote)} votes`)
    
     
     
     
     }

    serverQueue.connection.dispatcher.end();
    embed.setDescription("✔ | Melompati Lagu ")
    embed.setThumbnail(client.user.displayAvatarURL())
    message.channel.send(embed);
  }
};