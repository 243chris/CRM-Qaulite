import * as svc from '../services/product.service.js';

export async function create(req, res) {
  try {
    const product = await svc.createProduct(req.body);
    res.status(201).json(product);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function list(req, res) {
  const products = await svc.listProducts({ search: req.query.search, categoryId: req.query.categoryId });
  res.json(products);
}

export async function get(req, res) {
  const p = await svc.getProduct(req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
}

export async function update(req, res) {
  const p = await svc.updateProduct(req.params.id, req.body);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
}

export async function remove(req, res) {
  const deleted = await svc.deleteProduct(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json({ deleted: true });
}

