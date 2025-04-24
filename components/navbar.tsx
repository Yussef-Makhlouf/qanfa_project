"use client"

import { useState } from "react"
import Link from "next/link"
import { PlatformLogo } from "./ui/platform-logo"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { name: "الرئيسية", href: "/" },
  { name: "العقارات", href: "/properties" },
  { name: "المشاريع", href: "/projects" },
  { name: "من نحن", href: "/about" },
  { name: "اتصل بنا", href: "/contact" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <PlatformLogo className="h-12 w-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8 space-x-reverse">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-[#FF735D]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4 md:space-x-reverse">
            <Button variant="outline" className="rounded-lg border-gray-300 px-4 py-2 text-sm text-gray-700">
              تسجيل الدخول
            </Button>
            <Button className="rounded-lg bg-[#FF735D] px-4 py-2 text-sm text-white hover:bg-[#FF3C3F]">
              إنشاء حساب
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">فتح القائمة</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-[#FF735D]"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-4 flex flex-col space-y-2 px-3">
            <Button variant="outline" className="w-full justify-center rounded-lg border-gray-300 py-2 text-gray-700">
              تسجيل الدخول
            </Button>
            <Button className="w-full justify-center rounded-lg bg-[#FF735D] py-2 text-white hover:bg-[#FF3C3F]">
              إنشاء حساب
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
