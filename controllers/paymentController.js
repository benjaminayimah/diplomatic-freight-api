
import Payment from "../models/Payment.js"

import { validationResult } from "express-validator";


export const fetch = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json({success: true, data: payments});
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
    payment_method,
    bank_name,
    bank_branch,
    account_name,
    account_number,
    swift_code,
    wallet_address,
    network,
    qr_code,
  } = req.body;

  try {
    const newPayment = await Payment.create({
      payment_method,
      bank_name,
      bank_branch,
      account_name,
      account_number,
      swift_code,
      wallet_address,
      network,
      qr_code
    });

    res.status(201).json({ success: true, data: newPayment, message: 'Payment is created successfully!'});
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
      payment_method,
      bank_name,
      bank_branch,
      account_name,
      account_number,
      swift_code,
      wallet_address,
      network,
      qr_code
    } = req.body;

    const payment = await Payment.findOne({where: { id: id }});

    if (payment) {
      payment.payment_method = payment_method
      payment.bank_name = bank_name;
      payment.bank_branch = bank_branch;
      payment.account_name = account_name;
      payment.account_number = account_number;
      payment.swift_code = swift_code;
      payment.wallet_address = wallet_address;
      payment.network = network;
      payment.qr_code = qr_code;

      await payment.save();

      res.status(200).json({ success: true, data: payment, message: 'Payment has been updated'});
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);

    res.status(200).json({ success: true, data: payment});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    await payment.destroy();

    res.status(200).json({ success: true, message: 'Payment has been deleted' });

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};