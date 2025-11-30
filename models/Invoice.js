
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  reference_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  date_issue: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  date_due: {
    type: DataTypes.DATE,
    allowNull: true
  },
  date_of_departure: {
    type: DataTypes.DATE,
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
  paid: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      isIn: [[true, false]]
    }
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'invoices'
});

export default Invoice;
