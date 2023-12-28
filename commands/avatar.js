const Discord = require('discord.js')

module.exports = {
    name: "avatar",
    description: "gets avatar of user",
    execute(message) {
        if(message.mentions.users.size){
            let member=message.mentions.users.first()
        if(member){
            const emb=new Discord.MessageEmbed()
            .setImage(member.displayAvatarURL())
            .setTitle(member.username)
            .setFooter("Scientist | Rust Oxide")
            .setTimestamp()
            .setColor(0xcb55ec)
            message.channel.send(emb).catch(console.error);
            
        }
        else{
            message.channel.send("Couldn't find Avatar!")

        }
        }else{
            const emb=new Discord.MessageEmbed()
            .setImage(message.author.displayAvatarURL())
            .setTitle(message.author.username)
            .setFooter("FlyKachi")
            .setTimestamp()
            .setColor(0xcb55ec)
            message.channel.send(emb).catch(console.error);
        }
    }
  };