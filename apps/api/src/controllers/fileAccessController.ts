import { createFileAccess } from '../models/fileAccessModel';
import { Request, Response } from 'express';
import { getUserByEmail } from '../models/userModel';

export async function createFileAccessController(
  req: Request,
  res: Response
): Promise<void> {
  const { fileId, email } = req.body;

  if (!fileId || !email) {
    res.status(400).json({ error: 'fileId and email are required' });
    return;
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    await createFileAccess({ fileId, userId: user.id });
    res.status(201).json({ message: 'File access created successfully' });
  } catch (error) {
    console.error('Error creating file access:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
