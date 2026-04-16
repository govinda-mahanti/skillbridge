import express from "express";
import {
  createLab,
  updateLab,
  getAllLabs,
  getSingleLab,
} from "../controllers/labController.js";

import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const labUpload = uploadMiddleware.fields([
  { name: "img", maxCount: 1 },
  { name: "coverImg", maxCount: 1 },
  { name: "documents", maxCount: 10 },
]);

router.post("/add", authMiddleware, labUpload, createLab);     
router.put("/update/:id", authMiddleware, labUpload, updateLab);   // Edit Lab
router.get("/all", getAllLabs);                // Get All Labs
router.get("/single/:id", getSingleLab);           // Get Single Lab

export default router;