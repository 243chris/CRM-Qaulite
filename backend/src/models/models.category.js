import { DataTypes, Sequelize } from 'sequelize';

export function createCategoryModel(sequelize) {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(120), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    parentId: { type: DataTypes.INTEGER, allowNull: true },
  }, {
    tableName: 'categories',
    underscored: true,
  });

  return Category;
}

