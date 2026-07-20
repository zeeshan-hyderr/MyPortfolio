import mongoose from "mongoose";

// Single-document collection storing the editable contact info shown on the site
const contactInfoSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
  },
  { timestamps: true }
);

// Messages submitted through the public contact form
const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);
export const Message = mongoose.model("Message", messageSchema);
