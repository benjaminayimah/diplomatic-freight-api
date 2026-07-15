
import db from "../models/index.js";

const {
  Invoice,
  Payment,
  Profile,
  InvoicePayment,
  User
} = db;

import { validationResult } from "express-validator";
// import { Op } from 'sequelize';
import crypto from "crypto";


export const fetch = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: {
        model: Payment,
        as: "payments",
        through: {
          attributes: [] // hides invoice_payments fields
        }
      },
      order: [
        ['createdAt', 'DESC']
      ]
    });
    res.status(200).json({success: true, invoices});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  // return res.status(200).json({me: req.body})
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    date_issue,
    date_due,
    date_of_departure,
    currency,
    items,
    paymentIDs,
    name,
    email,
    phone,
    address,
    note,
    vat,
    has_refund_policy,
    personal_note
  } = req.body;

  // return res.status(200).json({me: req.body})

  try {
   
    const reference_number = generateReferenceCode();
    const createdBy = req.user.id
    
    const newInvoice = await Invoice.create({
      reference_number,
      date_issue: parseDate(date_issue),
      date_due: parseDate(date_due),
      date_of_departure: parseDate(date_of_departure),
      currency,
      items,
      name,
      email,
      phone,
      address,
      note,
      vat,
      createdBy,
      has_refund_policy,
      personal_note
    });


    // Attach payment methods
    if (Array.isArray(paymentIDs) && paymentIDs.length) {
      await newInvoice.setPayments(paymentIDs);
    }

    const result = await Invoice.findByPk(newInvoice.id, {
      include: {
        model: Payment,
        as: "payments"
      }
    });


    res.status(201).json({
      success: true,
      data: result,
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
      currency,
      items,
      paymentIDs,
      name,
      email,
      phone,
      address,
      note,
      vat,
      has_refund_policy,
      personal_note
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
      invoice.note = note;
      invoice.vat = vat;
      invoice.currency = currency;
      invoice.has_refund_policy = has_refund_policy,
      invoice.personal_note = personal_note
      await invoice.save();

      // Attach payment methods
      if (Array.isArray(paymentIDs)) {
        await invoice.setPayments(paymentIDs);
      }

      const result = await Invoice.findByPk(invoice.id, {
        include: {
          model: Payment,
          as: "payments",
          through: {
            attributes: []
          }
        }
      });

      res.status(200).json({ success: true, data: result, message: 'Invoice has been updated'});
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

    // Fetch invoice + company profile + all available payments
    const [invoice, profile] = await Promise.all([
      Invoice.findByPk(id, {
        include: {
          model: Payment,
          as: "payments",
          through: {
            attributes: []
          }
        }
      }),

      Profile.findOne({
        order: [['createdAt', 'DESC']]
      }),

    ]);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found"
      });
    }


    const user = await User.findByPk(invoice.createdBy);
    const createdBy = user?.name;

    // Generate QR Code URL
    const qrData = `${process.env.FRONTEND_URL}/app/verify-invoice/${invoice.reference_number}`;

    res.status(200).json({
      success: true,
      data: {
        invoice,
        profile,
        qrData,
        createdBy
      }
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
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
      return res.status(404).json({
        error: "Invoice not found"
      });
    }

    // Remove related payment associations first
    await InvoicePayment.destroy({
      where: {
        invoice_id: id
      }
    });

    // Delete invoice
    await invoice.destroy();

    return res.status(200).json({
      success: true,
      message: "Invoice has been deleted"
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
};



function generateReferenceCode() {
  return `INV-${new Date().getFullYear()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function parseDate(value) {
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};