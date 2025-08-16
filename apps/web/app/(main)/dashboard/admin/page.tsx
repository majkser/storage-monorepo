'use client';

import CurrentAdmins from '@/components/dashboard/admin/currentAdmins';
import GrantAdminForm from '@/components/dashboard/admin/grantAdminForm';
import useAdminUsersAPI from '@/hooks/useAdminUsersAPI';

export default function AdminPage() {
  const { email, setEmail, adminEmails, handleGrantAdmin, handleRevokeAdmin } =
    useAdminUsersAPI();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      {/* Content */}
      <main className="p-6 text-primary-foreground min-w-[300px]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Management</h1>
          <p className="text-muted-foreground">
            Grant and manage admin privileges for users
          </p>
        </div>

        {/* Grant Admin Form */}
        <GrantAdminForm
          handleGrantAdmin={handleGrantAdmin}
          email={email}
          setEmail={setEmail}
          isValidEmail={isValidEmail}
        />

        {/* Current Admins */}
        <CurrentAdmins
          adminEmails={adminEmails}
          handleRevokeAdmin={handleRevokeAdmin}
        />
      </main>
    </>
  );
}
