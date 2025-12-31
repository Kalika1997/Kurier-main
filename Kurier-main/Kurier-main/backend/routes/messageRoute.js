import express from 'express'
import { getMessages, sendMessage } from '../controllers/messageController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();



router.post("/send/:id", protectRoute, sendMessage);        //takes userId whom I want to send message after authorization(jwt)

router.get("/:id", protectRoute,  getMessages);         //  b/w current user and the messageId which we will pass in param 



export default router; 







