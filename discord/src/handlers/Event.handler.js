const fs = require('fs');
const chalk = require('chalk');

const {
    Constants: { Events },
} = require('discord.js');

const serverEvents = Object.values(Events);

module.exports = (client) => {
    const events = fs
        .readdirSync(__dirname + '/../events')
        .filter((file) => file.endsWith('.event.js'));

    let registredEventsCount = 0;

    for (const file of events) {
        const event = require(__dirname + `/../events/${file}`);

        if (!event.execute) {
            console.log(chalk.redBright(`Event "${file}" missing execute()`));
            process.exit(1);
        } else if (typeof event.execute !== 'function') {
            console.log(
                chalk.redBright(`Event "${file}" execute() must be a function`)
            );
            process.exit(1);
        }

        if (serverEvents.includes(event.name)) {
            client.on(event.name, event.execute);
            registredEventsCount++;
        } else {
            console.log(
                chalk.redBright(
                    `Event: ${event.name} don't exist in discord.js`
                )
            );
            process.exit(1);
        }
    }

    console.log(chalk.blue(`Loaded ${registredEventsCount} Events`));
};