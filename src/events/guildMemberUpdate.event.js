const { debug_mode } = require(__dirname + '/../configs/config.js');
const { loadConfig } = require('../handlers/Config.handler.js')
const { predictRole } = require('../functions/predictRole.js')


module.exports = {
    name: 'guildMemberUpdate',
    execute(oldMember, newMember) {
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
    },
};