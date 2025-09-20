import { DataTypes } from 'sequelize';

export function createSaleModel(sequelize) {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    customerId: { type: DataTypes.INTEGER, allowNull: true },
    currency: { type: DataTypes.ENUM('FC', 'USD', 'EUR'), allowNull: false, defaultValue: 'USD' },
    subtotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    tax: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    discount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    total: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    profit: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    invoiceNumber: { type: DataTypes.STRING(64), allowNull: false, unique: true },
  }, {
    tableName: 'sales',
    underscored: true,
  });

  return Sale;
}

