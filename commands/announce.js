const discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    name: "announcement",
    aliases: ["ann", "announce"],
    description: "Sends announcements.",
    async execute(message, args) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            const filter = (user) => {
                return user.author.id === message.author.id;    //makes sure that no one else responds
            };
            var title 
            var desc
            var everyoneorhere     //variables to start with
            const channeltosend = message.guild.channels.cache.find(i => i.name === config.announcementchannel)
            
            message.channel.send(new discord.MessageEmbed().setTitle("Please title your announcement.").setFooter("Type in cancel to cancel").setColor(config.color));
            await message.channel.awaitMessages(filter, {   //awaits for the prompt
                max: 1,
                time: 120000,
                errors: ["time"],
            }).then((msg) => {
                const firstMsg = msg.first();
                title = firstMsg.content;
                if(firstMsg.content.toLowerCase() === "cancel") 
                return firstMsg.react("👍"); //cancel messages
            })
            
            message.channel.send(new discord.MessageEmbed().setTitle("Please enter your description.").setFooter("Type in cancel to cancel").setColor(config.color));
            await message.channel.awaitMessages(filter, {
                max: 1,
                time: 120000,
                errors: ["time"],
            }).then((msg2) => {
                const secondMsg = msg2.first();
                desc = secondMsg.content;
                if(secondMsg.content.toLowerCase() === "cancel") 
                return firstMsg.react("👍");
            })
            
            message.channel.send(new discord.MessageEmbed().setTitle("Would you like to ping everyone, here or no?").setFooter("Responses: everyone, here, none").setColor(config.color));
            await message.channel.awaitMessages(filter, {
                max: 1,
                time: 120000,
                errors: ["time"],
            }).then((msg2) => {
                const secondMsg = msg2.first();
                if(secondMsg.content.toLowerCase() === "everyone")
                everyoneorhere = "@everyone"
                if(secondMsg.content.toLowerCase() === "here")
                everyoneorhere = "@here"
                if(secondMsg.content.toLowerCase() === "none")
                everyoneorhere = ""
                const emb = new discord.MessageEmbed()   //makes embved - no shit sherlock what else would "new embed" mean
                .setTitle(title)
                .setDescription(desc)
                .setFooter(message.author.username)
                .setTimestamp()
                .setColor(config.color)

                channeltosend.send(everyoneorhere)
                channeltosend.send(emb)
                
            
                return message.channel.send("Announcement shouted!").catch(console.error) 
            })
        } else {
            return message.channel.send("Missing Permissions!").catch(console.error);
        }
    }
};       