import express from "express";
import {
  getCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../controllers/certificationController.js";
import { protect } from "../middleware/authMiddleware.js";
import uploadCertification from "../middleware/certificationUploadMiddleware.js";

const router = express.Router();

router.get("/", getCertifications);
router.get("/:id", getCertificationById);
router.post("/", protect, uploadCertification.single("certificateFile"), createCertification);
router.put("/:id", protect, uploadCertification.single("certificateFile"), updateCertification);
router.delete("/:id", protect, deleteCertification);

export default router;