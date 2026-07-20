import express from "express";
import {
  getContactInfo,
  updateContactInfo,
  sendMessage,
  getMessages,
  deleteMessage,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/info", getContactInfo);
router.put("/info", protect, updateContactInfo);
router.post("/message", sendMessage);
router.get("/messages", protect, getMessages);
router.delete("/messages/:id", protect, deleteMessage);

export default router;
