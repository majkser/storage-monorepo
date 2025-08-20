import { Router } from 'express';
import { createFileAccessController } from '../controllers/fileAccessController';
import isAuthenticated from '../middlewares/isAuthenticated.middleware';
import isAdmin from '../middlewares/isAdmin.middleware';
import fileExistanceValidator from '../middlewares/fileExistanceValidator.middleware';
import validateRequest from '../middlewares/requestValidator.middleware';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/give-access',
  isAuthenticated,
  isAdmin,
  body('fileId').notEmpty().isString().withMessage('fileId is required'),
  body('email').notEmpty().isString().withMessage('email is required'),
  fileExistanceValidator,
  validateRequest,
  createFileAccessController
);

export default router;
