import express from 'express';
import { NewsPostsController } from '../controllers/index.js';
import { authAdmin } from '../middleware/auth.js';
import handleValidationErrors from '../middleware/handle-validation-errors.js';

import { newsPostValidation } from '../validation/index.js';

const router = express.Router();

// Public routes
router.get('/public', NewsPostsController.getAll);
router.get('/public/:slug', NewsPostsController.getOne);
router.get('/paths/public', NewsPostsController.getPaths);

// Admin routes
router.get('/', authAdmin, NewsPostsController.getAll);
router.get('/:id', authAdmin, NewsPostsController.getOne);
router.post(
  '/create',
  authAdmin,
  newsPostValidation.create,
  handleValidationErrors,
  NewsPostsController.create
);
router.put(
  '/update/:id',
  authAdmin,
  newsPostValidation.create,
  handleValidationErrors,
  NewsPostsController.update
);
router.put('/remove/:id', authAdmin, NewsPostsController.softRemove);
router.post('/remove-hard/:id', authAdmin, NewsPostsController.hardRemove);

export default router;
