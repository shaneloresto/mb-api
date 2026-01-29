import messageSchema from '../models/message-schema.js';
const messages = []
// GET Request Handler
const getAllMessages = (req, res) => {
    try {
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).send('Unknown Error');
    }
};
// POST Request Handler
const addNewMessage = (req, res) => {
    //res.status(200).send('Successful API POST Request');
    try {
        let message = messageSchema.parse(req.body);
        message.id = `${messages.length}`;
        messages.unshift(message);
        res.status(201).json(message);
        console.log(messages);
    } catch (err) {
        res.status(400).send('Bad Request. The message in the body of the \ Request is either missing or malformed.');
    }
};
// PATCH
const updateAMessage = (req, res) => {
    let foundMessage = messages.find(message => req.params.id === message.id);
    if (!foundMessage) {
        return res.sendStatus(404);
    }
    foundMessage.text = req.body.text;
    res.sendStatus(204);
}
// DELETE
const deleteAMessage = (req, res) => {
    // 1. Find the index of the message
    const index = messages.findIndex(message => String(message.id) === req.params.id);
    if (index === -1) {
        res.sendStatus(404);
    }
    messages.splice(index, 1);
    res.sendStatus(204);
}
export default { getAllMessages, addNewMessage, updateAMessage, deleteAMessage };