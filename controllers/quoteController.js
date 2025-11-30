
import Quote from "../models/Quote.js";

import { validationResult } from "express-validator";


export const fetch = async (req, res) => {
  try {
    const quotes = await Quote.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({success: true, quotes: quotes});
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
    name,
    email,
    phone,
    departure_city,
    destination_city,
    cargo_type,
    weight,
    dimensions,
    shipping_date,
    additional_info
  } = req.body;

  try {
   
    const quote = await Quote.create({
      name,
      email,
      phone,
      departure_city,
      destination_city,
      cargo_type,
      weight,
      dimensions,
      shipping_date,
      additional_info
    });

    res.status(201).json({
      success: true,
      data: quote,
      message: 'Quote created successfully!',
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const fetchQuoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const quote = await Quote.findByPk(id);


    if (!quote) {
      return res.status(404).json({ success: false, message: "Quote not found" });
    }

    res.status(200).json({
      success: true,
      data: quote
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await Quote.findByPk(id);

    if (!quote) {
      return res.status(404).json({ error: 'Quote not found' });
    }

    await quote.destroy();

    res.status(200).json({ success: true, message: 'Quote has been deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};