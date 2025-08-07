"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebarContext } from "@/components/sidebar/sidebar-context";

export function MobileMenu() {
  const { toggleSidebar } = useSidebarContext();

  return (
    <Button
      variant="ghost"
      size="lg"
      className="md:hidden aspect-square group"
      onClick={toggleSidebar}
    >
      <Menu className="scale-150 text-primary-foreground group-hover:text-black" />
      <span className="sr-only">Open menu</span>
    </Button>
  );
}
