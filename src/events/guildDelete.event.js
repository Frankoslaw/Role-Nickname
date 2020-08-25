const { debug_mode } = require(__dirname + '/../configs/config.js');
const { deleteConfig } = require('../handlers/Config.handler.js')

module.exports = {
    name: 'guildDelete',
    execute(guild) {
        deleteConfig(guild.id)
    }
}