import { Router } from 'express';
import { createFileAccessController } from '../controllers/fileAccessController';
import isAuthenticated from '../middlewares/isAuthenticated.middleware';
import isAdmin from '../middlewares/isAdmin.middleware';
import validateRequest from '../middlewares/requestValidator.middleware';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/give-access',
  isAuthenticated,
  isAdmin,
  body('fileIds').isArray().withMessage('fileIds array is required'),
  body('email').notEmpty().isString().withMessage('email is required'),
  validateRequest,
  createFileAccessController
);

export default router;
