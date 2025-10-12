import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  employees: [{ type: String }], // list of employee emails
  registrationNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  cellphoneNumber: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
});

export default mongoose.model("Business", businessSchema);
