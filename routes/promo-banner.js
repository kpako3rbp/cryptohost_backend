import express from 'express';
import { PromoBannerController } from '../controllers/index.js';
import { authAdmin } from '../middleware/auth.js';
import handleValidationErrors from '../middleware/handle-validation-errors.js';
import { promoBannerValidation } from '../validation/index.js';

const router = express.Router();

// Public routes
router.get('/public', PromoBannerController.getAll);
router.get('/public/:id', PromoBannerController.getOne);
router.get('/main', PromoBannerController.getMain);

// Admin routes
router.get('/', authAdmin, PromoBannerController.getAll);
router.get('/:id', authAdmin, PromoBannerController.getOne);
router.get('/main', authAdmin, PromoBannerController.getMain);
router.put('/set-main/:id', authAdmin, PromoBannerController.setMain);
router.post(
  '/create',
  authAdmin,
  promoBannerValidation.create,
  handleValidationErrors,
  PromoBannerController.create
);
router.put(
  '/update/:id',
  authAdmin,
  promoBannerValidation.create,
  handleValidationErrors,
  PromoBannerController.update
);
router.put('/remove/:id', authAdmin, PromoBannerController.softRemove);
router.post('/remove-hard/:id', authAdmin, PromoBannerController.hardRemove);

export default router;
