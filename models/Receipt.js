
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Receipt = sequelize.define('Receipt', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  receipt_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  invoice_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  paid_on: {
    type: DataTypes.DATE,
    allowNull: true
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: true
  },
  items: {
    type: DataTypes.JSON,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  vat: {
    type: DataTypes.STRING,
    allowNull: true
  },
  issued_by: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'receipts'
});

export default Receipt;
