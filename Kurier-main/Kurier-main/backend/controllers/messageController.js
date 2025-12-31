import Conversation from "../model/conversation.js";
import Message from "../model/message.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {

	try {
		const { message } = req.body;           // getting message from body 
		const { id: receiverId } = req.params;          // getting id  from params 
		const senderId = req.user._id;					// getting it from previous middleware 

		// 1st- find conversation b/w these 2 user
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		// if no conversation (sending message for 1st time) then create a conversatin with default empty message[]
		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		// messageId will be created by mongoDB and that messageId will be pushed into conversationSchema's Message array 
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		// if message created sucessfully then push the messageid in conversation model 
		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// await conversation.save();
		// await newMessage.save();

		// the above approach will take longer as 2nd line will run only after completion of 1st, but we can make it run parallely
		// // this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// //TODO: add SOCKET IO 
		// we get the socket id of receiver from getReceiverSocketId function, then we emit newMessage event specifically to that socketId(receiverSocketId)
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};




export const getMessages = async (req, res) => {
	try {

		const { id: userToChatWithId } = req.params;
		const senderId = req.user._id;					// from previous middleware (protect..)


		// we need to find all the conversations between me(senderId) and the user with whome i am chatting with (userToChatWithId) 
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatWithId] },
		}).populate("messages"); // poplulate -> will give ACTUAL MESSAGES otherwise we sould be getting reference 

		if (!conversation) 
			return res.status(200).json([]);
		// console.log(conversation);

			// we are getting whole object but we only need messages[] field from conversation object
		const messages = conversation.messages;

		res.status(200).json(messages);

	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}

