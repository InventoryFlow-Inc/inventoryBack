import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true }, // "business" or "employee"
  employedBy: { type: String, default: null }, // only for employees
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
});

export default mongoose.model("User", userSchema);
