
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^\+?[0-9()\s-]{7,}$/i, // allows +233, (), -, etc.
    }
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^\+?[0-9()\s-]{7,}$/i, // allows +233, (), -, etc.
    }
  },
  address_line_1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address_line_2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address_line_3: {
    type: DataTypes.STRING,
    allowNull: true
  },
  po_box: {
    type: DataTypes.STRING,
    allowNull: true
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tagline: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'profiles'
});

export default Profile;
