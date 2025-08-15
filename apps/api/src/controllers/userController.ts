import { getUserByEmail } from '../models/userModel';
import { updateAdminPrivileges } from '../models/userModel';
import { getAdmins } from '../models/userModel';
import { Request, Response } from 'express';

export async function getUserIdByEmail(email: string): Promise<string | null> {
  const user = await getUserByEmail(email);
  return user ? user.id ?? null : null;
}

export async function changeUserAdminStatus(
  email: string,
  changeAdminStatusTo: boolean
): Promise<void> {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  await updateAdminPrivileges(user.id, changeAdminStatusTo);
}

export async function getAdminsEmails(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const admins = await getAdmins();
    res.status(200).json(admins.map((admin) => admin.email));
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving admin emails', error: error.message });
  }
}
