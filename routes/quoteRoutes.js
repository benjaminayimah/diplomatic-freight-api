import express from "express";
import { fetch, fetchQuoteById, create, destroy } from "../controllers/quoteController.js";
import { quoteValidation } from '../middlewares/validationMiddleware.js';

import { verifyToken } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

// Auth routes
router.get('/', verifyToken, fetch);
router.get('/:id', verifyToken, fetchQuoteById);
router.post('/', quoteValidation, create);
router.delete('/:id', verifyToken, destroy);

export default router;
