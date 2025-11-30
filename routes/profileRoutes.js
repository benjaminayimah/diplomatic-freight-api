import express from "express";
import { fetch, update } from "../controllers/profileController.js";
import { verifyToken } from "../middlewares/authMiddleware.js"; 
import { profileValidation } from '../middlewares/validationMiddleware.js';


const router = express.Router();

// Auth routes
router.get('/', verifyToken, fetch);
router.put('/:id', profileValidation, verifyToken, update);

export default router;