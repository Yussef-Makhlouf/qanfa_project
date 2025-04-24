"use client"

import Link from "next/link"
import { Bell, Heart, User, LogOut } from "lucide-react"
import { PlatformLogo } from "./ui/platform-logo"
import { useAuth } from "@/contexts/auth-context"

export default function LoggedInHeader() {
  const { logout } = useAuth()

  return (
    <header 
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "0px",
        gap: "559px",
        position: "absolute",
        width: "1800px",
        height: "50px",
        left: "60px",
        top: "50px",
        zIndex: 50
      }}
    >
      {/* Left section - User actions */}
      <div className="flex items-center gap-5 h-full">
        <Link href="/" className="flex items-center justify-center w-10 h-10 bg-[#F8F8F8] rounded-full">
          <User className="w-5 h-5 text-[#375A64]" />
        </Link>
        
        <Link href="/favorites" className="flex items-center justify-center w-10 h-10 bg-[#F8F8F8] rounded-full relative">
          <Heart className="w-5 h-5 text-[#375A64]" />
        </Link>
        
        <div className="flex items-center justify-center w-10 h-10 bg-[#F8F8F8] rounded-full relative">
          <Bell className="w-5 h-5 text-[#375A64]" />
        </div>
        
        <button
          onClick={logout}
          className="flex items-center gap-2 text-[#375A64] hover:bg-[#F8F8F8] px-3 py-2 rounded-md"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">تسجيل الخروج</span>
        </button>
      </div>
      
      {/* Right section - Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <PlatformLogo className="h-12 w-12" />
        </Link>
      </div>
    </header>
  )
} 