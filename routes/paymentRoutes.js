import express from "express";
import { fetch, create, update, destroy } from "../controllers/paymentController.js";
import { paymentValidation } from '../middlewares/validationMiddleware.js';

import { verifyToken } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

// Auth routes
router.get('/', verifyToken, fetch);
router.post('/', paymentValidation, verifyToken, create);
router.put('/:id', verifyToken, paymentValidation, update);
router.delete('/:id', verifyToken, destroy);

export default router;
