const { MessageEmbed } = require("discord.js")
const { COLOR } = require("../config.json");

module.exports = {
  name: "jump",
  description: "Lompat ke lagu apa pun yang Anda suka",
  execute (client, message, args) {
    
     let embed = new MessageEmbed()
.setColor(COLOR);

    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("Anda Perlu Berada Di Voice Channel")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Tidak ada pemutaran yang bisa saya putar")
      return message.channel.send(embed);
    }
     if(!args[0]) {
      embed.setAuthor(`Tolong Beri Nomor Lagu`)
      return message.channel.send(embed)
    }
    
      if(isNaN(args[0])) {
      embed.setAuthor("Harap Gunakan Hanya Nilai Numerik")
      return message.channel.send(embed)
    }
    
    
    //LETS FIX JUMP COMMAND :D
  if(serverQueue.songs.length < args[0]) {
    embed.setAuthor("Tidak Dapat Menemukan Lagu Ini dalam Antrean ")
    return message.channel.send(embed)  
                                         }
    serverQueue.songs.splice(0, Math.floor(parseInt(args[0]) - 1))
    serverQueue.connection.dispatcher.end()
    
    embed.setDescription(`Melompat Ke Nomor Lagu - ${args[0]}`)
    message.channel.send(embed)
    
  }
}