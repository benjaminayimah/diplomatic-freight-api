import express from "express";
import { login, update, fetch, updatePassword } from "../controllers/authController.js";
import { loginValidation, userValidation, updatePasswordValidation } from '../middlewares/validationMiddleware.js';
import rateLimit from "express-rate-limit";
import { verifyToken } from "../middlewares/authMiddleware.js"; // <-- fixed import

const router = express.Router();

// Login rate limiter (prevents brute-force attacks)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 attempts
  message: { message: "Too many login attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth routes
// router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.put("/:id", verifyToken, userValidation, update);
router.get('/', verifyToken, fetch);
router.post("/update-password", verifyToken, updatePasswordValidation, updatePassword)

router.post("/logout", verifyToken, (req, res) => {
  res.json({ success: true, message: "User has been logged out successfully." });
});

export default router;
