import express from "express";
import { getAbout, updateAbout } from "../controllers/aboutController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAbout);
router.put("/", protect, upload.single("profilePicture"), updateAbout);

export default router;
