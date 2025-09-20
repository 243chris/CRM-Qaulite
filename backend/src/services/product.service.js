import { db } from '../models/index.js';
import dayjs from 'dayjs';

export async function createProduct(input) {
  return db.Product.create(input);
}

export async function listProducts({ search, categoryId }) {
  const where = {};
  if (categoryId) where.categoryId = categoryId;
  if (search) where.name = { [db.Sequelize.Op.like]: `%${search}%` };
  return db.Product.findAll({ where, order: [['id', 'DESC']], include: [{ model: db.Category }] });
}

export async function getProduct(id) {
  return db.Product.findByPk(id, { include: [{ model: db.Category }] });
}

export async function updateProduct(id, update) {
  const product = await getProduct(id);
  if (!product) return null;
  await product.update(update);
  return product;
}

export async function deleteProduct(id) {
  const product = await getProduct(id);
  if (!product) return 0;
  await product.destroy();
  return 1;
}

export function isLowStock(product) {
  if (product.quantity == null) return false;
  const thresholdPercent = product.reorderThresholdPercent ?? 30;
  // Consider low stock when quantity is below threshold relative to a notional max; for simplicity, threshold against 100 units
  const notionalMax = 100;
  return product.quantity <= Math.ceil((thresholdPercent / 100) * notionalMax);
}

export function isExpiringSoon(product, months = 2) {
  if (!product.expiryDate) return false;
  const now = dayjs();
  const exp = dayjs(product.expiryDate);
  return exp.isAfter(now) && exp.diff(now, 'month', true) <= months;
}

