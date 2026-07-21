import asyncHandler from "express-async-handler";
import Certification from "../models/Certification.js";
import { uploadBufferToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";

const parseSkills = (skills) => {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills.map((skill) => `${skill}`.trim()).filter(Boolean);
  try {
    return JSON.parse(skills).map((skill) => `${skill}`.trim()).filter(Boolean);
  } catch {
    return `${skills}`
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }
};

const parseDate = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const buildUploadResult = (upload) => ({
  url: upload.secure_url,
  publicId: upload.public_id,
  resourceType: upload.resource_type || "image",
  mimeType: upload.format === "pdf" ? "application/pdf" : upload.resource_type === "image" ? `image/${upload.format}` : "",
  originalName: upload.original_filename || "",
});

// @desc    Get all certifications
// @route   GET /api/certifications
// @access  Public
export const getCertifications = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  const filter = {};

  if (category && category !== "All") {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { organization: { $regex: search, $options: "i" } },
      { shortDescription: { $regex: search, $options: "i" } },
      { skills: { $regex: search, $options: "i" } },
    ];
  }

  const certifications = await Certification.find(filter).sort({ order: 1, issueDate: -1, createdAt: -1 });
  res.json(certifications);
});

// @desc    Get certification by id
// @route   GET /api/certifications/:id
// @access  Public
export const getCertificationById = asyncHandler(async (req, res) => {
  const certification = await Certification.findById(req.params.id);
  if (!certification) {
    res.status(404);
    throw new Error("Certification not found");
  }
  res.json(certification);
});

// @desc    Create certification
// @route   POST /api/certifications
// @access  Private (admin)
export const createCertification = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("A certificate image or PDF is required");
  }

  const upload = await uploadBufferToCloudinary(req.file.buffer, "portfolio/certifications", "auto");
  const fileData = buildUploadResult(upload);

  const certification = await Certification.create({
    title: req.body.title,
    organization: req.body.organization,
    verificationLink: req.body.verificationLink || "",
    issueDate: req.body.issueDate,
    expiryDate: parseDate(req.body.expiryDate),
    credentialId: req.body.credentialId || "",
    shortDescription: req.body.shortDescription,
    skills: parseSkills(req.body.skills),
    category: req.body.category,
    featured: req.body.featured === "true",
    order: req.body.order || 0,
    certificateFile: fileData,
  });

  res.status(201).json(certification);
});

// @desc    Update certification
// @route   PUT /api/certifications/:id
// @access  Private (admin)
export const updateCertification = asyncHandler(async (req, res) => {
  const certification = await Certification.findById(req.params.id);
  if (!certification) {
    res.status(404);
    throw new Error("Certification not found");
  }

  const fields = ["title", "organization", "verificationLink", "issueDate", "credentialId", "shortDescription", "category", "order"];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) certification[field] = req.body[field];
  });

  if (req.body.expiryDate !== undefined) certification.expiryDate = parseDate(req.body.expiryDate);
  if (req.body.skills) certification.skills = parseSkills(req.body.skills);
  if (req.body.featured !== undefined) certification.featured = req.body.featured === "true";

  if (req.file) {
    await deleteFromCloudinary(certification.certificateFile.publicId, certification.certificateFile.resourceType || "image");
    const upload = await uploadBufferToCloudinary(req.file.buffer, "portfolio/certifications", "auto");
    certification.certificateFile = buildUploadResult(upload);
  }

  const updated = await certification.save();
  res.json(updated);
});

// @desc    Delete certification
// @route   DELETE /api/certifications/:id
// @access  Private (admin)
export const deleteCertification = asyncHandler(async (req, res) => {
  const certification = await Certification.findById(req.params.id);
  if (!certification) {
    res.status(404);
    throw new Error("Certification not found");
  }

  await deleteFromCloudinary(certification.certificateFile.publicId, certification.certificateFile.resourceType || "image");
  await certification.deleteOne();

  res.json({ message: "Certification removed" });
});