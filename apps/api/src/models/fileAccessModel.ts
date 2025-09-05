import dbConnection from '../config/db-connection';

export interface FileAccess {
  fileId: string;
  email: string;
}

export async function createFileAccess(FileAccess: FileAccess): Promise<void> {
  const connection = await dbConnection.getConnection();

  try {
    await connection.execute(
      'INSERT INTO fileAccess (fileId, userId) VALUES (?, (SELECT id FROM users WHERE email = ?))',
      [FileAccess.fileId, FileAccess.email]
    );
  } catch (error) {
    console.error('Error creating file access:', error);
    throw error;
  } finally {
    connection.release();
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
  } finally {
    connection.release();
  }
}

export async function deleteFileAccess(FileAccess: FileAccess): Promise<void> {
  const connection = await dbConnection.getConnection();

  try {
    await connection.execute(
      'DELETE FROM fileAccess WHERE userId = (SELECT id FROM users WHERE email = ?) AND fileId = ?',
      [FileAccess.email, FileAccess.fileId]
    );
  } catch (error) {
    console.error('Error deleting file access:', error);
    throw error;
  } finally {
    connection.release();
  }
}
