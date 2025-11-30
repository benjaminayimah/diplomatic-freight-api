import express from "express";
import { fetch, create, update, destroy } from "../controllers/bankController.js";
import { bankValidation } from '../middlewares/validationMiddleware.js';

import { verifyToken } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

// Auth routes
router.get('/', verifyToken, fetch);
router.post('/', bankValidation, verifyToken, create);
router.put('/:id', verifyToken, bankValidation, update);
router.delete('/:id', verifyToken, destroy);

export default router;
