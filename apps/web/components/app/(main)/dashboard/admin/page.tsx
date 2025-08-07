"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Trash2, Crown } from "lucide-react";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [adminUsers, setAdminUsers] = useState([
    {
      id: 1,
      email: "mikolaj@storage.com",
      name: "Mikolaj",
      grantedOn: "15.07.2025",
      grantedBy: "System",
    },
    {
      id: 2,
      email: "admin@storage.com",
      name: "Admin User",
      grantedOn: "10.07.2025",
      grantedBy: "mikolaj@storage.com",
    },
  ]);

  const handleGrantAdmin = () => {
    if (email) {
      const newAdmin = {
        id: adminUsers.length + 1,
        email: email,
        name: email.split("@")[0],
        grantedOn: new Date().toLocaleDateString("en-GB"),
        grantedBy: "mikolaj@storage.com",
      };
      setAdminUsers([...adminUsers, newAdmin]);
      setEmail("");
    }
  };

  const handleRevokeAdmin = (id: number) => {
    setAdminUsers(adminUsers.filter((user) => user.id !== id));
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
              {adminUsers.length} Admin{adminUsers.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          <div className="space-y-3">
            {adminUsers.map((user) => (
              <Card key={user.id} className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between sm:flex-row sm:gap-0 flex-col gap-8">
                    <div className="flex items-center gap-4 sm:flex-row flex-col">
                      <div className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center">
                        <Crown className="w-10 h-10 text-brand" />
                      </div>
                      <div>
                        <div className="flex items-center gap-4 sm:flex-row flex-col">
                          <h5 className="span font-medium text-primary-foreground">
                            {user.email}
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
                        onClick={() => handleRevokeAdmin(user.id)}
                        className="text-destructive border-destructive bg-destructive/10 hover:bg-destructive/20 hover:text-destructive-foreground transition-colors duration-200 shadow-sm rounded-md px-3 py-1"
                        disabled={user.email === "mikolaj@storage.com"}
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
