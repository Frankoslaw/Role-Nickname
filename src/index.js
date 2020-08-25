//https://discord.com/api/oauth2/authorize?client_id=744705982499782676&permissions=738323473&scope=bot

const { token } = require('./configs/config.js');

const Discord = require('discord.js');

const client = new Discord.Client();

const CommandHandler = require('./handlers/Command.handler.js');
const EventHandler = require('./handlers/Event.handler.js');

CommandHandler(client);
EventHandler(client);

client.login(token);