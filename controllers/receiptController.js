
import db from "../models/index.js";
const {
  User,
  Profile,
  Receipt
} = db;

import { validationResult } from "express-validator";
import crypto from "crypto";
import { getRandomColor } from '../utils/ColorTrait.js'



export const fetch = async (req, res) => {
  try {
    const receipts = await Receipt.findAll();
    res.status(200).json({success: true, receipts: receipts});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    id,
    paid_on,
    payment_method,
    currency,
    items,
    name,
    email,
    phone,
    address,
    vat
  } = req.body;

  // return res.status(200).json({me: req.body})

  try {
   
    const receipt_number = generateReceiptNumber();
    const color = getRandomColor()
    const issued_by = req.user.id
    const invoice_id = id ? id : null
    
    const newReceipt = await Receipt.create({
      receipt_number,
      invoice_id,
      paid_on: parseDate(paid_on),
      payment_method,
      currency,
      items,
      name,
      email,
      phone,
      address,
      vat,
      issued_by,
      color
    });

    res.status(201).json({
      success: true,
      data: newReceipt,
      message: 'Receipt is created successfully!',
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const update = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params
    const {
      paid_on,
      payment_method,
      currency,
      items,
      name,
      email,
      phone,
      address,
      vat
    } = req.body;

    const receipt = await Receipt.findOne({where: { id: id }});

    if (receipt) {
      receipt.paid_on = parseDate(paid_on);
      receipt.payment_method = payment_method;
      receipt.currency = currency;
      receipt.items = items;
      receipt.name = name;
      receipt.email = email;
      receipt.phone = phone;
      receipt.address = address;
      receipt.vat = vat;
      await receipt.save();

      res.status(200).json({ success: true, data: receipt, message: 'Receipt has been updated'});
    } else {
      res.status(404).json({ error: 'Receipt not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const fetchReceiptById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch receipt + company profile in parallel
    const [receipt, profile] = await Promise.all([
      Receipt.findByPk(id),
      Profile.findOne({ order: [['createdAt', 'DESC']] }), // latest profile
    ]);
      
    const user = await User.findByPk(receipt?.issued_by)
    const issuedBy = user?.name

    if (!receipt) {
      return res.status(404).json({ success: false, message: "Receipt not found" });
    }

    res.status(200).json({
      success: true,
      data: { receipt, profile, issuedBy }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const receipt = await Receipt.findByPk(id);

    if (!receipt) {
      return res.status(404).json({ error: 'Receipt not found' });
    }

    await receipt.destroy();

    res.status(200).json({ success: true, message: 'Receipt has been deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function generateReceiptNumber() {
  return `DFL-${new Date().getFullYear()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function parseDate(value) {
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};