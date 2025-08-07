"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  isAdmin: boolean;
  username: string;
  email: string;
  photo: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  loadingLogOut: boolean;
  handleSignOut: () => void;
  checkAuth: () => void;
}

export const authContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loadingLogOut: false,
  handleSignOut: async () => {},
  checkAuth: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingLogOut, setLoadingLogOut] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const handleSignOut = async () => {
    setLoadingLogOut(true);

    router.push("/login");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (error) {
      console.log("Sign out error:", error);
    } finally {
      setTimeout(() => {
        setLoadingLogOut(false);
      }, 5000);
    }
  };

  const checkAuth = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = (await response.json()) as User;
        setUser(data);
        setLoading(false);
      }
    } catch (error) {
      //stay on login page
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <authContext.Provider
      value={{ user, loading, loadingLogOut, handleSignOut, checkAuth }}
    >
      {children}
    </authContext.Provider>
  );
}
