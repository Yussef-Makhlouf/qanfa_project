"use client"

import Link from "next/link"
import { Bell, Heart, LogOut } from "lucide-react"
import { PlatformLogo } from "./ui/platform-logo"
import { useAuth } from "@/contexts/auth-context"
import { UserMenu } from "./user-menu"

export default function LoggedInHeader() {
  const { logout } = useAuth()

  return (
    <header className="absolute w-[1800px] h-[50px] left-[60px] top-[50px] flex flex-row justify-between items-start p-0 gap-[559px]">
      {/* Logo/User Icon */}
      <div className="flex flex-col justify-center items-center p-[10px] gap-[8px] w-[48px] h-[48px] bg-[#F8F8F8] backdrop-blur-[40px] rounded-[18px]">
        <div className="relative w-[18px] h-[18px]">
          <div className="absolute left-[12.5%] right-[12.5%] top-[8.33%] bottom-[8.33%]">
            <div className="absolute left-[30%] right-[28.34%] top-[8.33%] bottom-[50%] border-[1.5px] border-black"></div>
            <div className="absolute left-[12.5%] right-[12.5%] top-[62.5%] bottom-[8.33%] border-[1.5px] border-black"></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-row justify-center items-center p-0 gap-[30px] w-[336px] h-[50px]">
        {/* Navigation Links */}
        <div className="flex flex-row justify-center items-center p-0 gap-[20px] w-[236px] h-[44px]">
          {/* Projects Link */}
          <div className="flex flex-col justify-center items-center px-[24px] py-[10px] gap-[8px] w-[93px] h-[44px] bg-[#F8F8F8] backdrop-blur-[40px] rounded-[18px]">
            <span className="w-[45px] h-[24px] font-['The_Year_of_Handicrafts'] font-normal text-[14px] leading-[24px] text-right text-black">
              المشاريع
            </span>
          </div>

          {/* Divider */}
          <div className="w-[4px] h-[4px] bg-black rounded-[40px]"></div>

          {/* Home Link */}
          <div className="flex flex-col justify-center items-center px-[24px] py-[10px] gap-[8px] w-[99px] h-[44px] bg-[#FF735D] backdrop-blur-[40px] rounded-[18px]">
            <span className="w-[51px] h-[24px] font-['The_Year_of_Handicrafts'] font-normal text-[14px] leading-[24px] text-right text-[#FAFAFA]">
              الرئيسية
            </span>
          </div>
        </div>

        {/* Decorative Layer */}
        <div className="relative w-[70px] h-[54.13px]">
          {/* Group 1 */}
          <div className="absolute left-[79.17%] right-[0%] top-[83.71%] bottom-[-4.13%]">
            <div className="absolute left-[79.17%] right-[19.35%] top-[85.96%] bottom-[-1.81%] bg-[#375A64]"></div>
            <div className="absolute left-[80.32%] right-[14.57%] top-[99.02%] bottom-[-4.13%] bg-[#375A64]"></div>
            <div className="absolute left-[84.89%] right-[13.64%] top-[86.63%] bottom-[-2.69%] bg-[#375A64]"></div>
            <div className="absolute left-[86.22%] right-[12.59%] top-[89.13%] bottom-[-2.69%] bg-[#375A64]"></div>
            <div className="absolute left-[87.27%] right-[11.33%] top-[83.71%] bottom-[-2.69%] bg-[#375A64]"></div>
            <div className="absolute left-[89.65%] right-[8.87%] top-[85.96%] bottom-[-1.81%] bg-[#375A64]"></div>
            <div className="absolute left-[90.81%] right-[5.53%] top-[99.02%] bottom-[-3.84%] bg-[#375A64]"></div>
            <div className="absolute left-[94.2%] right-[2.65%] top-[92.64%] bottom-[-2.71%] bg-[#375A64]"></div>
            <div className="absolute left-[97.21%] right-[1.6%] top-[89.13%] bottom-[-2.69%] bg-[#375A64]"></div>
            <div className="absolute left-[98.26%] right-[0%] top-[92.38%] bottom-[-2.69%] bg-[#375A64]"></div>
          </div>

          {/* Group 2 */}
          <div className="absolute left-[82.27%] right-[3.09%] top-[-4.13%] bottom-[31.41%]">
            <div className="absolute left-[82.27%] right-[3.09%] top-[45.06%] bottom-[31.41%] bg-[#FF735D]"></div>
            <div className="absolute left-[90.34%] right-[4.43%] top-[4.41%] bottom-[46.6%] bg-[#FF735D]"></div>
            <div className="absolute left-[94.16%] right-[5.11%] top-[-4.13%] bottom-[99.11%] bg-[#FF735D]"></div>
            <div className="absolute left-[92.88%] right-[6.39%] top-[-4.13%] bottom-[99.11%] bg-[#FF735D]"></div>
          </div>
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-5">
        <UserMenu />
        <Link href="/favorites" className="flex items-center justify-center w-10 h-10 bg-[#F8F8F8] rounded-full">
          <Heart className="w-5 h-5 text-[#375A64]" />
        </Link>
        <div className="flex items-center justify-center w-10 h-10 bg-[#F8F8F8] rounded-full">
          <Bell className="w-5 h-5 text-[#375A64]" />
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-[#375A64] hover:bg-[#F8F8F8] px-3 py-2 rounded-[18px]"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">تسجيل الخروج</span>
        </button>
      </div>
    </header>
  )
} 