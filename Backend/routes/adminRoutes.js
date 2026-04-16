import express from "express";
import {
  login,
  signup,
  getAdminProfile,
  updateAdminProfile,
  updatePassword,
} from "../controllers/adminControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getprofile", authMiddleware, getAdminProfile);
router.put("/updateprofile", authMiddleware, updateAdminProfile);
router.put("/updatepassword", authMiddleware, updatePassword);
export default router;
