"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { X, Check, ArrowRight, ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

type DesignOption = {
  id: string
  imageUrl: string
  videoUrl?: string
  count?: number
  title?: string
}

type CustomArea = {
  id: string
  startX: number
  startY: number
  width: number
  height: number
  color: string
  name?: string
}

type DesignPreviewModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  selectedArea: CustomArea | null
  selectedDesign: DesignOption | null
  floorPlanImage: string
  designOptions: DesignOption[]
}

export default function DesignPreviewModal({
  isOpen,
  onClose,
  onConfirm,
  selectedArea,
  selectedDesign,
  floorPlanImage,
  designOptions,
}: DesignPreviewModalProps) {
  const [currentView, setCurrentView] = useState<"before" | "after">("after")
  const [isLoading, setIsLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const totalSteps = 4

  useEffect(() => {
    if (isOpen) {
      // Simulate loading time for the preview
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isOpen, selectedDesign])

  useEffect(() => {
    // Reset step when modal opens
    if (isOpen) {
      setCurrentStep(1)
      setShowSuccessMessage(false)
    }
  }, [isOpen])

  const handleConfirm = () => {
    setShowSuccessMessage(true)
    setTimeout(() => {
      onConfirm()
    }, 2000)
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !selectedArea || !selectedDesign) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 md:p-4">
        {showSuccessMessage ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-[20px] md:rounded-[30px] w-full max-w-xs sm:max-w-sm md:max-w-md p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 mb-3 md:mb-4 relative">
              <Image src="/placeholder.svg?height=80&width=80" alt="نجاح" fill className="object-contain" />
            </div>
            <h2 className="text-lg md:text-xl font-bold mb-1 md:mb-2">تم الإرسال بنجاح!</h2>
            <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
              تم تطبيق التصميم المختار بنجاح على المنطقة المحددة
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-[#FF735D] text-white font-medium w-full text-sm md:text-base"
            >
              العودة إلى المخطط
            </button>
          </motion.div>
        ) : (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-[20px] md:rounded-[30px] w-full max-w-4xl overflow-hidden shadow-xl max-h-[90vh] md:max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-3 md:p-4 lg:p-6 border-b sticky top-0 bg-white z-10">
              <button onClick={onClose} className="p-1 md:p-2 rounded-full hover:bg-gray-100">
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </button>
              <h2 className="text-base md:text-lg lg:text-xl font-bold text-right">
                {currentStep === 1
                  ? "معاينة التصميم المختار"
                  : currentStep === 2
                    ? "اختيار الخدمات"
                    : currentStep === 3
                      ? "تخصيص الباقة"
                      : "إرسال الطلب"}
              </h2>
              <div className="w-4 md:w-5"></div> {/* Spacer for alignment */}
            </div>

            {/* Step indicator */}
            <div className="px-3 md:px-4 lg:px-6 py-2 bg-gray-50 flex justify-between items-center">
              <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500">
                <span>الخطوة</span>
                <span className="font-bold text-[#FF735D]">{currentStep}</span>
                <span>من</span>
                <span>{totalSteps}</span>
              </div>
              <div className="w-full max-w-[120px] md:max-w-[200px] mx-2 md:mx-4 bg-gray-200 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-[#FF735D] h-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs md:text-sm font-medium text-gray-700">
                {currentStep === 1
                  ? "المعاينة"
                  : currentStep === 2
                    ? "الخدمات"
                    : currentStep === 3
                      ? "التخصيص"
                      : "التأكيد"}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto -webkit-overflow-scrolling: touch;">
              {currentStep === 1 && (
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    {/* Preview Area */}
                    <div className="flex-1 relative h-[200px] sm:h-[250px] md:h-[400px] bg-gray-100 rounded-[20px] overflow-hidden">
                      {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 border-4 border-[#FF735D] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        <>
                          {/* Floor plan with selected area */}
                          <div className="absolute inset-0">
                            <Image
                              src={floorPlanImage || "/placeholder.svg"}
                              alt="مخطط الشقة"
                              fill
                              className="object-contain"
                            />

                            {/* Selected area overlay */}
                            <div
                              className="absolute"
                              style={{
                                left: `${selectedArea.startX}px`,
                                top: `${selectedArea.startY}px`,
                                width: `${selectedArea.width}px`,
                                height: `${selectedArea.height}px`,
                                background: currentView === "before" ? selectedArea.color : "transparent",
                                border: "2px solid #FF735D",
                              }}
                            >
                              {/* Design preview (only in "after" view) */}
                              {currentView === "after" && (
                                <div className="absolute inset-0 overflow-hidden">
                                  <Image
                                    src={selectedDesign.imageUrl || "/placeholder.svg"}
                                    alt="تصميم مختار"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Before/After toggle */}
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg">
                            <div className="flex items-center p-1">
                              <button
                                onClick={() => setCurrentView("before")}
                                className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                                  currentView === "before" ? "bg-[#FF735D] text-white" : "bg-transparent text-gray-700"
                                }`}
                              >
                                قبل
                              </button>
                              <button
                                onClick={() => setCurrentView("after")}
                                className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                                  currentView === "after" ? "bg-[#FF735D] text-white" : "bg-transparent text-gray-700"
                                }`}
                              >
                                بعد
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Design Info */}
                    <div className="flex-1 flex flex-col mt-4 md:mt-0">
                      <h3 className="text-base md:text-lg font-bold mb-2 text-right">تفاصيل التصميم</h3>

                      <div className="relative h-[120px] sm:h-[150px] md:h-[200px] mb-3 md:mb-4 bg-gray-100 rounded-[20px] overflow-hidden">
                        <Image
                          src={selectedDesign.imageUrl || "/placeholder.svg"}
                          alt="تصميم مختار"
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="text-right mb-6">
                        <p className="text-gray-700 mb-2">سيتم تطبيق هذا التصميم على المنطقة المحددة في المخطط.</p>
                        <p className="text-gray-700">يمكنك التبديل بين عرض "قبل" و "بعد" لمقارنة التغييرات.</p>
                      </div>

                      {/* Additional design options */}
                      <div className="mt-auto">
                        <h4 className="text-sm font-bold mb-2 text-right">تصاميم مشابهة</h4>
                        <div className="flex justify-between items-center">
                          <button className="p-2 rounded-full bg-gray-100">
                            <ArrowLeft className="h-5 w-5" />
                          </button>

                          <div className="flex gap-1 md:gap-2">
                            {designOptions.slice(0, isMobile ? 2 : 3).map((option, i) => (
                              <div
                                key={i}
                                className="w-12 h-12 md:w-16 md:h-16 bg-gray-200 rounded-md overflow-hidden relative"
                              >
                                <Image
                                  src={option.imageUrl || "/placeholder.svg"}
                                  alt={`تصميم مشابه ${i + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>

                          <button className="p-2 rounded-full bg-gray-100">
                            <ArrowRight className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="p-4 md:p-6">
                  <div className="mb-4 text-right">
                    <h3 className="text-lg font-bold mb-2">اختر الخدمات</h3>
                    <p className="text-gray-600 text-sm">اختر الخدمات التي ترغب في إضافتها إلى مشروعك</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {/* Service 1 */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="relative h-[180px]">
                        <Image
                          src="/placeholder.svg?height=180&width=300"
                          alt="خدمة نقل الأثاث"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-bold">
                          السعر: 90 ر.س
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-bold text-right mb-1">خدمة نقل الأثاث</h4>
                        <p className="text-sm text-gray-600 text-right mb-2">
                          توصيل هذه الخدمة ستساعدك في نقل الأثاث إلى منزلك
                        </p>
                        <label className="flex items-center justify-end gap-2 cursor-pointer">
                          <span className="text-sm">إضافة الخدمة</span>
                          <input type="checkbox" className="w-4 h-4 accent-[#FF735D]" />
                        </label>
                      </div>
                    </div>

                    {/* Service 2 */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="relative h-[180px]">
                        <Image
                          src="/placeholder.svg?height=180&width=300"
                          alt="خدمة التنظيف"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-bold">
                          السعر: 50 ر.س
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-bold text-right mb-1">خدمة التنظيف</h4>
                        <p className="text-sm text-gray-600 text-right mb-2">
                          توصيل هذه الخدمة ستساعدك في تنظيف المنزل قبل وبعد التصميم
                        </p>
                        <label className="flex items-center justify-end gap-2 cursor-pointer">
                          <span className="text-sm">إضافة الخدمة</span>
                          <input type="checkbox" className="w-4 h-4 accent-[#FF735D]" defaultChecked />
                        </label>
                      </div>
                    </div>

                    {/* Service 3 */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="relative h-[180px]">
                        <Image
                          src="/placeholder.svg?height=180&width=300"
                          alt="خدمة تركيب الأثاث"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-bold">
                          السعر: 80 ر.س
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-bold text-right mb-1">خدمة تركيب الأثاث</h4>
                        <p className="text-sm text-gray-600 text-right mb-2">
                          توصيل هذه الخدمة ستساعدك في تركيب الأثاث الجديد
                        </p>
                        <label className="flex items-center justify-end gap-2 cursor-pointer">
                          <span className="text-sm">إضافة الخدمة</span>
                          <input type="checkbox" className="w-4 h-4 accent-[#FF735D]" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="p-4 md:p-6">
                  <div className="mb-4 text-right">
                    <h3 className="text-lg font-bold mb-2">تخصيص الباقة</h3>
                    <p className="text-gray-600 text-sm">خصص باقتك المناسبة لشقتك</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center border">
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center border">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      <h4 className="font-bold">خصائص الباقة</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Package Feature 1 */}
                      <div className="bg-white p-3 rounded-lg">
                        <div className="flex justify-end gap-2 items-center mb-2">
                          <h5 className="font-medium">الأثاث</h5>
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-[#FF735D]" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 items-center">
                          <span className="text-sm text-gray-600">منضدة قهوة</span>
                          <input type="checkbox" className="w-4 h-4 accent-[#FF735D]" defaultChecked />
                        </div>
                        <div className="flex justify-end gap-2 items-center">
                          <span className="text-sm text-gray-600">أريكة</span>
                          <input type="checkbox" className="w-4 h-4 accent-[#FF735D]" defaultChecked />
                        </div>
                        <div className="flex justify-end gap-2 items-center">
                          <span className="text-sm text-gray-600">طاولة طعام</span>
                          <input type="checkbox" className="w-4 h-4 accent-[#FF735D]" />
                        </div>
                      </div>

                      {/* Package Feature 2 */}
                      <div className="bg-white p-3 rounded-lg">
                        <div className="flex justify-end gap-2 items-center mb-2">
                          <h5 className="font-medium">الأجهزة</h5>
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-[#FF735D]" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 items-center">
                          <span className="text-sm text-gray-600">شاشة تلفاز</span>
                          <input type="checkbox" className="w-4 h-4 accent-[#FF735D]" defaultChecked />
                        </div>
                        <div className="flex justify-end gap-2 items-center">
                          <span className="text-sm text-gray-600">التكييف</span>
                          <input type="checkbox" className="w-4 h-4 accent-[#FF735D]" />
                        </div>
                        <div className="flex justify-end gap-2 items-center">
                          <span className="text-sm text-gray-600">مكنسة كهربائية</span>
                          <input type="checkbox" className="w-4 h-4 accent-[#FF735D]" />
                        </div>
                      </div>

                      {/* Package Feature 3 */}
                      <div className="bg-white p-3 rounded-lg">
                        <div className="flex justify-end gap-2 items-center mb-2">
                          <h5 className="font-medium">الإضاءة</h5>
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-[#FF735D]" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 items-center">
                          <span className="text-sm text-gray-600">مصباح أرضي</span>
                          <input type="checkbox" className="w-4 h-4 accent-[#FF735D]" defaultChecked />
                        </div>
                        <div className="flex justify-end gap-2 items-center">
                          <span className="text-sm text-gray-600">أباجورة</span>
                          <input type="checkbox" className="w-4 h-4 accent-[#FF735D]" defaultChecked />
                        </div>
                        <div className="flex justify-end gap-2 items-center">
                          <span className="text-sm text-gray-600">إضاءة سقف</span>
                          <input type="checkbox" className="w-4 h-4 accent-[#FF735D]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-right mb-3">الأسئلة</h4>
                    <div className="space-y-4">
                      <div className="bg-white p-3 rounded-lg">
                        <h5 className="font-medium text-right mb-2">السؤال الأول</h5>
                        <input
                          type="text"
                          placeholder="أدخل إجابتك هنا"
                          className="w-full p-2 border rounded-md text-right"
                        />
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <h5 className="font-medium text-right mb-2">السؤال الثاني</h5>
                        <input
                          type="text"
                          placeholder="أدخل إجابتك هنا"
                          className="w-full p-2 border rounded-md text-right"
                        />
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <h5 className="font-medium text-right mb-2">السؤال الثالث</h5>
                        <input
                          type="text"
                          placeholder="أدخل إجابتك هنا"
                          className="w-full p-2 border rounded-md text-right"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="p-4 md:p-6">
                  <div className="mb-4 text-right">
                    <h3 className="text-lg font-bold mb-2">إرسال الطلب</h3>
                    <p className="text-gray-600 text-sm">قم بمراجعة طلبك قبل الإرسال النهائي</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-right mb-3">ملخص الطلب</h4>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium">غرفة النوم</span>
                        <span className="text-right">المنطقة المختارة</span>
                      </div>

                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium">التصميم الحديث</span>
                        <span className="text-right">التصميم المختار</span>
                      </div>

                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium">خدمة التنظيف</span>
                        <span className="text-right">الخدمات المضافة</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">220 ر.س</span>
                        <span className="text-right font-medium">المجموع</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-bold text-right mb-3">معلومات التواصل</h4>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-right mb-1 text-sm font-medium">الاسم الكامل</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md text-right"
                          placeholder="أدخل اسمك الكامل"
                        />
                      </div>

                      <div>
                        <label className="block text-right mb-1 text-sm font-medium">رقم الهاتف</label>
                        <input
                          type="tel"
                          className="w-full p-2 border rounded-md text-right"
                          placeholder="أدخل رقم هاتفك"
                        />
                      </div>

                      <div>
                        <label className="block text-right mb-1 text-sm font-medium">البريد الإلكتروني</label>
                        <input
                          type="email"
                          className="w-full p-2 border rounded-md text-right"
                          placeholder="أدخل بريدك الإلكتروني"
                        />
                      </div>

                      <div>
                        <label className="block text-right mb-1 text-sm font-medium">العنوان</label>
                        <textarea
                          className="w-full p-2 border rounded-md text-right"
                          placeholder="أدخل عنوانك بالتفصيل"
                          rows={3}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-3 md:p-4 lg:p-6 border-t bg-gray-50 sticky bottom-0">
              {currentStep > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-md border border-gray-300 text-gray-700 font-medium flex items-center gap-1 md:gap-2 text-sm md:text-base"
                >
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5 rtl:rotate-180" />
                  <span>السابق</span>
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-md border border-gray-300 text-gray-700 font-medium text-sm md:text-base"
                >
                  إلغاء
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-md bg-[#FF735D] text-white font-medium flex items-center gap-1 md:gap-2 text-sm md:text-base"
                >
                  <span>التالي</span>
                  <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 rtl:rotate-180" />
                </button>
              ) : (
                <button
                  onClick={handleConfirm}
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-md bg-[#FF735D] text-white font-medium flex items-center gap-1 md:gap-2 text-sm md:text-base"
                >
                  <Check className="h-4 w-4 md:h-5 md:w-5" />
                  <span>إرسال الطلب</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  )
}
