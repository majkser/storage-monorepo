'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Trash2, Crown } from 'lucide-react';

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
        <Card className="mb-8 bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-brand" />
              <span className="span text-primary-foreground">
                Grant Admin Privileges
              </span>
            </CardTitle>
            <CardDescription>
              Enter a users email address to grant them admin privileges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="email" className="sr-only">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter user email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-900 border-chart-2 text-primary-foreground"
                />
              </div>
              <Button
                onClick={handleGrantAdmin}
                className="bg-brand hover:bg-brand/90 text-black font-medium px-6"
                disabled={!email}
              >
                Grant Admin
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Admins */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Current Administrators</h2>
            <Badge
              variant="secondary"
              className="bg-brand/20 text-brand border-brand/30"
            >
              {adminEmails.length} Admin{adminEmails.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          <div className="space-y-3">
            {adminEmails.map((email) => (
              <Card key={email} className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between sm:flex-row sm:gap-0 flex-col gap-8">
                    <div className="flex items-center gap-4 sm:flex-row flex-col">
                      <div className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center">
                        <Crown className="w-10 h-10 text-brand" />
                      </div>
                      <div>
                        <div className="flex items-center gap-4 sm:flex-row flex-col">
                          <h5 className="span font-medium text-primary-foreground">
                            {email}
                          </h5>
                          <Badge
                            variant="outline"
                            className="text-xs border-brand/30 text-brand"
                          >
                            Admin
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevokeAdmin(email)}
                        className="text-destructive border-destructive bg-destructive/10 hover:bg-destructive/20 hover:text-destructive-foreground transition-colors duration-200 shadow-sm rounded-md px-3 py-1"
                        disabled={email === 'mikser.kowalski@gmail.com'}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Revoke
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
