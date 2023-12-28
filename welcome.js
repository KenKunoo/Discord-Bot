const discord = require("discord.js")

module.exports = (client) => {
    const channelId = '903073832930271302' // welcome channel
    const targetChannelId = '902043095259054120' // rules and info

    client.on('guildMemberAdd', (member) => {
      const message = `Please welcome <@${member.id}> to the server! Please check out ${member.guild.channels.cache.get(targetChannelId).toString()}`
      const embed = new discord.MessageEmbed().setTitle("Welcome!").setDescription(`<@${member.id}>, welcome to RustOxide. Please check out ${member.guild.channels.cache.get(targetChannelId.toString)}`)
  
      const channel = member.guild.channels.cache.get(channelId)
      channel.send(embed)
    })
  }