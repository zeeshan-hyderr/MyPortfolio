import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    verificationLink: { type: String, default: "" },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date, default: null },
    credentialId: { type: String, default: "" },
    shortDescription: { type: String, required: true },
    skills: [{ type: String }],
    category: {
      type: String,
      required: true,
      enum: ["Programming", "AI", "Cloud", "Database", "Web Development", "DevOps", "Security", "Other"],
      default: "Programming",
    },
    certificateFile: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
      resourceType: { type: String, enum: ["image", "raw", "auto"], default: "image" },
      mimeType: { type: String, default: "" },
      originalName: { type: String, default: "" },
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Certification", certificationSchema);