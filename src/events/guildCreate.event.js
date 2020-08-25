const { debug_mode } = require(__dirname + '/../configs/config.js');
const { saveConfig } = require('../handlers/Config.handler.js')

module.exports = {
    name: 'guildCreate',
    execute(guild) {
        saveConfig(guild.id, {"RolesPrefix": {},"MandatoryPrefix": true,"NumberOfPrefixs": 1})
    }
}