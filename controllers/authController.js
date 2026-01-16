import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Profile from "../models/Profile.js";
import Bank from "../models/Bank.js";
import Payment from "../models/Payment.js";
import Invoice from "../models/Invoice.js";
import Subscriber from "../models/Subscriber.js";
import Quote from "../models/Quote.js";
import Receipt from "../models/Receipt.js";
import { validationResult } from "express-validator";


// JWT secret and expiration
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN


export const register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Example: await User.create({ email, password: hashedPassword });

  res.status(201).json({ message: "User created successfully" });
};

export const login = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      // Create Auth JWT token
      const token = createToken({ id: user.id, email: user.email })

      // const profile = await Profile.findOne({order: [['createdAt', 'ASC']]});
      // const banks = await Bank.findAll();
      // const invoices = await Invoice.findAll();
      // const subscribers = await Subscriber.findAll({ order: [['createdAt', 'DESC']] });
      // const quotes = await Quote.findAll({ order: [['createdAt', 'DESC']] });
      // const receipts = await Receipt.findAll({ order: [['createdAt', 'DESC']]});


      res.status(200).json({
        success: true,
        message: 'Sign in successful',
        user,
        token,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }

};

export const fetch = async (req, res) => {

  try {
      const id = req.user.id
      // Find user by email
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const profile = await Profile.findOne({order: [['createdAt', 'ASC']]});
      const payments = await Payment.findAll();
      const invoices = await Invoice.findAll();
      const subscribers = await Subscriber.findAll({ order: [['createdAt', 'DESC']] });
      const quotes = await Quote.findAll({ order: [['createdAt', 'DESC']] });
      const receipts = await Receipt.findAll({ order: [['createdAt', 'DESC']]});


      res.status(200).json({
        success: true,
        profile,
        payments,
        invoices,
        subscribers,
        quotes,
        receipts
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
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
      name,
      email,
    } = req.body;

    const user = await User.findOne({where: { id: id }});

    if (user) {
      user.name = name;
      user.email = email;
      await user.save();

      res.status(200).json({ success: true, data: user, message: 'User has been updated'});
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePassword = async(req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const user = await User.findByPk(req.user.id);

    const { new_password } = req.body;

    user.password = await bcrypt.hash(new_password, 10);
    user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


// Create Auth JWT token
const createToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
