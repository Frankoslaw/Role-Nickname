//https://discord.com/api/oauth2/authorize?client_id=744705982499782676&permissions=201403392&scope=bot

const { token, debug_mode } = require('./configs/config.js');
const { loadConfig, saveConfig, deleteConfig} = require('./handlers/Config.handler.js')

const Discord = require('discord.js');

const client = new Discord.Client();

const CommandHandler = require('./handlers/Command.handler.js');
const EventHandler = require('./handlers/Event.handler.js');

CommandHandler(client);
EventHandler(client);

client.on('ready', () => {
    console.log('I am ready!');
});

function predictRole(userRoles, rolesPrefixs){
    for(let role in rolesPrefixs){
        if(userRoles.includes(role) && userRoles.slice(0,3) != rolesPrefixs[role]){
            return(rolesPrefixs[role]);
        }
    }
    return(rolesPrefixs['else']);
}

client.on("guildMemberUpdate", function(oldMember, newMember){
    if (!newMember.guild.me.hasPermission('MANAGE_NICKNAMES')){
        return console.log('No Permision: MANAGE_NICKNAMES');
    }

    let config = JSON.parse(loadConfig('637278766619557930'));
    let rolesId = config['RolesPrefix']
    
    let nickname = newMember['nickname']
    if(newMember['nickname']== null){
        nickname = newMember['user']['username']
    }

    if(JSON.stringify(oldMember['_roles'])!=JSON.stringify(newMember['_roles'])){
        let oldPrefix = predictRole(oldMember['_roles'], rolesId)
        if(nickname.substring(0, oldPrefix.length) == oldPrefix){
            nickname = nickname.substring(oldPrefix.length)
        }

        if(debug_mode){
            return console.log(`${predictRole(newMember['_roles'], rolesId)}${nickname}`)
        }else{
            return newMember.setNickname(`${predictRole(newMember['_roles'], rolesId)}${nickname}`);
        }
    }

    if(oldMember['nickname'] != newMember['nickname']){
        let newPrefix = predictRole(newMember['_roles'], rolesId)
        if(nickname.substring(0, newPrefix.length) != newPrefix){
            if(debug_mode){
                return console.log(`${predictRole(newMember['_roles'], rolesId)}${nickname}`)
            }else{
                return newMember.setNickname(`${newPrefix}${nickname}`);
            }
        }
    }
});

client.login(token);