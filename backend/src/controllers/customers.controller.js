import * as svc from '../services/customer.service.js';

export async function create(req, res) {
  const c = await svc.createCustomer(req.body);
  res.status(201).json(c);
}

export async function list(req, res) {
  const items = await svc.listCustomers({ search: req.query.search });
  res.json(items);
}

export async function get(req, res) {
  const c = await svc.getCustomer(req.params.id);
  if (!c) return res.status(404).json({ error: 'Not found' });
  res.json(c);
}

export async function update(req, res) {
  const c = await svc.updateCustomer(req.params.id, req.body);
  if (!c) return res.status(404).json({ error: 'Not found' });
  res.json(c);
}

export async function remove(req, res) {
  const deleted = await svc.deleteCustomer(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json({ deleted: true });
}

export async function history(req, res) {
  const items = await svc.getCustomerHistory(req.params.id);
  res.json(items);
}

