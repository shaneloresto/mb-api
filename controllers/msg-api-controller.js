// GET Request Handler
const getAllMessages = (req, res) => {
    res.status(200).send('Successful API GET Request');
};
// POST Request Handler
const addNewMessage = (req, res) => {
    res.status(200).send('Successful API POST Request');
};
export default { getAllMessages, addNewMessage };