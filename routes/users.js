import express from 'express';
import { UserController } from '../controllers/index.js';
import { authUser } from '../middleware/auth.js';

import { loginValidation, registerValidation } from '../validation/index.js';
import handleValidationErrors from '../middleware/handle-validation-errors.js';

const router = express.Router();

router.post(
  '/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
);
router.post(
  '/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
);
router.get('/current', authUser, UserController.current);

export default router;
