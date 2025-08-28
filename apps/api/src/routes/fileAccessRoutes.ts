import { Router } from 'express';
import {
  createFileAccessController,
  getFileAccessByUserEmailController,
  deleteFileAccessController,
} from '../controllers/fileAccessController';
import isAuthenticated from '../middlewares/isAuthenticated.middleware';
import isAdmin from '../middlewares/isAdmin.middleware';
import validateRequest from '../middlewares/requestValidator.middleware';
import userExistenceValidator from '../middlewares/userExistanceValidator.middleware';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/give-access',
  isAuthenticated,
  isAdmin,
  body('fileIds').isArray().withMessage('fileIds array is required'),
  body('email').notEmpty().isString().withMessage('email is required'),
  validateRequest,
  userExistenceValidator,
  createFileAccessController
);

router.get(
  '/get-access/:email',
  isAuthenticated,
  isAdmin,
  validateRequest,
  getFileAccessByUserEmailController
);

router.delete(
  '/delete-access',
  isAuthenticated,
  isAdmin,
  body('fileId').notEmpty().isString().withMessage('fileId is required'),
  body('email').notEmpty().isString().withMessage('email is required'),
  validateRequest,
  userExistenceValidator,
  deleteFileAccessController
);

export default router;
