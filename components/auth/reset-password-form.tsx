"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Lock, Eye, EyeOff } from "lucide-react"
import { PlatformLogo } from "@/components/ui/platform-logo"
import { BottomBorderInput } from "@/components/ui/bottom-border-input"
import { DottedBorderContainer } from "@/components/ui/dotted-border-container"

// Form validation schema
const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل" })
      .regex(/[A-Z]/, { message: "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل" })
      .regex(/[a-z]/, { message: "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل" })
      .regex(/[0-9]/, { message: "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل" })
      .regex(/[^A-Za-z0-9]/, { message: "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  })

export default function ResetPasswordForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Initialize form
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your API
      console.log("Reset password form submitted:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to login page
      router.push("/login")
    } catch (error) {
      console.error("Reset password error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-md overflow-hidden rounded-xl bg-white p-6 shadow-md"
    >
      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <PlatformLogo />
      </div>

      <DottedBorderContainer className="mb-6">
        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-center text-lg font-bold text-[#375A64]">إعادة تعيين كلمة المرور</h1>
          <p className="text-center text-xs text-[#6A6A6A] mt-1">أدخل كلمة المرور الجديدة</p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" dir="rtl">
            {/* New Password Field */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="text-[#5A5A5A] focus:outline-none"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <FormLabel className="text-xs font-medium text-[#375A64]">كلمة المرور الجديدة*</FormLabel>
                  </div>
                  <div className="relative">
                    <FormControl>
                      <BottomBorderInput
                        {...field}
                        type={showNewPassword ? "text" : "password"}
                        placeholder="مثال: xxxxxxxx"
                        icon={<Lock className="h-4 w-4 text-[#5A5A5A]" />}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-right text-[#FF3C3F] text-xs mt-1" />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-[#5A5A5A] focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <FormLabel className="text-xs font-medium text-[#375A64]">تأكيد كلمة المرور*</FormLabel>
                  </div>
                  <div className="relative">
                    <FormControl>
                      <BottomBorderInput
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="مثال: xxxxxxxx"
                        icon={<Lock className="h-4 w-4 text-[#5A5A5A]" />}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-right text-[#FF3C3F] text-xs mt-1" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-xl bg-[#FF735D] py-3 text-center font-medium text-white shadow-md hover:bg-[#FF3C3F] focus:outline-none focus:ring-2 focus:ring-[#FF735D]/50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "جاري الحفظ..." : "حفظ"}
            </motion.button>
          </form>
        </Form>
      </DottedBorderContainer>

      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.push("/login")}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-[#0000001A] text-[#5A5A5A] hover:bg-[#F8F8F8] transition-colors duration-200"
        aria-label="إغلاق"
      >
        <span className="text-sm">×</span>
      </motion.button>
    </motion.div>
  )
}
