import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Programming Languages",
        "Frontend",
        "Backend",
        "Database",
        "Mobile Development",
        "Tools",
      ],
    },
    proficiency: { type: Number, min: 1, max: 100, default: 70 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);
