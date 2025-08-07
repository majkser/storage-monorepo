"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authContext } from "@/context/authContext";
import { useContext } from "react";

export function SidebarFooter() {
  const { handleSignOut } = useContext(authContext);

  return (
    <div className="p-4 border-t border-white/10">
      <Button
        onClick={handleSignOut}
        variant="ghost"
        className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
      >
        <LogOut className="mr-2 h-5 w-5" />
        <span>Sign Out</span>
      </Button>
    </div>
  );
}
