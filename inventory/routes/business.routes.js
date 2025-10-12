import express from "express";
import {
  getBusinesses,
  createBusiness,
  deleteBusiness,
  approveBusiness
} from "../controllers/business.controller.js";

const router = express.Router();

router.get("/", getBusinesses);
router.post("/", createBusiness);
router.patch("/:id/approve", approveBusiness); // ✅ approve business
router.delete("/:id", deleteBusiness);

export default router;
