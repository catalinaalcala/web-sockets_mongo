const mdbconn = require('../lib/utils/mongo.js');

function getMessages() {
  return mdbconn.conn().then((client) => {
    return client.db('chatdb').collection('messages').find({}).toArray();
  });
}

function insertMessage(message) {
  return mdbconn.conn().then((client) => {
    return client.db('chatdb').collection('messages').insertOne(message); // Si no se provee un ID, este será generado automáticamente
  });
}

module.exports = [getMessages, insertMessage];