
import Bank from "../models/Bank.js"

import { validationResult } from "express-validator";


export const fetch = async (req, res) => {
  try {
    const banks = await Bank.findAll();
    res.status(200).json({success: true, data: banks});
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
    swift_code
  } = req.body;

  try {
    const newBank = await Bank.create({
      payment_method,
      bank_name,
      bank_branch,
      account_name,
      account_number,
      swift_code
    });

    res.status(201).json({ success: true, data: newBank, message: 'Bank is created successfully!'});

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
      swift_code
    } = req.body;

    const bank = await Bank.findOne({where: { id: id }});

    if (bank) {
      bank.payment_method = payment_method
      bank.bank_name = bank_name;
      bank.bank_branch = bank_branch;
      bank.account_name = account_name;
      bank.account_number = account_number;
      bank.swift_code = swift_code;

      await bank.save();

      res.status(200).json({ success: true, data: bank, message: 'Bank has been updated'});
    } else {
      res.status(404).json({ error: 'Bank not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getBankById = async (req, res) => {
  try {
    const { id } = req.params;
    const bank = await Bank.findByPk(id);

    res.status(200).json({ success: true, data: bank});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const bank = await Bank.findByPk(id);

    if (!bank) {
      return res.status(404).json({ error: 'Bank not found' });
    }

    await bank.destroy();

    res.status(200).json({ success: true, message: 'Bank has been deleted' });

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};