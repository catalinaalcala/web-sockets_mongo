const mdbconn = require('../lib/utils/mongo.js');
const ObjectID = require("mongodb").ObjectID;

function getMessages() {
  return mdbconn.conn().then((client) => {
    return client.db('chatdb').collection('messages').find({}).toArray((err, data) => {
      if (err) {
        console.log("Error: ", err); // Si hay un error se muestra en consola.
      } else {
        console.log(data);
      }
      client.close(); // El cierre de la conexión se realiza una vez se obtuvo respuesta.
    });
  });
}

function insertMessage(message) {
  return mdbconn.conn().then((client) => {
    return client.db('chatdb').collection('messages').insertOne(message); // Si no se provee un ID, este será generado automáticamente
  });
}

function modifyMessage(message) {
  return mdbconn.conn().then((client) => {
    return client.db("chatdb")
    .collection("messages")
    .updateOne(
      { ts: new ObjectID(message.ts) }, // Filtro al documento que queremos modificar
      { $set: message } // El cambio que se quiere realizar
    )
  });
}

function deleteMessage(ts) {
  return mdbconn.conn().then((client) => {
    return client.db("chatdb")
    .collection("messages")
    .deleteOne(
      { ts: ts }
    )
  });
}

module.exports = [getMessages, insertMessage, modifyMessage, deleteMessage];