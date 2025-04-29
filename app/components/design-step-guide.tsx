"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronRight, ChevronLeft, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Step = {
  title: string
  description: string
  imageUrl: string
}

type DesignStepGuideProps = {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  steps: Step[]
}

export default function DesignStepGuide({ isOpen, onClose, onComplete, steps }: DesignStepGuideProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState<number[]>([])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompleted([...completed, currentStep])
      setCurrentStep(currentStep + 1)
    } else {
      setCompleted([...completed, currentStep])
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (index: number) => {
    setCurrentStep(index)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 md:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-[20px] md:rounded-[30px] w-full max-w-4xl overflow-hidden shadow-xl max-h-[90vh] md:max-h-[85vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-3 md:p-4 lg:p-6 border-b">
          <button
            onClick={onClose}
            className="px-3 py-1.5 md:px-4 md:py-2 rounded-md border border-gray-300 text-gray-700 font-medium text-sm md:text-base"
          >
            إغلاق
          </button>
          <h2 className="text-base md:text-lg lg:text-xl font-bold text-right">خطوات التصميم</h2>
          <div className="w-[60px] md:w-[76px]"></div> {/* Spacer for alignment */}
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-1 md:gap-2 p-3 md:p-4 bg-gray-50 overflow-x-auto">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`min-w-[28px] min-h-[28px] w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                currentStep === index
                  ? "bg-[#FF735D] text-white"
                  : completed.includes(index)
                    ? "bg-green-100 text-green-600 border border-green-300"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {completed.includes(index) ? <Check className="h-3 w-3 md:h-4 md:w-4" /> : index + 1}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6 -webkit-overflow-scrolling: touch;">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-center">{steps[currentStep].title}</h3>

              <div className="relative w-full h-[200px] sm:h-[250px] md:h-[400px] mb-4 md:mb-6 rounded-lg overflow-hidden">
                <Image
                  src={steps[currentStep].imageUrl || "/placeholder.svg"}
                  alt={steps[currentStep].title}
                  fill
                  className="object-contain"
                />
              </div>

              <p className="text-gray-700 text-center mb-4 md:mb-6 max-w-2xl text-sm md:text-base">
                {steps[currentStep].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-3 md:p-4 lg:p-6 border-t bg-gray-50">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md flex items-center gap-1 md:gap-2 text-sm md:text-base ${
              currentStep === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "border border-gray-300 text-gray-700"
            }`}
          >
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5 rtl:rotate-180" />
            <span>السابق</span>
          </button>

          <button
            onClick={handleNext}
            className="px-3 py-1.5 md:px-4 md:py-2 rounded-md bg-[#FF735D] text-white font-medium flex items-center gap-1 md:gap-2 text-sm md:text-base"
          >
            <span>{currentStep === steps.length - 1 ? "إنهاء" : "التالي"}</span>
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 rtl:rotate-180" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
