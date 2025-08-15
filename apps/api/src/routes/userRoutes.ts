import express from 'express';
import { Request, Response } from 'express';
import {
  changeUserAdminStatus,
  getAdminsEmails,
} from '../controllers/userController';
import { User } from '../models/userModel';
import isAdmin from '../middlewares/isAdmin.middleware';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    const { id, username, email, photo, isAdmin } = req.user as User;
    res.json({
      id,
      username,
      email,
      photo,
      isAdmin: Boolean(isAdmin),
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

router.get('/validate-session', (req: Request, res: Response) => {
  if (req.user) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

router.patch('/change-admin-status', isAdmin, changeUserAdminStatus);

router.get('/admin-emails', isAdmin, getAdminsEmails);

export default router;
