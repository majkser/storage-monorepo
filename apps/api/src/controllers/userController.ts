import { getUserByEmail } from '../models/userModel';
import { updateAdminPrivileges } from '../models/userModel';
import { getAdmins } from '../models/userModel';
import { Request, Response } from 'express';

export async function changeUserAdminStatus(req: Request, res: Response) {
  const email: string = req.body.email;
  const changeAdminStatusTo: boolean = req.body.changeAdminStatusTo;

  if (email === 'mikser.kowalski@gmail.com') {
    return res
      .status(403)
      .json({ message: 'Admin status cannot be changed for this user.' });
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await updateAdminPrivileges(user.id, changeAdminStatusTo);
    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error changing admin status', error: error.message });
  }
}

export async function getAdminsEmails(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const admins = await getAdmins();
    const adminEmails = admins.map((admin) => admin.email);
    res.status(200).json(adminEmails);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving admin emails', error: error.message });
  }
}
