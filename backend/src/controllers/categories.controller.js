import * as svc from '../services/category.service.js';

export async function create(req, res) {
  const item = await svc.createCategory(req.body);
  res.status(201).json(item);
}

export async function list(req, res) {
  const items = await svc.listCategories();
  res.json(items);
}

export async function update(req, res) {
  const item = await svc.updateCategory(req.params.id, req.body);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
}

export async function remove(req, res) {
  const deleted = await svc.deleteCategory(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json({ deleted: true });
}

