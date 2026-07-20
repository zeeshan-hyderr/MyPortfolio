import asyncHandler from "express-async-handler";
import Project from "../models/Project.js";
import { uploadBufferToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";

// @desc    Get all projects (supports ?category= and ?search=)
// @route   GET /api/projects
// @access  Public
export const getProjects = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  const filter = {};

  if (category && category !== "All") {
    filter.category = category;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { shortDescription: { $regex: search, $options: "i" } },
      { techStack: { $regex: search, $options: "i" } },
    ];
  }

  const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
  res.json(projects);
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }
  res.json(project);
});

// @desc    Create project
// @route   POST /api/projects
// @access  Private (admin)
export const createProject = asyncHandler(async (req, res) => {
  const {
    title,
    shortDescription,
    fullDescription,
    githubLink,
    liveLink,
    techStack,
    category,
    challenges,
    features,
    featured,
    order,
  } = req.body;

  if (!req.files || !req.files.featuredImage) {
    res.status(400);
    throw new Error("A featured image is required");
  }

  const featuredResult = await uploadBufferToCloudinary(
    req.files.featuredImage[0].buffer,
    "portfolio/projects"
  );

  let images = [];
  if (req.files.images) {
    const uploads = await Promise.all(
      req.files.images.map((f) => uploadBufferToCloudinary(f.buffer, "portfolio/projects"))
    );
    images = uploads.map((u) => ({ url: u.secure_url, publicId: u.public_id }));
  }

  const project = await Project.create({
    title,
    shortDescription,
    fullDescription,
    githubLink,
    liveLink,
    techStack: techStack ? JSON.parse(techStack) : [],
    category,
    challenges,
    features: features ? JSON.parse(features) : [],
    featured: featured === "true",
    order: order || 0,
    featuredImage: { url: featuredResult.secure_url, publicId: featuredResult.public_id },
    images,
  });

  res.status(201).json(project);
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (admin)
export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  const fields = [
    "title",
    "shortDescription",
    "fullDescription",
    "githubLink",
    "liveLink",
    "category",
    "challenges",
    "order",
  ];
  fields.forEach((f) => {
    if (req.body[f] !== undefined) project[f] = req.body[f];
  });

  if (req.body.techStack) project.techStack = JSON.parse(req.body.techStack);
  if (req.body.features) project.features = JSON.parse(req.body.features);
  if (req.body.featured !== undefined) project.featured = req.body.featured === "true";

  if (req.files && req.files.featuredImage) {
    await deleteFromCloudinary(project.featuredImage.publicId);
    const result = await uploadBufferToCloudinary(
      req.files.featuredImage[0].buffer,
      "portfolio/projects"
    );
    project.featuredImage = { url: result.secure_url, publicId: result.public_id };
  }

  if (req.files && req.files.images) {
    const uploads = await Promise.all(
      req.files.images.map((f) => uploadBufferToCloudinary(f.buffer, "portfolio/projects"))
    );
    const newImages = uploads.map((u) => ({ url: u.secure_url, publicId: u.public_id }));
    project.images = [...project.images, ...newImages];
  }

  const updated = await project.save();
  res.json(updated);
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (admin)
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  await deleteFromCloudinary(project.featuredImage.publicId);
  await Promise.all(project.images.map((img) => deleteFromCloudinary(img.publicId)));
  await project.deleteOne();

  res.json({ message: "Project removed" });
});
