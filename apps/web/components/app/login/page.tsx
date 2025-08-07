"use client";

import LoginSidebar from "@/components/login/loginSidebar";
import Login from "@/components/login/login";
import MobileLoginSidebar from "@/components/login/mobileLoginSidebar";
import { useContext } from "react";
import { authContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const { user, loading } = useContext(authContext);

  useEffect(() => {
    if (user && !loading) {
      router.push("/dashboard");
    }
  }, [user, router, loading]);

  return (
    <div className="bg-black w-full h-screen text-white text-center sm:grid sm:grid-cols-8 overflow-hidden">
      <div className="col-span-3 hidden sm:flex items-center justify-center">
        <LoginSidebar />
      </div>
      <MobileLoginSidebar />
      <div className="col-span-5 flex items-center justify-center">
        <Login />
      </div>
    </div>
  );
}
