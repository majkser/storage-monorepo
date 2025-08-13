import { NextFunction, Request, Response } from 'express';
import { User } from '../models/userModel';

export default function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { isAdmin } = req.user as User;
  if (isAdmin) {
    return next();
  }
  res.status(403).json({ error: 'Forbidden' });
}
