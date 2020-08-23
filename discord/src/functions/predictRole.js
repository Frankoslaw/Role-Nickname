function predictRole(userRoles, rolesPrefixs){
    for(let role in rolesPrefixs){
        if(userRoles.includes(role) && userRoles.slice(0,3) != rolesPrefixs[role]){
            return(rolesPrefixs[role]);
        }
    }

    console.log(rolesPrefixs)
    return(rolesPrefixs['else']);
}

module.exports = {
    predictRole: predictRole
}