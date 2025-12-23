import express from "express";
import { fetch, fetchReceiptById, create, destroy } from "../controllers/receiptController.js";
import { verifyToken } from "../middlewares/authMiddleware.js"; 
import { receiptValidation } from '../middlewares/validationMiddleware.js';


const router = express.Router();

// Auth routes
router.get('/', verifyToken, fetch);
router.post('/', receiptValidation, verifyToken, create);
router.get('/:id', receiptValidation, verifyToken, fetchReceiptById);
// router.put('/:id', receiptValidation, verifyToken, update);
router.delete('/:id', verifyToken, destroy);

export default router;