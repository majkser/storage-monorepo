import { Request, Response, NextFunction } from 'express';
import { getUserByEmail } from '../models/userModel';

export default async function userExistenceValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const email = req.body.email;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    next();
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).json({ error: 'Error validating user existence' });
  }
}
