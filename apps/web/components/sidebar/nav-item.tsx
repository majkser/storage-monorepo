// components/sidebar/nav-item.tsx
"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebarContext } from "@/components/sidebar/sidebar-context"

interface NavItemProps {
  icon: React.ElementType
  label: string
  href: string
}

export function NavItem({ icon: Icon, label, href }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  const { closeSidebar } = useSidebarContext()

  const handleClick = () => {
    // Close sidebar only on mobile devices
    if (window.innerWidth < 768) {
      closeSidebar()
    }
  }

  return (
    <Link 
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
        isActive 
          ? "bg-brand text-white"
          : "text-white/70 hover:text-white hover:bg-white/10",
      )}
      onClick={handleClick}
    >
      <Icon className="h-5 w-5" />
      <span >{label}</span>
    </Link>
  )
}