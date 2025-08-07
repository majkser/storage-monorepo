"use client";

import { useEffect } from "react";
import { SidebarLogo } from "@/components/sidebar/sidebar-logo";
import { SidebarNav } from "@/components/sidebar/sidebar-nav";
import { SidebarFooter } from "@/components/sidebar/sidebar-footer";
import { useSidebarContext } from "@/components/sidebar/sidebar-context";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserData from "@/components/userData";

export function Sidebar() {
  const { isOpen, closeSidebar } = useSidebarContext();

  // Close sidebar when window is resized to larger size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeSidebar]);

  // Prevent page scrolling when sidebar is open on mobile devices
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen w-64 bg-black flex-col fixed left-0 top-0 z-30">
        <SidebarLogo />
        <UserData />
        <SidebarNav />
        <SidebarFooter />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 w-64 bg-black flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <SidebarLogo />
          <Button
            variant="ghost"
            size="icon"
            onClick={closeSidebar}
            className="text-white mr-2"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <SidebarNav />
        <SidebarFooter />
      </div>
    </>
  );
}
