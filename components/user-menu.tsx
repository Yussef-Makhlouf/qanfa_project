"use client"

import * as React from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"

export function UserMenu() {
  const { logout } = useAuth()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex h-[48px] w-[48px] items-center justify-center rounded-[18px] bg-white p-[10px] outline-none hover:bg-gray-50">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="black" strokeWidth="1.5" />
            <circle cx="12" cy="7" r="4" stroke="black" strokeWidth="1.5" />
          </svg>
        </button>
      </DropdownMenu.Trigger>

      <AnimatePresence>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="start"
            sideOffset={10}
            className="z-50 min-w-[257px] rounded-[20px] bg-white p-4 shadow-lg"
            asChild
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-2">
                <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 outline-none hover:bg-gray-50">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="black" strokeWidth="1.5" />
                    <circle cx="12" cy="7" r="4" stroke="black" strokeWidth="1.5" />
                  </svg>
                  <span className="text-sm">الملف الشخصي</span>
                </DropdownMenu.Item>

                <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 outline-none hover:bg-gray-50">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M19 4h-4M15 4L8 4M8 4H4M8 4V2M8 20h7M8 20H4M8 20v2M4 9v6M20 9v6" stroke="black" strokeWidth="1.5" />
                  </svg>
                  <span className="text-sm">إدارة الطلبات</span>
                </DropdownMenu.Item>

                <DropdownMenu.Item className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 outline-none hover:bg-gray-50">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21z" stroke="black" strokeWidth="1.5" />
                  </svg>
                  <span className="text-sm">المفضلة</span>
                </DropdownMenu.Item>

                <DropdownMenu.Separator className="my-2 h-px bg-gray-200" />

                <DropdownMenu.Item 
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-[#FF735D] outline-none hover:bg-gray-50"
                  onClick={logout}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <span className="text-sm">تسجيل الخروج</span>
                </DropdownMenu.Item>
              </div>
            </motion.div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </AnimatePresence>
    </DropdownMenu.Root>
  )
} 