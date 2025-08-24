import dbConnection from '../config/db-connection';

export interface FileAccess {
  fileId: string;
  userId: string;
}

export async function createFileAccess(FileAccess: FileAccess): Promise<void> {
  const connection = await dbConnection.getConnection();

  try {
    connection.execute(
      'INSERT INTO fileAccess (fileId, userId) VALUES (?, ?)',
      [FileAccess.fileId, FileAccess.userId]
    );
  } catch (error) {
    console.error('Error creating file access:', error);
    throw error;
  }
}

export async function getFileAccessByUserEmail(
  email: string
): Promise<FileAccess[]> {
  const connection = await dbConnection.getConnection();

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM fileAccess WHERE userId = (SELECT id FROM users WHERE email = ?)',
      [email]
    );
    return rows as FileAccess[];
  } catch (error) {
    console.error('Error retrieving file access:', error);
    throw error;
  }
}
