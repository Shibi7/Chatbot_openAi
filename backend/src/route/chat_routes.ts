import { Router } from "express";
import { verifyToken } from "../utils/token_manager.js";
import { chatCompletionValidator, validate } from "../utils/validator.js";
import { deleteAllChats, generateChatCompletion, getAllChats } from "../controllers/chatController.js";

// protected API
const chatRoutes = Router();

chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);
chatRoutes.get("/current-chats", verifyToken, getAllChats);
chatRoutes.delete("/delete", verifyToken, deleteAllChats);

export default chatRoutes;