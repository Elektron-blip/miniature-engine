const Discord = require('discord.js')
const fs = require('fs')

const client = new Discord.Client();

fs.readdir('./src/events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith('.ts')) return;
      const event = require(`./events/${file}`);
      let eventName = file.split('.')[0];
      client.on(eventName, event.bind(null, client));
    });
  });

client.commands = new Discord.Collection();

fs.readdir('./src/commands/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith('.ts')) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split('.')[0];
    console.log(`Loading ${commandName}...`);
    client.commands.set(commandName, props);
  });
});


client.login(process.env.TOKEN);