
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Quote = sequelize.define('Quote', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^\+?[0-9()\s-]{7,}$/i, // allows +233, (), -, etc.
    }
  },
  departure_city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  destination_city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cargo_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weight: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dimensions: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shipping_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  additional_info: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'quotes'
});

export default Quote;
