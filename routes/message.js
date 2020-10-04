var express = require('express');
var router = express.Router();
var [getMessages, insertMessage] = require('../controllers/message');

/* GET message listing. */
router.get('/', async function (req, res, next) {
  const messages = await getMessages();
  res.send(messages);
});
/**
 * POST message
 */
router.post('/', async function (req, res, next) {
  const newMessage = await insertMessage(req.body);
  res.send(newMessage);
});

module.exports = router;