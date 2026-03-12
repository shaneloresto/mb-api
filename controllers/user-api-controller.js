import mongoose from 'mongoose';
import '../models/user-schema.js';
const userModel = mongoose.model('user');
const registerNewUser = async (req, res) => {
    res.status(200).send('Successful API New User POST Request');
}
const userAPIController = { registerNewUser };
export default userAPIController;