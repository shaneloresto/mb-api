let messages = []
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
    res.status(200).send('Successful API POST Request');
};
export default { getAllMessages, addNewMessage };