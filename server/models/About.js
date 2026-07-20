import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    resumeLink: { type: String, default: "" },
    profilePicture: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    education: [
      {
        degree: String,
        institution: String,
        duration: String,
        details: String,
      },
    ],
    experience: [
      {
        role: String,
        company: String,
        duration: String,
        details: String,
      },
    ],
    achievements: [{ type: String }],
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      email: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
