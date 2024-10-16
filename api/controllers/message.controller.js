import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export async function sendMessage(req,res){
      try {
        const {message } = req.body;
        const { id : receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants : {$all : [senderId,receiverId]}
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId,receiverId]
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();

        await Promise.all([conversation.save(),newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
          //io.to(sockte_id).emit() used to send events to specific clients
          io.to(receiverSocketId).emit("newMessage",newMessage);
        }
        res.status(201).json(newMessage);
      } catch (error) {
        res.status(500).json({error : "while sendingMessage : "+error.message});
      }
}

export async function getMessages(req,res){
       try {
          const {id : userToChatId} = req.params;
          const senderId = req.user._id;

          const conversation = await Conversation.findOne({
            participants : {$all : [senderId,userToChatId]}
          }).populate("messages"); //get actual message

          if(!conversation) return res.status(200).json([]);

          const messages = conversation.messages; 
          res.status(200).json(messages);
       } catch (error) {
          res.status(500).json({error : "while gettingMessage : "+error.message})
       }
}