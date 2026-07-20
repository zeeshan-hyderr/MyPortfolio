import asyncHandler from "express-async-handler";
import Skill from "../models/Skill.js";

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ category: 1, order: 1 });
  res.json(skills);
});

// @desc    Create skill
// @route   POST /api/skills
// @access  Private (admin)
export const createSkill = asyncHandler(async (req, res) => {
  const { name, category, proficiency, order } = req.body;
  if (!name || !category) {
    res.status(400);
    throw new Error("Name and category are required");
  }
  const skill = await Skill.create({ name, category, proficiency, order });
  res.status(201).json(skill);
});

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private (admin)
export const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    res.status(404);
    throw new Error("Skill not found");
  }
  Object.assign(skill, req.body);
  const updated = await skill.save();
  res.json(updated);
});

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private (admin)
export const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (!skill) {
    res.status(404);
    throw new Error("Skill not found");
  }
  await skill.deleteOne();
  res.json({ message: "Skill removed" });
});
