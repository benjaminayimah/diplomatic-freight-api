import express from "express";
import { fetch, create, destroy } from "../controllers/subscriberController.js";
import { subscriberValidation } from '../middlewares/validationMiddleware.js';

import { verifyToken } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

// Auth routes
router.get('/', verifyToken, fetch);
router.post('/', subscriberValidation, create);
router.delete('/:id', verifyToken, destroy);

export default router;
