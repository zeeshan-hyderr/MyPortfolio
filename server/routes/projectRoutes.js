import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

const imageFields = upload.fields([
  { name: "featuredImage", maxCount: 1 },
  { name: "images", maxCount: 8 },
]);

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", protect, imageFields, createProject);
router.put("/:id", protect, imageFields, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;
