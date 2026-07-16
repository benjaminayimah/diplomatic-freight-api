'use strict';

import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Subscriber = sequelize.define('Subscriber', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'subscribers'
});

export default Subscriber;
