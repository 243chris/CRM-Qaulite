import { DataTypes } from 'sequelize';

export function createSaleItemModel(sequelize) {
  const SaleItem = sequelize.define('SaleItem', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    saleId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unitPrice: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    lineTotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  }, {
    tableName: 'sale_items',
    underscored: true,
  });

  return SaleItem;
}

