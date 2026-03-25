import express from 'express';
import msgAPIController from '../controllers/msg-api-controller.js';
import userAPIController from '../controllers/user-api-controller.js';
import passport from 'passport';
const router = express.Router();
router.route('/messages')
.get(msgAPIController.getAllMessages)
.post(passport.authenticate('jwt', { session: false }), msgAPIController.addNewMessage);
router.route('/users')
.post(userAPIController.registerNewUser);
router.route('/messages/:id')
.patch(msgAPIController.updateAMessage)
.delete(msgAPIController.deleteAMessage);
router.route('/login')
.post(passport.authenticate('local', { session: false }), userAPIController.logInUser);
export default router;