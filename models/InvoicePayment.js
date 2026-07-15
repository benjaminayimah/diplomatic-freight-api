import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const InvoicePayment = sequelize.define('InvoicePayment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  invoice_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: true,
  tableName: 'invoice_payments'
});


InvoicePayment.associate = (models) => {
  InvoicePayment.belongsTo(models.Invoice, {
    foreignKey: "invoice_id",
    as: "invoice"
  });

  InvoicePayment.belongsTo(models.Payment, {
    foreignKey: "payment_id",
    as: "payment"
  });
};


export default InvoicePayment;