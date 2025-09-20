import { db, sequelize } from '../models/index.js';
import { convertAmount } from '../utils/currency.js';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';

export async function createSale({ customerId, items, currency = 'USD', taxRate = 0, discount = 0 }) {
  return sequelize.transaction(async (t) => {
    const invoiceNumber = `INV-${uuidv4().slice(0, 8).toUpperCase()}`;

    // Compute totals
    let subtotal = 0;
    const saleItems = [];
    for (const item of items) {
      const product = await db.Product.findByPk(item.productId, { transaction: t, lock: t.LOCK.UPDATE });
      if (!product) throw new Error(`Product ${item.productId} not found`);
      if (product.quantity < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);

      const unitPrice = Number(item.unitPrice ?? product.unitPrice);
      const lineTotal = unitPrice * Number(item.quantity);
      subtotal += lineTotal;

      saleItems.push({ productId: product.id, quantity: item.quantity, unitPrice, lineTotal });

      // Decrement stock
      await product.update({ quantity: product.quantity - item.quantity }, { transaction: t });
    }

    const tax = (subtotal * Number(taxRate)) / 100;
    const total = subtotal + tax - Number(discount || 0);

    const sale = await db.Sale.create({
      customerId: customerId || null,
      currency,
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      discount: Number(discount || 0).toFixed(2),
      total: total.toFixed(2),
      profit: 0, // Placeholder; can be computed with cost data
      invoiceNumber,
    }, { transaction: t });

    for (const si of saleItems) {
      await db.SaleItem.create({ ...si, saleId: sale.id }, { transaction: t });
    }

    return sale;
  });
}

export async function listSales({ customerId, productId, fromDate, toDate }) {
  const where = {};
  if (customerId) where.customerId = customerId;
  if (fromDate || toDate) where.createdAt = {};
  if (fromDate) where.createdAt[Op.gte] = new Date(fromDate);
  if (toDate) where.createdAt[Op.lte] = new Date(toDate);

  return db.Sale.findAll({
    where,
    order: [['id', 'DESC']],
    include: [{ model: db.SaleItem, include: [db.Product] }, db.Customer],
  });
}

export async function getSale(id) {
  return db.Sale.findByPk(id, { include: [{ model: db.SaleItem, include: [db.Product] }, db.Customer] });
}

