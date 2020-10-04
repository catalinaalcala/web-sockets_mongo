var express = require('express');
var router = express.Router();
var [getMessages, insertMessage, modifyMessage, deleteMessage] = require('../controllers/message');

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
/**
router.put("/", (req, res) => {
  const { error } = validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const newMessage = await modifyMessage(req.body);
  newMessage.then((response) => {
    if (response[0] !== 0) res.send({ message: "Message updated" });
    else res.status(404).send({ message: "Message was not found" });
  });
});

router.delete("/:ts", (req, res) => {
  const newMessage = await deleteMessage(req.params.ts);
  newMessage.then((response) => {
    if (response === 1) res.status(204).send();
    else res.status(404).send({ message: "Message was not found" });
  });
});
 */

const validateMessage = (message) => {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string().required(),
    ts: Joi.string().min(1).required()
  });

  return schema.validate(message);
};

module.exports = router;