import express from 'express';
import { CryptoActivitiesController } from '../controllers/index.js';
import { authAdmin } from '../middleware/auth.js';
import handleValidationErrors from '../middleware/handle-validation-errors.js';

import { cryptoActivitiesValidation } from '../validation/index.js';

const router = express.Router();

// Public routes
router.get('/public', CryptoActivitiesController.getAll);
router.get('/public/:id', CryptoActivitiesController.getOne);

// Admin routes
router.get('/', authAdmin, CryptoActivitiesController.getAll);
router.get('/:id', authAdmin, CryptoActivitiesController.getOne);
router.post(
  '/create',
  authAdmin,
  cryptoActivitiesValidation.create,
  handleValidationErrors,
  CryptoActivitiesController.create
);
router.put(
  '/update/:id',
  authAdmin,
  cryptoActivitiesValidation.create,
  handleValidationErrors,
  CryptoActivitiesController.update
);
router.put('/remove/:id', authAdmin, CryptoActivitiesController.softRemove);
router.post('/remove-hard/:id', authAdmin, CryptoActivitiesController.hardRemove);

export default router;
