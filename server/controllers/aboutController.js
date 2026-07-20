import asyncHandler from "express-async-handler";
import About from "../models/About.js";
import { uploadBufferToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";

// @desc    Get about info (single document)
// @route   GET /api/about
// @access  Public
export const getAbout = asyncHandler(async (req, res) => {
  let about = await About.findOne();
  if (!about) {
    about = await About.create({
      name: "Your Name",
      title: "Full Stack Developer",
      summary: "Tell visitors about yourself here.",
    });
  }
  res.json(about);
});

// @desc    Update about info (creates it if it doesn't exist yet)
// @route   PUT /api/about
// @access  Private (admin)
export const updateAbout = asyncHandler(async (req, res) => {
  let about = await About.findOne();
  if (!about) about = new About({ name: "Name", title: "Title", summary: "Summary" });

  const fields = ["name", "title", "summary", "resumeLink"];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) about[f] = req.body[f];
  });

  if (req.body.education) about.education = JSON.parse(req.body.education);
  if (req.body.experience) about.experience = JSON.parse(req.body.experience);
  if (req.body.achievements) about.achievements = JSON.parse(req.body.achievements);
  if (req.body.socialLinks) about.socialLinks = JSON.parse(req.body.socialLinks);

  if (req.file) {
    if (about.profilePicture?.publicId) {
      await deleteFromCloudinary(about.profilePicture.publicId);
    }
    const result = await uploadBufferToCloudinary(req.file.buffer, "portfolio/about");
    about.profilePicture = { url: result.secure_url, publicId: result.public_id };
  }

  const updated = await about.save();
  res.json(updated);
});
