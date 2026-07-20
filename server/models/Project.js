import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    githubLink: { type: String, default: "" },
    liveLink: { type: String, default: "" },
    techStack: [{ type: String }],
    category: {
      type: String,
      required: true,
      enum: ["Web", "Mobile", "AI/ML", "IoT", "Other"],
      default: "Web",
    },
    featuredImage: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
    challenges: { type: String, default: "" },
    features: [{ type: String }],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
