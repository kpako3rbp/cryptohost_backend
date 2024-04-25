import express from 'express';
import {
  NewsCategoryController, NewsPostsController,
} from '../controllers/index.js';
import { authAdmin } from '../middleware/auth.js';
import handleValidationErrors from '../middleware/handle-validation-errors.js';
import { newsCategoryValidation } from '../validation/index.js';

const router = express.Router();

// Public routes
router.get('/public', NewsCategoryController.getAll);

// Admin routes
router.get('/', authAdmin, NewsCategoryController.getAll);
router.get('/:id', authAdmin, NewsCategoryController.getOne);
router.post(
  '/create',
  authAdmin,
  newsCategoryValidation,
  handleValidationErrors,
  NewsCategoryController.create
);
router.put(
  '/update/:id',
  authAdmin,
  newsCategoryValidation,
  handleValidationErrors,
  NewsCategoryController.update
);
router.put('/remove/:id', authAdmin, NewsCategoryController.softRemove);
router.post('/remove-hard/:id', authAdmin, NewsCategoryController.hardRemove);

export default router;
