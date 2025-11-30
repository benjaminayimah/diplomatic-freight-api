
import Subscriber from "../models/Subscriber.js";

import { validationResult } from "express-validator";


export const fetch = async (req, res) => {
  try {
    const subscribers = await Subscriber.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({success: true, subscribers: subscribers});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const create = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
   
    const subscriber = await Subscriber.create({ email });

    res.status(201).json({
      success: true,
      data: subscriber,
      message: 'You have subscribed to our newsletter successfully!',
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const subscriber = await Subscriber.findByPk(id);

    if (!subscriber) {
      return res.status(404).json({ error: 'Email not found' });
    }

    await subscriber.destroy();

    res.status(200).json({ success: true, message: 'Email has been deleted' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};