"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Phone } from "lucide-react"
import { PlatformLogo } from "@/components/ui/platform-logo"
import { BottomBorderInput } from "@/components/ui/bottom-border-input"
import { DottedBorderContainer } from "@/components/ui/dotted-border-container"

// Saudi phone number regex: 05xxxxxxxx or 5xxxxxxxx
const saudiPhoneRegex = /^(05|5)\d{8}$/

// Form validation schema
const forgotPasswordSchema = z.object({
  phoneNumber: z.string().regex(saudiPhoneRegex, { message: "يرجى إدخال رقم هاتف سعودي صحيح (05xxxxxxxx)" }),
})

export default function ForgotPasswordForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phoneNumber: "",
    },
  })

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your API
      console.log("Forgot password form submitted:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to verification page with phone number
      router.push(`/verify?phone=${values.phoneNumber}&type=reset-password`)
    } catch (error) {
      console.error("Forgot password error:", error)
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

      {/* Title */}
      <DottedBorderContainer className="mb-6">
        <div className="mb-6 text-center">
          <h1 className="text-center text-lg font-bold text-[#375A64]">هل نسيت كلمة المرور؟</h1>
          <p className="text-center text-xs text-[#6A6A6A] mt-1">أدخل المعلومات الآتية...</p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" dir="rtl">
            {/* Phone Number Field */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="relative">
                  <div className="flex justify-between items-center">
                    <div className="w-8"></div>
                    <FormLabel className="text-xs font-medium text-[#375A64]">رقم الجوال*</FormLabel>
                  </div>
                  <div className="relative">
                    <FormControl>
                      <BottomBorderInput
                        {...field}
                        placeholder="مثال: 05xxxxxxxx"
                        icon={<Phone className="h-4 w-4 text-[#5A5A5A]" />}
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
              {isSubmitting ? "جاري الإرسال..." : "استمرار"}
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
