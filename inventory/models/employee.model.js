import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employedBy: { type: String, required: true }, // business name or registration number
  email: { type: String, required: true, unique: true },
  cellphoneNumber: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending"
  }
});

export default mongoose.model("Employee", employeeSchema);
