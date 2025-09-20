import { DataTypes } from 'sequelize';

export function createProductModel(sequelize) {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(180), allowNull: false },
    sku: { type: DataTypes.STRING(64), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    unitPrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    reorderThresholdPercent: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 30 },
    expiryDate: { type: DataTypes.DATE, allowNull: true },
    categoryId: { type: DataTypes.INTEGER, allowNull: true },
  }, {
    tableName: 'products',
    underscored: true,
  });

  return Product;
}

