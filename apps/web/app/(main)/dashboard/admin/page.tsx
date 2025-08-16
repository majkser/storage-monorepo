'use client';

import { useEffect, useState } from 'react';
import CurrentAdmins from '@/components/dashboard/admin/currentAdmins';
import GrantAdminForm from '@/components/dashboard/admin/grantAdminForm';

export default function AdminPage() {
  const [email, setEmail] = useState('');
  const [adminEmails, setAdminEmails] = useState([]);

  useEffect(() => {
    getAdmins();
  }, [adminEmails]);

  async function getAdmins() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/admin-emails`,
        {
          credentials: 'include',
        }
      );
      const data = await response.json();
      setAdminEmails(data);
    } catch (error) {
      console.error('Error occurred while fetching admin emails:', error);
    }
  }

  async function handleGrantAdmin() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/change-admin-status`,
        {
          method: 'PATCH',
          body: JSON.stringify({ email: email, changeAdminStatusTo: true }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (res.ok) {
        setEmail('');
        getAdmins();
      } else {
        console.error('Failed to grant admin privileges');
      }
    } catch (error) {
      console.error('Error occurred while granting admin privileges:', error);
    }
  }

  const handleRevokeAdmin = async (email: string) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/change-admin-status`,
        {
          method: 'PATCH',
          body: JSON.stringify({ email: email, changeAdminStatusTo: false }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
    } catch (error) {
      console.error('Error occurred while revoking admin privileges:', error);
    }
  };

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
