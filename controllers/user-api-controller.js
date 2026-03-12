import mongoose from 'mongoose';
import '../models/user-schema.js';
const userModel = mongoose.model('user');
const registerNewUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // 1. Await the check (assuming it's a DB call)
        const userExists = await alreadyExists(email, username);
        
        if (userExists) {
            // 2. Added 'return' to stop execution here
            return res.status(403).send('Email or username already exists');
        }

        // 3. Be explicit about what you're saving
        const user = await userModel.create({
            email,
            username,
            password // Make sure this is hashed!
        });

        res.status(201).json(user);
    } catch (err) {
        res.status(400).send('Bad Request. The message in the body of the \ Request is either missing or malformed.');
    }
}
// helper function to determine if email or username
// already exists in the DB. Returns true or false.
const alreadyExists = async ( email, username ) => (
    await userModel.exists({
        '$or': [
            { email },
            { username }
        ]
    })
);
const userAPIController = { registerNewUser };
export default userAPIController;