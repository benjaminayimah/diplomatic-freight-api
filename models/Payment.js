
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  payment_method: {
    type: DataTypes.ENUM('bank_transfer', 'usdt_wallet'),
    allowNull: false
  },
  bank_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  account_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bank_branch: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  account_number: {
    type: DataTypes.STRING,
    allowNull: true
  },
  swift_code: {
    type: DataTypes.STRING,
    allowNull: true
  },
  wallet_address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  network: {
    type: DataTypes.STRING,
    allowNull: true
  },
  qr_code: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'payments'
});

export default Payment;