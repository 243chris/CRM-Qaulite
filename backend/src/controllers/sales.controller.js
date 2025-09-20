import * as svc from '../services/sale.service.js';

export async function create(req, res) {
  try {
    const sale = await svc.createSale(req.body);
    res.status(201).json(sale);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function list(req, res) {
  const items = await svc.listSales({
    customerId: req.query.customerId,
    productId: req.query.productId,
    fromDate: req.query.fromDate,
    toDate: req.query.toDate,
  });
  res.json(items);
}

export async function get(req, res) {
  const sale = await svc.getSale(req.params.id);
  if (!sale) return res.status(404).json({ error: 'Not found' });
  res.json(sale);
}

