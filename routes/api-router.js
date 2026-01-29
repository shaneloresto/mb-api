import express from 'express';
import msgAPIController from '../controllers/msg-api-controller.js';
const router = express.Router();
router.route('/messages')
.get(msgAPIController.getAllMessages)
.post(msgAPIController.addNewMessage);
export default router;