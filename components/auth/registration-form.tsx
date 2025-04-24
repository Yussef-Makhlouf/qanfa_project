"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UserRound, Phone, Lock, Eye, EyeOff } from "lucide-react"
import { PlatformLogo } from "@/components/ui/platform-logo"
import { BottomBorderInput } from "@/components/ui/bottom-border-input"
import { DottedBorderContainer } from "@/components/ui/dotted-border-container"

// Saudi phone number regex: 05xxxxxxxx or 5xxxxxxxx
const saudiPhoneRegex = /^(05|5)\d{8}$/

// Form validation schema
const formSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "يجب أن يحتوي الاسم على 3 أحرف على الأقل" })
    .max(50, { message: "يجب أن لا يتجاوز الاسم 50 حرفًا" }),
  phoneNumber: z.string().regex(saudiPhoneRegex, { message: "يرجى إدخال رقم هاتف سعودي صحيح (05xxxxxxxx)" }),
  password: z
    .string()
    .min(8, { message: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل" })
    .regex(/[A-Z]/, { message: "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل" })
    .regex(/[a-z]/, { message: "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل" })
    .regex(/[0-9]/, { message: "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل" })
    .regex(/[^A-Za-z0-9]/, { message: "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل" }),
})

export default function RegistrationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      password: "",
    },
  })

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your API
      console.log("Form submitted:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to verification page with phone number
      router.push(`/verify?phone=${values.phoneNumber}`)
    } catch (error) {
      console.error("Registration error:", error)
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
        {/* Welcome Section */}
        <div className="mb-6 text-center">
          <div className="flex justify-center">
            <span className="text-3xl">👋</span>
          </div>
          <h1 className="mt-2 text-center text-xl font-bold text-[#375A64]">أهــلا بــك !</h1>
          <p className="mt-1 text-center text-xs text-[#6A6A6A]">أدخل معلوماتك الكاملة حتى تتمكن الآن !</p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" dir="rtl">
            {/* Full Name Field */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="relative">
                  <div className="flex justify-between items-center">
                    <div className="w-8"></div>
                    <FormLabel className="text-xs font-medium text-[#375A64]">الاسم الكامل*</FormLabel>
                  </div>
                  <div className="relative">
                    <FormControl>
                      <BottomBorderInput
                        {...field}
                        placeholder="أدخل الاسم الكامل"
                        icon={<UserRound className="h-4 w-4 text-[#5A5A5A]" />}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-right text-[#FF3C3F] text-xs mt-1" />
                </FormItem>
              )}
            />

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

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#5A5A5A] focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <FormLabel className="text-xs font-medium text-[#375A64]">كلمة المرور*</FormLabel>
                  </div>
                  <div className="relative">
                    <FormControl>
                      <BottomBorderInput
                        {...field}
                        type={showPassword ? "text" : "password"}
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
              {isSubmitting ? "جاري الإرسال..." : "إنشاء حساب جديد"}
            </motion.button>
          </form>
        </Form>
      </DottedBorderContainer>

      {/* Login Link */}
      <div className="mt-4 flex justify-center gap-1 text-xs">
        <Link
          href="/login"
          className="text-[#375A64] font-medium hover:text-[#FF735D] hover:underline transition-colors duration-200"
        >
          تسجيل الدخول
        </Link>
        <span className="text-[#5A5A5A]">لديك حساب؟</span>
      </div>

      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-[#0000001A] text-[#5A5A5A] hover:bg-[#F8F8F8] transition-colors duration-200"
        aria-label="إغلاق"
      >
        <span className="text-sm">×</span>
      </motion.button>
    </motion.div>
  )
}
