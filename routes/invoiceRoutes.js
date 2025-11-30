import express from "express";
import { fetch, fetchInvoiceById, verifyInvoice, create, update, destroy } from "../controllers/invoiceController.js";
import { verifyToken } from "../middlewares/authMiddleware.js"; 
import { invoiceValidation } from '../middlewares/validationMiddleware.js';


const router = express.Router();

// Auth routes
router.get('/', verifyToken, fetch);
router.get('/verify/:ref', verifyInvoice);
router.post('/', invoiceValidation, verifyToken, create);
router.get('/:id', invoiceValidation, verifyToken, fetchInvoiceById);
router.put('/:id', invoiceValidation, verifyToken, update);
router.delete('/:id', verifyToken, destroy);

export default router;