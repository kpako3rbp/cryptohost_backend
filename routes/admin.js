import express from 'express';
import { AdminController } from '../controllers/index.js';
import { authAdmin } from '../middleware/auth.js';

import { loginValidation, registerValidation } from '../validation/index.js';
import handleValidationErrors from '../middleware/handle-validation-errors.js';

const router = express.Router();

router.post(
  '/register',
  registerValidation,
  handleValidationErrors,
  AdminController.register
);
router.post(
  '/login',
  loginValidation,
  handleValidationErrors,
  AdminController.login
);
router.get('/current', authAdmin, AdminController.current);

export default router;
