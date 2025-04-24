"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import PhoneVerification from "@/components/auth/phone-verification"

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone")

  // Redirect to home if no phone number is provided
  useEffect(() => {
    if (!phone) {
      window.location.href = "/"
    }
  }, [phone])

  if (!phone) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#375A64] p-4">
      <PhoneVerification phoneNumber={phone} />
    </div>
  )
}
