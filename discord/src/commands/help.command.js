const { prefix } = require('../configs/config.js');

const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'wyświetla opis komendy.',
    cooldown: 0,
    args: false,
    guildOnly: false,
    execute(client, message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            const returnMessage = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Nie podano nazwy komendy')
                .addFields({
                    name: 'Dostępne komendy to: ',
                    value: commands.map((command) => command.name),
                })
                .setFooter(
                    `Aby uzyskać informacje o komendzie napisz ${prefix}help (nazwa komendy)`
                );
            return message.channel.send(returnMessage);
        }

        const name = args[0].toLowerCase();
        const command =
            commands.get(name) ||
            commands.find((c) => c.aliases && c.aliases.includes(name));

        if (!command) {
            const returnMessage = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Komenda nie istnieje');
            return message.channel.send(returnMessage);
        }

        const returnMessage = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Nazwa ${name}`)
            .addFields(
                { name: 'Zamienniki:', value: command.aliases },
                { name: 'Opis:', value: command.description },
                {
                    name: 'Użycie:',
                    value: `${prefix}${command.name} ${command.usage}`,
                },
                {
                    name: 'Opóźnienie:',
                    value: `${command.cooldown || 0} sekund`,
                }
            );

        return message.channel.send(returnMessage);
    },
};