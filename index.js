const mineflayer = require("mineflayer")
const { pathfinder } = require("mineflayer-pathfinder")
const  tps  = require("mineflayer-tps")
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


let prefix = "!"
client.login("MTAwNzkzMTMxNjA1MTkxNDc5Mg.GmiqFw.kYLQRde-vH20kkySNH6xMAMMpoRI8DK_ZF_TsI")


const bot = mineflayer.createBot({
    host: "localhost",
    port:1462,
    username: process.env.EMAIL,
    password: process.env.PASSWORD,
    //version: "1.18.2",
    auth: "microsoft"
}) 

bot.on('chat', (username, message ,pos) => {
    if (username === bot.username) return
    if (message === '!ping') {
      player = bot.players[username];
      ping = player.ping.toString()
      bot.chat(`Your ping: ${ping}`)
      console.log(ping)
    if (message === "!ping" + player){
      console.log(player)
    }

    }
  })

// Redirect Discord messages to in-game chat
client.on('messageCreate', message => {
    if (message.author.id == client.user.id) return
    if (message.channel.id == 1007938486994743328)
{
    bot.chat(`${message.author.username}: ${message.content}`)
}
})
  
  // Redirect in-game messages to Discord channel
  bot.on('chat', (username, message) => {
    // Ignore messages from the bot itself
    let channel = client.channels.cache.get("1007938486994743328") 
    if (username === bot.username) return
    channel.send(`${username}: ${message}`)
    
  })

  bot.on('chat', (username, message) => {
    // Ignore messages from the bot itself
    let channel = client.channels.cache.get("1007938486994743328") 
    if (username === bot.username) return

    
  })





  
  // Login Discord bot
  client.login(process.argv[2])