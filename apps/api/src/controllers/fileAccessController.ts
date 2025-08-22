import { createFileAccess } from '../models/fileAccessModel';
import { Request, Response } from 'express';
import { getUserByEmail } from '../models/userModel';

export async function createFileAccessController(
  req: Request,
  res: Response
): Promise<void> {
  const { fileIds, email } = req.body;

  if (!fileIds || !email) {
    res.status(400).json({ error: 'fileId and email are required' });
    return;
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    fileIds.map(
      async (fileId: string) =>
        await createFileAccess({ fileId: fileId, userId: user.id })
    );

    res.status(201).json({ message: 'File access created successfully' });
  } catch (error) {
    console.error('Error creating file access:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
