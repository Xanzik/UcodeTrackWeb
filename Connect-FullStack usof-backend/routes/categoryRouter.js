import express from 'express';
const router = express.Router();
import categoryController from '../controllers/categoryController.js';

router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getCategories);
router.get('/categories/:category_id', categoryController.getCategoryByID);
router.get('/categories/:category_id/posts', categoryController.getPostsByCategory);
router.patch('/categories/:category_id', categoryController.updateCategory);
router.delete('/categories/:category_id', categoryController.deleteCategory);

export default router;