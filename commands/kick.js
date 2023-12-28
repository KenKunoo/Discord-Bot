const discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    name: "kick",
    aliases: ["k"],
    description: "Kicks member.",
    async execute(message, args) {
      const logschannel = message.guild.channels.cache.find(i => i.name === config.logschannel)
      const kickreason = args.join(" ") // convert's the commas from the args

      if(!message.member.hasPermission('KICK_MEMBERS')) {
        message.channel.send(new discord.MessageEmbed().setTitle("You don't have permission to do so!").setColor(config.color));
        return;
      };

      let mentionMember = message.mentions.members.first();
        //If user dont mention a member, that show him this error msg
      if(!mentionMember) {
          message.channel.send(new discord.MessageEmbed().setTitle("Please mention who to kick.").setFooter("Example: @person").setColor(config.color))
          return;
      }

      //Check if your bot can`t kick this user, so that show this error msg 
      if(!mentionMember.kickable) {
          message.channel.send(new discord.MessageEmbed().setTitle("I have no permissions to or I don't have the higher position.").setColor(config.color));
          return
      };

      message.delete()

      //If all steps are completed successfully try kick this user
      mentionMember.kick()
          .then(() => logschannel.send(new discord.MessageEmbed().setTitle("Kick Success.").setDescription(mentionMember, kickreason).setTimestamp().setFooter(`Kick Author: ${message.author.username}`)))
          .catch(console.error);
      }
};       