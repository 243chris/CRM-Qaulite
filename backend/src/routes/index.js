import { Router } from 'express';
import * as categories from '../controllers/categories.controller.js';
import * as products from '../controllers/products.controller.js';
import * as customers from '../controllers/customers.controller.js';
import * as sales from '../controllers/sales.controller.js';

export const router = Router();

router.get('/', (req, res) => res.json({ message: 'API v1' }));

// Categories
router.post('/categories', categories.create);
router.get('/categories', categories.list);
router.put('/categories/:id', categories.update);
router.delete('/categories/:id', categories.remove);

// Products
router.post('/products', products.create);
router.get('/products', products.list);
router.get('/products/:id', products.get);
router.put('/products/:id', products.update);
router.delete('/products/:id', products.remove);

// Customers
router.post('/customers', customers.create);
router.get('/customers', customers.list);
router.get('/customers/:id', customers.get);
router.put('/customers/:id', customers.update);
router.delete('/customers/:id', customers.remove);
router.get('/customers/:id/history', customers.history);

// Sales
router.post('/sales', sales.create);
router.get('/sales', sales.list);
router.get('/sales/:id', sales.get);

