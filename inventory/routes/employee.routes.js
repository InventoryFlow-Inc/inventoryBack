import express from "express";
import {
  getEmployees,
  createEmployee,
  deleteEmployee,
  approveEmployee
} from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/", getEmployees);
router.post("/", createEmployee);
router.patch("/:id/approve", approveEmployee); // ✅ approve employee
router.delete("/:id", deleteEmployee);

export default router;
