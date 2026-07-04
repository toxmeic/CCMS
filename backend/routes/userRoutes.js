import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile,
  getStudents,
  deleteStudent,
  resetPassword
} from "../controllers/userController.js";
const router = express.Router();
router.post("/resetPassword", resetPassword);
router.post("/register", register);
router.post("/login", login);
router.get("/profile/:name", getProfile);
router.put("/updateProfile/:id", updateProfile);
router.get("/students", getStudents);
router.delete("/deleteStudent/:id",deleteStudent);
export default router;