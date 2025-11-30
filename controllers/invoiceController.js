
import Invoice from "../models/Invoice.js"
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import Bank from "../models/Bank.js";

import { validationResult } from "express-validator";
// import { Op } from 'sequelize';
import crypto from "crypto";


export const fetch = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.status(200).json({success: true, invoices: invoices});
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
    date_issue,
    date_due,
    date_of_departure,
    items,
    name,
    email,
    phone,
    address,
    vat
  } = req.body;

  // return res.status(200).json({me: req.body})

  try {
   
    const reference_number = generateReferenceCode();
    const user = await User.findByPk(req.user.id)
    const createdBy = user.name
    
    const newInvoice = await Invoice.create({
      reference_number,
      date_issue: parseDate(date_issue),
      date_due: parseDate(date_due),
      date_of_departure: parseDate(date_of_departure),
      items,
      name,
      email,
      phone,
      address,
      vat,
      createdBy
    });

    res.status(201).json({
      success: true,
      data: newInvoice,
      message: 'Invoice is created successfully!',
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
      date_issue,
      date_due,
      date_of_departure,
      items,
      name,
      email,
      phone,
      address,
      vat
    } = req.body;

    const invoice = await Invoice.findOne({where: { id: id }});

    if (invoice) {
      invoice.date_issue = parseDate(date_issue);
      invoice.date_due = parseDate(date_due);
      invoice.date_of_departure = parseDate(date_of_departure);
      invoice.items = items;
      invoice.name = name;
      invoice.email = email;
      invoice.phone = phone;
      invoice.address = address;
      invoice.vat = vat;
      await invoice.save();

      res.status(200).json({ success: true, data: invoice, message: 'Invoice has been updated'});
    } else {
      res.status(404).json({ error: 'Invoice not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const fetchInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch invoice + company profile in parallel
    const [invoice, profile, banks] = await Promise.all([
      Invoice.findByPk(id),
      Profile.findOne({ order: [['createdAt', 'DESC']] }), // latest profile
      Bank.findAll()
    ]);

    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    // Generate QR Code URL (just string, not image yet)
    const qrData = `${process.env.FRONTEND_URL}/invoice/verify/${invoice.reference_number}`;

    res.status(200).json({
      success: true,
      data: { invoice, profile, banks, qrData }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const verifyInvoice = async (req, res) => {
  
  try {
    const { ref } = req.params;
    

    const invoice = await Invoice.findOne({ where: { reference_number: ref } });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invalid or unrecognized invoice reference",
      });
    }

    // if (invoice.status !== 'approved') { ... }

    res.status(200).json({
      success: true,
      message: "Invoice verified successfully",
      data: invoice
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error occurred",
      error: error.message,
    });
  }
}




export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByPk(id);

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    await invoice.destroy();

    res.status(200).json({ success: true, message: 'Invoice has been deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function generateReferenceCode() {
  return `INV-${new Date().getFullYear()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function parseDate(value) {
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};