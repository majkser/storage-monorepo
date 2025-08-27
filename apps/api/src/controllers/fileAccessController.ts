import {
  createFileAccess,
  getFileAccessByUserEmail,
  deleteFileAccess,
} from '../models/fileAccessModel';
import { Request, Response } from 'express';

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
    fileIds.map(async (fileId: string) => {
      //add check if the file access already exists
      const existingAccess = await getFileAccessByUserEmail(email);
      if (!existingAccess.find((access) => access.fileId === fileId)) {
        await createFileAccess({ fileId: fileId, email: email });
      }
    });

    res.status(201).json({ message: 'File access created successfully' });
  } catch (error) {
    console.error('Error creating file access:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getFileAccessByUserEmailController(
  req: Request,
  res: Response
): Promise<void> {
  const email = req.body.email;

  try {
    const fileAccess = await getFileAccessByUserEmail(email);
    res.status(200).json(fileAccess);
  } catch (error) {
    console.error('Error retrieving file access:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteFileAccessController(
  req: Request,
  res: Response
): Promise<void> {
  const { fileId, email } = req.body;

  if (!fileId || !email) {
    res.status(400).json({ error: 'fileId and email are required' });
    return;
  }

  try {
    await deleteFileAccess({ fileId: fileId, email: email });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting file access:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
