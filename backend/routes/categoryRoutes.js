import express from 'express';
const router = express.Router();

import { getCategories } from '../controllers/categoriesController.js';

router.route('/').get(getCategories);

export default router;
