import { useState, useEffect } from 'react';

export default function useAdminUsersAPI() {
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

  return {
    email,
    setEmail,
    adminEmails,
    handleGrantAdmin,
    handleRevokeAdmin,
  };
}
