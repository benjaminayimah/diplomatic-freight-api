
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Bank = sequelize.define('Bank', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bank_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bank_branch: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  account_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  account_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  swift_code: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'banks'
});

export default Bank;
