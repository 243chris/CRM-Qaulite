import { db } from '../models/index.js';

export async function createCustomer(input) {
  return db.Customer.create(input);
}

export async function listCustomers({ search }) {
  const where = {};
  if (search) where.name = { [db.Sequelize.Op.like]: `%${search}%` };
  return db.Customer.findAll({ where, order: [['id', 'DESC']] });
}

export async function getCustomer(id) {
  return db.Customer.findByPk(id);
}

export async function updateCustomer(id, update) {
  const c = await getCustomer(id);
  if (!c) return null;
  await c.update(update);
  return c;
}

export async function deleteCustomer(id) {
  const c = await getCustomer(id);
  if (!c) return 0;
  await c.destroy();
  return 1;
}

export async function getCustomerHistory(id) {
  return db.Sale.findAll({ where: { customerId: id }, order: [['id', 'DESC']], include: [{ model: db.SaleItem, include: [db.Product] }] });
}

