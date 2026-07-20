import asyncHandler from "express-async-handler";
import { ContactInfo, Message } from "../models/Contact.js";

// @desc    Get public contact info
// @route   GET /api/contact/info
// @access  Public
export const getContactInfo = asyncHandler(async (req, res) => {
  let info = await ContactInfo.findOne();
  if (!info) {
    info = await ContactInfo.create({ email: "you@example.com" });
  }
  res.json(info);
});

// @desc    Update contact info
// @route   PUT /api/contact/info
// @access  Private (admin)
export const updateContactInfo = asyncHandler(async (req, res) => {
  let info = await ContactInfo.findOne();
  if (!info) info = new ContactInfo({ email: req.body.email || "you@example.com" });

  ["email", "phone", "location", "github", "linkedin"].forEach((f) => {
    if (req.body[f] !== undefined) info[f] = req.body[f];
  });

  const updated = await info.save();
  res.json(updated);
});

// @desc    Submit a contact form message
// @route   POST /api/contact/message
// @access  Public
export const sendMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Name, email and message are all required");
  }
  const saved = await Message.create({ name, email, message });
  res.status(201).json({ message: "Message sent successfully", data: saved });
});

// @desc    Get all messages
// @route   GET /api/contact/messages
// @access  Private (admin)
export const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

// @desc    Delete a message
// @route   DELETE /api/contact/messages/:id
// @access  Private (admin)
export const deleteMessage = asyncHandler(async (req, res) => {
  const msg = await Message.findById(req.params.id);
  if (!msg) {
    res.status(404);
    throw new Error("Message not found");
  }
  await msg.deleteOne();
  res.json({ message: "Message removed" });
});
