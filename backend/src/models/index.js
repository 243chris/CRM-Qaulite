import { Sequelize } from 'sequelize';
import { createCategoryModel } from './models.category.js';
import { createProductModel } from './models.product.js';
import { createCustomerModel } from './models.customer.js';
import { createSaleModel } from './models.sale.js';
import { createSaleItemModel } from './models.saleItem.js';

const databaseName = process.env.DB_NAME || 'inventory_dev';
const databaseUser = process.env.DB_USER || 'postgres';
const databasePassword = process.env.DB_PASSWORD || 'postgres';
const databaseHost = process.env.DB_HOST || '127.0.0.1';
const databaseDialect = process.env.DB_DIALECT || 'sqlite';
const sqliteStorage = process.env.DB_STORAGE || './data/dev.sqlite';

let sequelize;
if (databaseDialect === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: sqliteStorage,
    logging: false,
  });
} else {
  sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
    host: databaseHost,
    dialect: databaseDialect,
    logging: false,
  });
}

export const db = {};

db.Category = createCategoryModel(sequelize);
db.Product = createProductModel(sequelize);
db.Customer = createCustomerModel(sequelize);
db.Sale = createSaleModel(sequelize);
db.SaleItem = createSaleItemModel(sequelize);
db.Sequelize = Sequelize;

// Associations
db.Category.hasMany(db.Category, { as: 'children', foreignKey: 'parentId' });
db.Category.hasMany(db.Product, { foreignKey: 'categoryId' });
db.Category.belongsTo(db.Category, { as: 'parent', foreignKey: 'parentId' });

db.Product.belongsTo(db.Category, { foreignKey: 'categoryId' });
db.Product.hasMany(db.SaleItem, { foreignKey: 'productId' });

db.Customer.hasMany(db.Sale, { foreignKey: 'customerId' });
db.Sale.belongsTo(db.Customer, { foreignKey: 'customerId' });

db.Sale.hasMany(db.SaleItem, { foreignKey: 'saleId' });
db.SaleItem.belongsTo(db.Sale, { foreignKey: 'saleId' });
db.SaleItem.belongsTo(db.Product, { foreignKey: 'productId' });

export const initDatabase = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
};

export { sequelize };

