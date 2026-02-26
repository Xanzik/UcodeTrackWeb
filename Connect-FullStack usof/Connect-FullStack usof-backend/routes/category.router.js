import express from 'express';
const router = express.Router();
import categoryController from '../controllers/category.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

router.post(
	'/categories',
	authMiddleware,
	roleMiddleware,
	categoryController.createCategory,
);
router.get('/categories', categoryController.getCategories);
router.get(
	'/categories/:category_id',
	authMiddleware,
	roleMiddleware,
	categoryController.getCategoryByID,
);
router.get(
	'/categories/:category_id/posts',
	authMiddleware,
	roleMiddleware,
	categoryController.getPostsByCategory,
);
router.patch(
	'/categories/:category_id',
	authMiddleware,
	roleMiddleware,
	categoryController.updateCategory,
);
router.delete(
	'/categories/:category_id',
	authMiddleware,
	roleMiddleware,
	categoryController.deleteCategory,
);

export default router;
