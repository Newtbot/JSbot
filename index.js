const mineflayer = require("mineflayer")
const { pathfinder } = require("mineflayer-pathfinder")
const  tps  = require("mineflayer-tps")
const autoeat = require("mineflayer-auto-eat")
const fs = require('node:fs');
const path = require('node:path');

const { Client, GatewayIntentBits, Partials , Collection } = require('discord.js');
const ping = require("./commands/ping");
const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
  ,allowedMentions: { parse: [] }
});

client.commands = new Collection();

//Token
client.login("token")

//bot details
const bot = mineflayer.createBot({
    host: "ip",
    //port:1262,
    username: process.env.EMAIL,
    password: process.env.PASSWORD,
    //version: "1.18.2",
    auth: "microsoft"
}) 
//!ping to get player ping
bot.on('chat', (username, message ,pos) => {
    if (username === bot.username) return
    if (message === '!ping') {
      player = bot.players[username];
      ping = player.ping.toString()
      bot.chat(`Your ping: ${ping}`)
      console.log(ping)
    }
  }
  )
// Redirect Discord messages to in-game chat
client.on('messageCreate', message => {
    if (message.author.id == client.user.id) return
    if (message.channel.id == 1007938486994743328)
  {
    bot.chat(`${message.author.username}: ${message.content}`)  }
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

  //print ready when start up
  client.once('ready', () => {
    console.log('Ready!');  
  });


// Load the plugin
bot.loadPlugin(autoeat)

bot.once("spawn", () => {
  bot.autoEat.options.priority = "foodPoints"
  bot.autoEat.options.bannedFood = []
  bot.autoEat.options.eatingTimeout = 3
})

// The bot eats food automatically and emits these events when it starts eating and stops eating.

bot.on("autoeat_started", () => {
  console.log("Auto Eat started!")
})

bot.on("autoeat_stopped", () => {
  console.log("Auto Eat stopped!")
})

bot.on("health", () => {
  if (bot.food === 20) bot.autoEat.disable()
  // Disable the plugin if the bot is at 20 food points
  else bot.autoEat.enable() // Else enable the plugin again
})

//leave and join
bot.on('playerJoined', (player) => {
  if (player.username !== bot.username) {
    let channel = client.channels.cache.get("1007938486994743328") 
    channel.send(`${player.username}  Has Joined the Game`)
  }
})

bot.on('playerLeft', (player) => {
  if (player.username === bot.username) {
    let channel = client.channels.cache.get("1007938486994743328") 
    channel.send(`${player.username}  Has Left the Game`)
  }
})





  
  // Login Discord bot
  client.login(process.argv[2])



