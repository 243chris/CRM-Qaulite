import { DataTypes } from 'sequelize';

export function createCustomerModel(sequelize) {
  const Customer = sequelize.define('Customer', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(180), allowNull: false },
    email: { type: DataTypes.STRING(180), allowNull: true },
    phone: { type: DataTypes.STRING(64), allowNull: true },
    address: { type: DataTypes.STRING(255), allowNull: true },
  }, {
    tableName: 'customers',
    underscored: true,
  });

  return Customer;
}

