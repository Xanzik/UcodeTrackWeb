import categoryService from '../service/categoryService.js';

class categoryController {
    createCategory = async (req, res, next) => {
        try {
            const { title } = req.body;
            const category = await categoryService.createCategory(title);
            return res.json(category);
        } catch (e) {
            next(e);
        }
    }

    getCategories = async (req, res, next) => {
        try {
            const categories = await categoryService.getCategories();
            return res.json(categories);
        } catch (e) {
            next(e);
        }
    }

    getCategoryByID = async (req, res, next) => {
        try {
            const id = req.params.category_id;
            const category = await categoryService.getCategoryByID(id);
            return res.json(category);
        } catch (e) {
            next(e);
        }
    }

    getPostsByCategory = async (req, res, next) => {
        try {
            const id = req.params.category_id;
            const posts = await categoryService.getPostsByCategory(id);
            return res.json(posts);
        } catch (e) {
            next(e);
        }
    }

    updateCategory = async (req, res, next) => {
        try {
            const id = req.params.category_id;
            const newData = req.body;
            const category = await categoryService.updateCategory(id, newData);
            return res.json(category);
        } catch (e) {
            next(e);
        }
    }

    deleteCategory = async (req, res, next) => {
        try {
            const id = req.params.category_id;
            const category = await categoryService.deleteCategory(id);
            return res.json(category);
        } catch (e) {
            next(e);
        }
    }
}

export default new categoryController();