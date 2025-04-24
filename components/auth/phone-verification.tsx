"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { DottedBorderContainer } from "@/components/ui/dotted-border-container"

interface PhoneVerificationProps {
  phoneNumber: string
  type?: "registration" | "reset-password"
}

export default function PhoneVerification({ phoneNumber, type = "registration" }: PhoneVerificationProps) {
  const router = useRouter()
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(60)
  const [isResending, setIsResending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")} : ${secs.toString().padStart(2, "0")}`
  }

  // Handle OTP input change
  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.substring(0, 1)
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle key press for backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.substring(0, 6).split("")
    const newOtp = [...otp]

    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit
    })

    setOtp(newOtp)

    if (digits.length > 0 && digits.length < 6) {
      inputRefs.current[digits.length]?.focus()
    }
  }

  // Resend OTP
  const handleResend = async () => {
    if (timeLeft > 0) return

    setIsResending(true)

    try {
      // Simulate API call to resend OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset timer
      setTimeLeft(60)

      // Clear OTP fields
      setOtp(["", "", "", "", "", ""])

      // Focus first input
      inputRefs.current[0]?.focus()
    } catch (error) {
      console.error("Error resending OTP:", error)
    } finally {
      setIsResending(false)
    }
  }

  // Verify OTP
  const handleVerify = async () => {
    const otpValue = otp.join("")

    if (otpValue.length !== 6) return

    setIsVerifying(true)

    try {
      // Simulate API call to verify OTP
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect based on verification type
      if (type === "reset-password") {
        router.push("/reset-password")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
    } finally {
      setIsVerifying(false)
    }
  }

  // Auto-verify when all digits are entered
  useEffect(() => {
    if (otp.every((digit) => digit !== "") && otp.length === 6) {
      handleVerify()
    }
  }, [otp])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-md overflow-hidden rounded-xl bg-white p-6 shadow-md"
    >
      <DottedBorderContainer>
        {/* Phone Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 rounded-lg border border-[#375A64] flex items-center justify-center">
            <svg className="h-6 w-6 text-[#375A64]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-bold text-[#375A64] mb-1">
          التحقق من <span className="text-[#FF735D]">رقم الجوال</span>
        </h2>

        {/* Subtitle */}
        <p className="text-center text-xs text-[#6A6A6A] mb-8">أدخل الرمز المرسل إلى رقم الجوال الخاص بك.</p>

        {/* OTP Input */}
        <div className="flex justify-center gap-1 mb-8 dir-ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              maxLength={1}
              className={`w-10 h-10 text-center text-lg font-bold border-0 border-b ${
                index === 0 ? "border-b-[#FF735D]" : "border-b-[#0000001A]"
              } bg-transparent focus:border-b-[#FF735D] focus:outline-none transition-all duration-200`}
            />
          ))}
        </div>

        {/* Resend Section */}
        <div className="flex justify-center items-center gap-1 text-xs">
          <button
            onClick={handleResend}
            disabled={timeLeft > 0 || isResending}
            className={`text-[#FF735D] ${
              timeLeft > 0 ? "opacity-50 cursor-not-allowed" : "hover:text-[#FF3C3F] hover:underline"
            } transition-colors duration-200`}
          >
            {isResending ? "جاري إعادة الإرسال..." : "أعد إرسال الرمز"}
          </button>
          <span className="text-[#5A5A5A]">لم تستلم الرمز؟</span>
        </div>

        {/* Timer */}
        <div className="text-center text-[#FF735D] font-medium mt-2 text-sm">{formatTime(timeLeft)}</div>
      </DottedBorderContainer>

      {/* Close Button */}
      <button
        onClick={() => router.push(type === "reset-password" ? "/forgot-password" : "/")}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-[#0000001A] text-[#5A5A5A] hover:bg-[#F8F8F8] transition-colors duration-200"
        aria-label="إغلاق"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}
