import { getUserByEmail } from '../models/userModel';
import { updateAdminPrivileges } from '../models/userModel';

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
