import { db } from '../models/index.js';

export async function createCategory(input) {
  return db.Category.create(input);
}

export async function listCategories() {
  return db.Category.findAll({ order: [['name', 'ASC']] });
}

export async function updateCategory(id, update) {
  const cat = await db.Category.findByPk(id);
  if (!cat) return null;
  await cat.update(update);
  return cat;
}

export async function deleteCategory(id) {
  const cat = await db.Category.findByPk(id);
  if (!cat) return 0;
  await cat.destroy();
  return 1;
}

