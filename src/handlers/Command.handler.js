const Discord = require(`discord.js`);
const cooldowns = new Discord.Collection();

const fs = require(`fs`);

const ascii = require(`ascii-table`);

const table = new ascii().setHeading(`Command`, `Load Status`);

const { prefix, bot_Owner} = require(__dirname +`/../configs/config.js`);

module.exports = (client) => {
    client.commands = new Discord.Collection();

    const commandFiles = fs
        .readdirSync(__dirname + `/../commands`)
        .filter((file) => file.endsWith(`.command.js`));

    for (const file of commandFiles) {
        const command = require(__dirname + `/../commands/${file}`);

        if (command.name) {
            client.commands.set(command.name, command);
            table.addRow(file, `✅`);
        } else {
            table.addRow(file, `❌ -> Missing name`);
            continue;
        }
    }

    //Display Ascii-Table
    console.log(table.toString());

    client.on(`message`, (message) => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);

        const commandName = args.shift().toLowerCase();
        const command =
            client.commands.get(commandName) ||
            client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );

        if (!command) return message.channel.send(`Command does not exist`);

        if (command.guildOnly && message.channel.type !== `text`) {
            return message.reply(`I cannot execute this command in private message!`);
        }

        if (command.args && !args.length) {
            let reply = `You must provide arguments, ${message.author}!`;

            if (command.usage) {
                reply += `\nThe command requires the following arguments: \`${prefix}${command.name} ${command.usage}\``;
            }
            return message.channel.send(reply);
        }

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 0) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime =
                timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Wait another minute: ${timeLeft.toFixed(1)} seconds (s) before using the command ${command.name}.`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            command.execute(client, message, args);
        } catch (error) {
            console.error(error);
            message.channel.send(`An unexpected error has occurred`);
        }
    });
};