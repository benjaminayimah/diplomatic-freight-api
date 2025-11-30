import { body } from 'express-validator';
import User from '../models/User.js';
import Subscriber from '../models/Subscriber.js';
import bcrypt from "bcrypt";

// Helper to check if email is unique
// const isEmailUnique = async (email) => {
//   const user = await User.findOne({ where: { email } });
//   return !user;
// };

// Helper to check if email is unique, optionally ignoring a specific user ID
const isEmailUnique = async (email, userId = null) => {
  const user = await User.findOne({ where: { email } });
  if (user && user.id !== userId) {
    return false;
  }
  return true;
};

const isEmailUniqueSubscriber = async (email) => {
  const user = await Subscriber.findOne({ where: { email } });
  return user ? false : true;  
};


// Validation middleware for user sign-in
export const loginValidation = [
  body('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email format.'),
  body('password')
    .notEmpty().withMessage('Password is required.')
];

// Validation middleware for user registration
export const registerValidation = [
  body('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email format.')
    .custom(async (email) => {
      const unique = await isEmailUnique(email);
      if (!unique) {
        throw new Error('Email already exists.');
      }
      return true;
    }),
  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
];

// Validation middleware for profile
export const userValidation = [
  body('name')
    .notEmpty().withMessage('Name is required.'),
  body('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email format.')
    .custom(async (email, { req }) => {
      // Pass current user's ID from request (e.g., req.user.id)
      const unique = await isEmailUnique(email, req.user?.id);
      if (!unique) {
        throw new Error('Email already exists.');
      }
      return true;
    }),
];


// Validation middleware for profile
export const profileValidation = [
  body('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email format.'),
  body('company_name')
    .notEmpty().withMessage('Company name is required.'),
  body('phone')
    .matches(/^\+?\d{1,3}\s?\(?\d{1,3}\)?[\s-]?\d{2,4}[\s-]?\d{2,4}[\s-]?\d{2,4}$/)
    .withMessage('Invalid phone format.'),

  body('mobile')
    .matches(/^\+?\d{1,3}\s?\(?\d{1,3}\)?[\s-]?\d{2,4}[\s-]?\d{2,4}[\s-]?\d{2,4}$/)
    .withMessage('Invalid phone format.')
];


// Validation middleware for bank details
export const bankValidation = [
  body('bank_name')
    .notEmpty().withMessage('Bank name is required.'),
  body('account_name')
    .notEmpty().withMessage('Account name is required.'),
  body('account_number')
    .notEmpty().withMessage('Account number is required.')
];


// Validation middleware for invoice
export const invoiceValidation = [
  body('phone')
    .optional({ checkFalsy: true })
    .matches(/^\+?\d{1,3}\s?\(?\d{1,3}\)?[\s-]?\d{2,4}[\s-]?\d{2,4}[\s-]?\d{2,4}$/)
    .withMessage('Invalid phone format.'),
  body('date_of_departure')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate()
    .withMessage('Invalid date format.'),
  body('date_issue')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate()
    .withMessage('Invalid date format.'),
  body('date_due')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate()
    .withMessage('Invalid date format.'),
];


export const updatePasswordValidation = [
  body("current_password")
    .notEmpty().withMessage("Current password is required.")
    .custom(async (newPassword, { req }) => {
      const userId = req.user.id; // assuming you have auth middleware
      const user = await User.findByPk(userId);

      // Compare current password
      const match = await bcrypt.compare(req.body.current_password, user.password);
      if (!match) {
        throw new Error("Current password is incorrect.");
      }

      

      return true;
    }),

  body("new_password")
    .notEmpty().withMessage("New password is required.")
    .isLength({ min: 6 }).withMessage("New password must be at least 6 characters long.")
    .custom(async (newPassword, { req }) => {
      const userId = req.user.id; // assuming you have auth middleware
      const user = await User.findByPk(userId);

      if (!user) {
        throw new Error("User not found.");
      }


      // Check new password is not the same as current
      if (req.body.current_password === newPassword) {
        throw new Error("New password cannot be the same as current password.");
      }

      return true;
    }),
];


// Subscriber middleware for bank details
export const subscriberValidation = [
  body('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email format.')
    .custom(async (email) => {
      const unique = await isEmailUniqueSubscriber(email);
      if (!unique) {
        throw new Error('subscribed');
      }
      return true;
    }),
];



// Validation middleware for quote
export const quoteValidation = [
  body('name')
    .notEmpty().withMessage('Name is required.'),
  body('email')
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Invalid email format.'),
  body('phone')
    .notEmpty().withMessage('Phone number is required.')
    .matches(/^\+?\d{1,3}\s?\(?\d{1,3}\)?[\s-]?\d{2,4}[\s-]?\d{2,4}[\s-]?\d{2,4}$/)
    .withMessage('Invalid phone format.'),
  body('departure_city')
    .notEmpty().withMessage('Departure city is required.'),
  body('destination_city')
    .notEmpty().withMessage('Destination city is required.'),
  body('cargo_type')
    .notEmpty().withMessage('Cargo type is required.'),
  body('weight')
    .notEmpty().withMessage('Weight is required.')
    .isNumeric().withMessage('Weight must be a number.'),
  body('dimensions')
    .notEmpty().withMessage('Dimensions are required.'),
  body('shipping_date')
    .notEmpty().withMessage('Shipping date is required.')
    .isISO8601().toDate().withMessage('Invalid date format.'),
];
