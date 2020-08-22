//https://discord.com/api/oauth2/authorize?client_id=744705982499782676&permissions=201403392&scope=bot

const { token, debug_mode } = require('./configs/config.js');

const Discord = require('discord.js');

const client = new Discord.Client();

var rolesId = {
    '711869767862190123': "『O』",
    '736569171193626654': "『CO』",
    '743553774144061590': "『HA』",
    '637391745122041936': "『A』",
    '637391148834488350': "『T』",
    '637391743398182912': "『M』",
    '722873873183539331': "『S』",
    '737023798364209223': "『MegaYT』",
    '673643875876995092': "『YT』",
    '722860026213171351': "『MiniYT』",
    '713401336003297310': "『P』",
    '637393095335477273': "『W』",
    'else': ""
}

function predictRole(userRoles, rolesPrefixs){
    for(let role in rolesPrefixs){
        if(userRoles.includes(role) && userRoles.slice(0,3) != rolesPrefixs[role]){
            return(rolesPrefixs[role]);
        }
    }
    return(rolesPrefixs['else']);
}

client.on('ready', () => {
    console.log('I am ready!');
});

client.on("guildMemberUpdate", function(oldMember, newMember){
    if (!newMember.guild.me.hasPermission('MANAGE_NICKNAMES')){
        return console.log('No Permision: MANAGE_NICKNAMES');
    }
    
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