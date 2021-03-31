const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
let db;

const init = () => {
    db = new JsonDB(new Config("database", true, false, '/'));
}

const insert = (message) => {
    db.push(`/messages_${message.ID}`, message);
}

const getByID = (ID) => {
    return db.getData(`/messages_${ID}`);
}

module.exports = {
    insert,
    getByID,
    init
}