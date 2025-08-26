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

      <div className="p-6 pt-0 md:pt-6 w-full max-w-[1200px] mx-auto mb-4">
        <h1 className="text-white h2">Admin Management</h1>
        <p className="text-muted-foreground">
          Here you can manage admin privileges for users.
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
    </>
  );
}
