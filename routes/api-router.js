import express from 'express';
import msgAPIController from '../controllers/msg-api-controller.js';
const router = express.Router();
router.route('/messages')
.get(msgAPIController.getAllMessages)
.post(msgAPIController.addNewMessage);
router.route('/messages/:id')
.patch(msgAPIController.updateAMessage)
.delete(msgAPIController.deleteAMessage);
export default router;