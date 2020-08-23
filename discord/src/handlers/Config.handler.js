var fs = require('fs');


const loadConfig = (id) => {
    if (!fs.existsSync(`${__dirname}/../configs/servers/${id}.config.json`)) {
        console.log(`${__dirname}/../configs/servers/${id}.config.json`)
        return(1)
    }else{
        return(fs.readFileSync(`${__dirname}/../configs/servers/${id}.config.json`))
    }
 }
 
const saveConfig = (id, obj) => {
    fs.writeFileSync(`${__dirname}/../configs/servers/${id}.config.json`, JSON.stringify(obj), function (err) {
        if (err) throw err;
        return(0);
      });
 }

const deleteConfig = (id) => {
    fs.unlinkSync(`${__dirname}/../configs/servers/${id}.config.json`, function (err) {
        if (err) throw err;
        return(0);
    });
 }

 module.exports = {
    loadConfig: loadConfig,
    saveConfig: saveConfig,
    deleteConfig: deleteConfig
 }