"use client";

//import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const handleGoogleLogin = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/google`;
  };

  return (
    <div className="w-full max-w-md m-auto p-6">
      <Card className="p-6 bg-black border-none shadow-xl rounded-xl">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-brand">Welcome Back</h2>
            <p className="text-gray-400 mt-2">
              Sign in to continue to your account
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full bg-transparent border border-gray-700 hover:bg-gray-900 text-white flex items-center justify-center gap-2 h-12 rounded-lg"
            onClick={handleGoogleLogin}
            // disabled={isLoading}
          >
            <FcGoogle className="h-5 w-5" />
            <p className="p text-white">Continue with Google</p>
          </Button>
        </div>
      </Card>
    </div>
  );
}
