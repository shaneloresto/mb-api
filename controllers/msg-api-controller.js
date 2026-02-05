import messageSchema from '../models/message-schema.js';
import mongoose from 'mongoose';
const messageModel = mongoose.model('message');
// const messages = []
// GET Request Handler
const getAllMessages = async (req, res) => {
    try {
        let messages = await messageModel.find({}, '', { sort: { _id: -1 } }).exec();
        res.status(200).json(messages);
    } catch (err) {
        res.status(400).send('Unknown Error');
    }
};
// POST Request Handler
const addNewMessage = async (req, res) => {
    //res.status(200).send('Successful API POST Request');
    try {
        // let message = messageSchema.parse(req.body);
        // message.id = `${messages.length}`;
        // messages.unshift(message);
        let message = await messageModel.create(req.body);
        res.status(201).json(message);
    } catch (err) {
        res.status(400).send('Bad Request. The message in the body of the \ Request is either missing or malformed.');
    }
};
// PATCH
const updateAMessage = async (req, res) => {
    // let foundMessage = messages.find(message => req.params.id === message.id);
    try {
        let message = await messageModel.findById(req.params.id).exec();
        if (!message) {
            return res.sendStatus(404);
        }
        message.text = req.body.text;
        await message.save()
        res.sendStatus(204);
    } catch (err) {
        res.status(400).send('Bad Request. The message in the body of the \ Request is either missing or malformed.');
    }
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