import mongoose from 'mongoose';
import '../models/user-schema.js';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
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
passport.use(new BasicStrategy(
    async (userIdent, password, done) => {
        try {
            const user = await userModel.findOne({
                '$or': [
                    { email: userIdent },
                    { username: userIdent }
                ]
            }).exec();
            // user wasn't found
            if (!user) return done(null, false);
            // user was found, see if it's a valid password
            if (!await user.verifyPassword(password)) {
                // password not valid
                return done(null, false);
            }
            // valid password, return user
            return done(null, user);
        } catch (error) {
            // error searching for user
            return done(error);
        }
    }
));
const userAPIController = { registerNewUser };
export default userAPIController;