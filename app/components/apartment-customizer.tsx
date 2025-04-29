"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Play, Heart, Plus, Trash, Move, Check } from "lucide-react"
import DesignPreviewModal from "./design-preview-modal"
import DesignStepGuide from "./design-step-guide"
import { useMediaQuery } from "@/hooks/use-media-query"

// Use placeholder instead of direct import
const floorPlanImagePath = "/flat.png"

type ResizeHandle = "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | null

type CustomArea = {
  id: string
  startX: number
  startY: number
  width: number
  height: number
  color: string
  name?: string
  appliedDesign?: string
}

type DesignOption = {
  id: string
  imageUrl: string
  videoUrl?: string
  count?: number
  title?: string
}

// Update the designOptions array to use placeholder images
const designOptions: DesignOption[] = [
  { id: "option1", imageUrl: "/pro1.png", title: "غرفة نوم عصرية" },
  { id: "option2", imageUrl: "/pro2.png", title: "غرفة معيشة مريحة" },
  { id: "option3", imageUrl: "/pro3.png", title: "مطبخ حديث" },
  { id: "option4", imageUrl: "/pro4.png", title: "غرفة طعام" },
  { id: "option5", imageUrl: "/pro5.png", title: "حمام فاخر" },
  { id: "option6", imageUrl: "/pro6.png", count: 6, title: "المزيد من التصاميم" },
  { id: "option7", imageUrl: "/pro7.png", title: "غرفة أطفال" },
  { id: "option8", imageUrl: "/pro8.png", title: "مكتب منزلي" },
  { id: "option9", imageUrl: "/example.png", title: "شرفة خارجية" },
]

const designSteps = [
  {
    title: "اختيار المنطقة",
    description: "قم بتحديد المنطقة التي ترغب في تصميمها على المخطط بالنقر عليها أو رسم منطقة جديدة.",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "اختيار التصميم",
    description: "اختر التصميم المناسب من مجموعة التصاميم المتاحة على اليمين.",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "معاينة التصميم",
    description: "قم بمعاينة التصميم المختار وتأكد من مناسبته للمنطقة المحددة.",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "اختيار الخدمات",
    description: "أضف الخدمات الإضافية التي ترغب بها مثل التنظيف أو التركيب.",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "تأكيد الطلب",
    description: "راجع طلبك وقم بتأكيده لإتمام عملية التصميم.",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
]

export default function ApartmentCustomizer() {
  const [customAreas, setCustomAreas] = useState<CustomArea[]>([])
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentArea, setCurrentArea] = useState<Omit<CustomArea, "id" | "color"> | null>(null)
  const [selectedDesignOption, setSelectedDesignOption] = useState<string | null>(null)
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [isDrawingMode, setIsDrawingMode] = useState<boolean>(false)
  const [activeResizeHandle, setActiveResizeHandle] = useState<ResizeHandle>(null)
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const [resizeStartPos, setResizeStartPos] = useState<{ x: number; y: number } | null>(null)
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false)
  const [showStepGuide, setShowStepGuide] = useState<boolean>(false)
  const [designComplete, setDesignComplete] = useState<boolean>(false)

  const floorPlanRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Get the selected area object
  const selectedArea = customAreas.find((area) => area.id === selectedAreaId)

  // Get the selected design option
  const selectedDesign = designOptions.find((option) => option.id === selectedDesignOption)

  // Show step guide on first load
  useEffect(() => {
    const hasSeenGuide = localStorage.getItem("hasSeenDesignGuide")
    if (!hasSeenGuide) {
      setTimeout(() => {
        setShowStepGuide(true)
      }, 1000)
    }
  }, [])

  const getRandomColor = () => {
    // Generate semi-transparent colors suitable for area highlighting
    const colors = [
      "rgba(55, 90, 100, 0.4)",
      "rgba(89, 89, 89, 0.4)",
      "rgba(255, 115, 93, 0.4)",
      "rgba(100, 120, 140, 0.4)",
      "rgba(140, 100, 120, 0.4)",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!floorPlanRef.current) return

    const rect = floorPlanRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // If in drawing mode, start drawing a new area
    if (isDrawingMode) {
      setIsDrawing(true)
      setCurrentArea({
        startX: mouseX,
        startY: mouseY,
        width: 0,
        height: 0,
      })
      return
    }

    // Check if clicked on empty space (not on any area)
    const clickedOnArea = customAreas.some((area) => {
      return (
        mouseX >= area.startX &&
        mouseX <= area.startX + area.width &&
        mouseY >= area.startY &&
        mouseY <= area.startY + area.height
      )
    })

    // If clicked on empty space, deselect current area
    if (!clickedOnArea && !isDrawingMode) {
      setSelectedAreaId(null)
      setSelectedDesignOption(null)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!floorPlanRef.current) return

    const rect = floorPlanRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Handle drawing a new area
    if (isDrawing && currentArea) {
      setCurrentArea({
        startX: currentArea.startX,
        startY: currentArea.startY,
        width: mouseX - currentArea.startX,
        height: mouseY - currentArea.startY,
      })
      return
    }

    // Handle resizing an existing area
    if (isResizing && selectedArea && resizeStartPos && activeResizeHandle) {
      const deltaX = mouseX - resizeStartPos.x
      const deltaY = mouseY - resizeStartPos.y

      const updatedAreas = customAreas.map((area) => {
        if (area.id !== selectedAreaId) return area

        let newStartX = area.startX
        let newStartY = area.startY
        let newWidth = area.width
        let newHeight = area.height

        switch (activeResizeHandle) {
          case "topLeft":
            newStartX = area.startX + deltaX
            newStartY = area.startY + deltaY
            newWidth = area.width - deltaX
            newHeight = area.height - deltaY
            break
          case "topRight":
            newStartY = area.startY + deltaY
            newWidth = area.width + deltaX
            newHeight = area.height - deltaY
            break
          case "bottomLeft":
            newStartX = area.startX + deltaX
            newWidth = area.width - deltaX
            newHeight = area.height + deltaY
            break
          case "bottomRight":
            newWidth = area.width + deltaX
            newHeight = area.height + deltaY
            break
        }

        // Ensure width and height are not negative
        if (newWidth < 10) {
          newWidth = 10
          newStartX = area.startX + area.width - 10
        }
        if (newHeight < 10) {
          newHeight = 10
          newStartY = area.startY + area.height - 10
        }

        return {
          ...area,
          startX: newStartX,
          startY: newStartY,
          width: newWidth,
          height: newHeight,
        }
      })

      setCustomAreas(updatedAreas)
      setResizeStartPos({ x: mouseX, y: mouseY })
    }
  }

  const handleMouseUp = () => {
    // Handle finishing drawing a new area
    if (isDrawing && currentArea) {
      // Only create area if it has some size
      if (Math.abs(currentArea.width) > 10 && Math.abs(currentArea.height) > 10) {
        const newArea: CustomArea = {
          id: `area-${Date.now()}`,
          startX: currentArea.width > 0 ? currentArea.startX : currentArea.startX + currentArea.width,
          startY: currentArea.height > 0 ? currentArea.startY : currentArea.startY + currentArea.height,
          width: Math.abs(currentArea.width),
          height: Math.abs(currentArea.height),
          color: getRandomColor(),
        }

        setCustomAreas([...customAreas, newArea])
        setSelectedAreaId(newArea.id)
        showSelectionNotification()
      }

      setIsDrawing(false)
      setCurrentArea(null)
    }

    // Handle finishing resizing an area
    if (isResizing) {
      setIsResizing(false)
      setActiveResizeHandle(null)
      setResizeStartPos(null)
    }
  }

  const handleAreaClick = (areaId: string, e: React.MouseEvent) => {
    e.stopPropagation()

    // Toggle selection if clicking on the same area
    if (selectedAreaId === areaId) {
      setSelectedAreaId(null)
      setSelectedDesignOption(null)
    } else {
      setSelectedAreaId(areaId)

      // If this area already has a design applied, select it
      const area = customAreas.find((a) => a.id === areaId)
      if (area?.appliedDesign) {
        setSelectedDesignOption(area.appliedDesign)
      } else {
        setSelectedDesignOption(null)
      }

      showSelectionNotification()
    }
  }

  const handleResizeStart = (handle: ResizeHandle, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!floorPlanRef.current) return

    const rect = floorPlanRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    setActiveResizeHandle(handle)
    setIsResizing(true)
    setResizeStartPos({ x: mouseX, y: mouseY })
  }

  const showSelectionNotification = () => {
    setShowNotification(true)

    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const handleDesignOptionSelection = (optionId: string) => {
    setSelectedDesignOption(optionId)

    // Show preview modal if both area and design are selected
    if (selectedAreaId) {
      setShowPreviewModal(true)
    }
  }

  const handleDesignConfirmation = () => {
    if (selectedAreaId && selectedDesignOption) {
      // Update the area with the applied design
      const updatedAreas = customAreas.map((area) => {
        if (area.id === selectedAreaId) {
          return {
            ...area,
            appliedDesign: selectedDesignOption,
          }
        }
        return area
      })

      setCustomAreas(updatedAreas)
      setShowPreviewModal(false)
      setDesignComplete(true)

      // Show step guide if it's the first time completing a design
      const hasCompletedDesign = localStorage.getItem("hasCompletedDesign")
      if (!hasCompletedDesign) {
        localStorage.setItem("hasCompletedDesign", "true")
      }
    }
  }

  const handleStepGuideComplete = () => {
    setShowStepGuide(false)
    localStorage.setItem("hasSeenDesignGuide", "true")
  }

  const handleSendMessage = () => {
    console.log("Send message clicked")
  }

  const deleteSelectedArea = () => {
    if (selectedAreaId) {
      setCustomAreas(customAreas.filter((area) => area.id !== selectedAreaId))
      setSelectedAreaId(null)
      setSelectedDesignOption(null)
    }
  }

  const toggleDrawingMode = () => {
    setIsDrawingMode(!isDrawingMode)
    // Exit drawing mode and deselect area
    if (isDrawingMode) {
      setSelectedAreaId(null)
      setSelectedDesignOption(null)
    }
  }

  // Cleanup event listeners when component unmounts
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDrawing) {
        setIsDrawing(false)
        setCurrentArea(null)
      }
      if (isResizing) {
        setIsResizing(false)
        setActiveResizeHandle(null)
        setResizeStartPos(null)
      }
    }

    window.addEventListener("mouseup", handleGlobalMouseUp)
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isDrawing, isResizing])

  return (
    // Enhance the main component for better mobile responsiveness
    // Improve the main container
    <div className="relative mx-auto max-w-[1800px] h-auto min-h-screen sm:min-h-[1066px] bg-[#F8F8F8] rounded-[20px] sm:rounded-[50px] rtl px-2 sm:px-4 py-4 sm:py-8 md:p-0">
      <div className="flex flex-col lg:flex-row lg:relative">
        {/* Main Image Container */}
        {/* Make the floor plan more responsive */}
        <div
          ref={floorPlanRef}
          className={`relative w-full lg:w-[756px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[959px] lg:absolute lg:left-[47px] lg:top-[53px] bg-white rounded-[14px] overflow-hidden ${
            isDrawingMode ? "cursor-crosshair" : "cursor-default"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <Image
            src={floorPlanImagePath || "/placeholder.svg"}
            alt="مخطط الشقة"
            className="w-full h-full object-cover"
            priority
            width={1000}
            height={1000}
          />

          {/* Custom areas */}
          {customAreas.map((area) => (
            <div
              key={area.id}
              className={`absolute cursor-pointer transition-all duration-200 ${
                selectedAreaId === area.id ? "ring-2 ring-[#FF735D]" : ""
              }`}
              style={{
                left: `${area.startX}px`,
                top: `${area.startY}px`,
                width: `${area.width}px`,
                height: `${area.height}px`,
                background: area.color,
              }}
              onClick={(e) => handleAreaClick(area.id, e)}
            >
              {/* Applied design indicator */}
              {area.appliedDesign && (
                <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                  <Check className="h-4 w-4 text-[#FF735D]" />
                </div>
              )}

              {/* Corner dots for all areas */}
              <div className="absolute w-[12px] h-[12px] left-[-6px] top-[-6px] bg-white border-[0.3px] border-black rounded-full"></div>
              <div className="absolute w-[12px] h-[12px] right-[-6px] bottom-[-6px] bg-white border-[0.3px] border-black rounded-full"></div>

              {/* Red dots and resize handles for selected area */}
              {selectedAreaId === area.id && (
                <>
                  {/* Red corner dots */}
                  <div className="absolute w-[12px] h-[12px] left-[-6px] top-[-6px] bg-[#FF735D] border-[0.3px] border-black rounded-full"></div>
                  <div className="absolute w-[12px] h-[12px] right-[-6px] bottom-[-6px] bg-[#FF735D] border-[0.3px] border-black rounded-full"></div>
                  <div className="absolute w-[12px] h-[12px] right-[-6px] top-[-6px] bg-[#FF735D] border-[0.3px] border-black rounded-full"></div>
                  <div className="absolute w-[12px] h-[12px] left-[-6px] bottom-[-6px] bg-[#FF735D] border-[0.3px] border-black rounded-full"></div>

                  {/* Resize handles */}
                  <div
                    className="absolute w-[20px] h-[20px] left-[-10px] top-[-10px] cursor-nwse-resize z-10"
                    onMouseDown={(e) => handleResizeStart("topLeft", e)}
                  ></div>
                  <div
                    className="absolute w-[20px] h-[20px] right-[-10px] top-[-10px] cursor-nesw-resize z-10"
                    onMouseDown={(e) => handleResizeStart("topRight", e)}
                  ></div>
                  <div
                    className="absolute w-[20px] h-[20px] left-[-10px] bottom-[-10px] cursor-nesw-resize z-10"
                    onMouseDown={(e) => handleResizeStart("bottomLeft", e)}
                  ></div>
                  <div
                    className="absolute w-[20px] h-[20px] right-[-10px] bottom-[-10px] cursor-nwse-resize z-10"
                    onMouseDown={(e) => handleResizeStart("bottomRight", e)}
                  ></div>
                </>
              )}
            </div>
          ))}

          {/* Currently drawing area */}
          {isDrawing && currentArea && (
            <div
              className="absolute border-2 border-dashed border-[#FF735D] bg-[rgba(255,115,93,0.2)]"
              style={{
                left: `${currentArea.width > 0 ? currentArea.startX : currentArea.startX + currentArea.width}px`,
                top: `${currentArea.height > 0 ? currentArea.startY : currentArea.startY + currentArea.height}px`,
                width: `${Math.abs(currentArea.width)}px`,
                height: `${Math.abs(currentArea.height)}px`,
              }}
            ></div>
          )}
        </div>

        {/* Drawing mode controls */}
        {/* Make the drawing mode controls more touch-friendly */}
        <div className="absolute left-2 sm:left-4 lg:left-[47px] top-2 sm:top-4 lg:top-[10px] flex flex-wrap gap-2 z-10 max-w-[calc(100%-16px)]">
          <button
            onClick={toggleDrawingMode}
            className={`flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm ${
              isDrawingMode ? "bg-[#FF735D] text-white" : "bg-white text-gray-700 border"
            }`}
          >
            <Plus size={14} className="sm:hidden" />
            <Plus size={16} className="hidden sm:block" />
            <span>{isDrawingMode ? "إلغاء الرسم" : "إضافة منطقة"}</span>
          </button>

          {selectedAreaId && (
            <button
              onClick={deleteSelectedArea}
              className="flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md bg-red-100 text-red-600 border border-red-200 text-xs sm:text-sm"
            >
              <Trash size={14} className="sm:hidden" />
              <Trash size={16} className="hidden sm:block" />
              <span>حذف المنطقة</span>
            </button>
          )}
        </div>

        {/* Help button */}
        {/* Make the help button more responsive */}
        <div className="absolute left-2 sm:left-4 lg:left-[47px] top-12 sm:top-16 lg:top-[60px] z-10">
          <button
            onClick={() => setShowStepGuide(true)}
            className="flex items-center gap-1 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md bg-white text-gray-700 border text-xs sm:text-sm"
          >
            <span>دليل الاستخدام</span>
          </button>
        </div>

        {/* Resize instructions */}
        {/* Make resize instructions more responsive */}
        {selectedAreaId && (
          <div className="absolute left-2 sm:left-4 lg:left-[47px] top-24 sm:top-28 lg:top-[110px] bg-white bg-opacity-80 p-2 sm:p-3 rounded-md shadow-sm border border-gray-200 z-10 max-w-[calc(100%-16px)]">
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700">
              <Move size={14} className="sm:hidden" />
              <Move size={16} className="hidden sm:block" />
              <span className="line-clamp-2">اسحب النقاط الحمراء لتغيير حجم المنطقة</span>
            </div>
          </div>
        )}

        {/* Design Options Container */}
        {/* Make design options container more responsive */}
        <div className="w-full mt-4 sm:mt-8 lg:mt-0 lg:absolute lg:w-[917px] lg:h-[959px] lg:left-[843px] lg:top-[53px] bg-white rounded-[20px] sm:rounded-[50px] p-3 sm:p-4 lg:p-[30px]">
          <div className="flex flex-col gap-[10px] sm:gap-[20px] w-full lg:w-[857px] lg:h-[897px]">
            {/* First row */}
            <div className="flex flex-col sm:flex-row gap-[10px] sm:gap-[20px] w-full h-auto sm:h-[200px] md:h-[286px]">
              {designOptions.slice(0, 3).map((option, index) => (
                <div
                  key={`row1-${index}`}
                  className={`relative flex-grow h-[150px] sm:h-[200px] md:h-[262px] bg-[#F2F2F2] rounded-[10px] sm:rounded-[20px] overflow-hidden cursor-pointer ${
                    selectedDesignOption === option.id ? "ring-2 ring-[#FF735D]" : ""
                  }`}
                  onClick={() => handleDesignOptionSelection(option.id)}
                >
                  <Image
                    src={option.imageUrl || "/pro1.png"}
                    alt={`خيار التصميم ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {option.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="rounded-full bg-white bg-opacity-80 p-1 sm:p-2">
                        <Play className="h-4 w-4 sm:h-6 sm:w-6" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-[10px] sm:top-[20px] left-[10px] sm:left-[20px] w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] opacity-0 hover:opacity-100 flex flex-col justify-center items-center p-[8px] sm:p-[10px] gap-[6px] sm:gap-[8px] bg-[#F8F8F8] rounded-[12px] sm:rounded-[18px] transition-opacity">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  {/* Design title */}
                  <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black to-transparent p-2 sm:p-3">
                    <h3 className="text-white text-right font-medium text-xs sm:text-sm">{option.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Second row - similar updates for other rows */}
            <div className="flex flex-col sm:flex-row gap-[10px] sm:gap-[20px] w-full h-auto sm:h-[200px] md:h-[285px]">
              {designOptions.slice(3, 6).map((option, index) => (
                <div
                  key={`row2-${index}`}
                  className={`relative flex-grow h-[150px] sm:h-[200px] md:h-[262px] bg-[#F2F2F2] rounded-[10px] sm:rounded-[20px] overflow-hidden cursor-pointer ${
                    selectedDesignOption === option.id ? "ring-2 ring-[#FF735D]" : ""
                  }`}
                  onClick={() => handleDesignOptionSelection(option.id)}
                >
                  <Image
                    src={option.imageUrl || "/placeholder.svg"}
                    alt={`خيار التصميم ${index + 4}`}
                    fill
                    className="object-cover"
                  />
                  {option.count && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="text-white font-bold text-[24px] sm:text-[32px]">+{option.count}</div>
                    </div>
                  )}
                  <div className="absolute top-[10px] sm:top-[20px] left-[10px] sm:left-[20px] w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] opacity-0 hover:opacity-100 flex flex-col justify-center items-center p-[8px] sm:p-[10px] gap-[6px] sm:gap-[8px] bg-[#F8F8F8] rounded-[12px] sm:rounded-[18px] transition-opacity">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  {/* Design title */}
                  <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black to-transparent p-2 sm:p-3">
                    <h3 className="text-white text-right font-medium text-xs sm:text-sm">{option.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Third row - similar updates */}
            <div className="flex flex-col sm:flex-row gap-[10px] sm:gap-[20px] w-full h-auto sm:h-[200px] md:h-[286px]">
              {designOptions.slice(6, 9).map((option, index) => (
                <div
                  key={`row3-${index}`}
                  className={`relative flex-grow h-[150px] sm:h-[200px] md:h-[262px] bg-[#F2F2F2] rounded-[10px] sm:rounded-[20px] overflow-hidden cursor-pointer ${
                    selectedDesignOption === option.id ? "ring-2 ring-[#FF735D]" : ""
                  }`}
                  onClick={() => handleDesignOptionSelection(option.id)}
                >
                  <Image
                    src={option.imageUrl || "/placeholder.svg"}
                    alt={`خيار التصميم ${index + 7}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-[10px] sm:top-[20px] left-[10px] sm:left-[20px] w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] opacity-0 hover:opacity-100 flex flex-col justify-center items-center p-[8px] sm:p-[10px] gap-[6px] sm:gap-[8px] bg-[#F8F8F8] rounded-[12px] sm:rounded-[18px] transition-opacity">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  {/* Design title */}
                  <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black to-transparent p-2 sm:p-3">
                    <h3 className="text-white text-right font-medium text-xs sm:text-sm">{option.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notification Items */}
        {/* Make notifications more responsive */}
        {showNotification && selectedAreaId && (
          <>
            {/* Top notification */}
            <div className="fixed md:absolute w-[90%] md:w-[502px] h-auto md:h-[194px] left-[5%] md:left-[calc(50%-502px/2-375px)] top-4 md:top-[calc(50%-194px/2-499px)] bg-[#F6F6F6] border-[0.5px] border-[#375A64] shadow-[0px_4px_24px_rgba(55,90,100,0.32)] rounded-[20px_20px_20px_10px] sm:rounded-[30px_30px_30px_10px] flex flex-col justify-center items-end p-3 sm:p-4 md:p-[25px] gap-2 sm:gap-4 md:gap-[38px] z-20">
              <div className="flex flex-row justify-between items-center w-full md:w-[452px] h-auto md:h-[27px]">
                <div className="w-[24px] h-[24px] sm:w-[27px] sm:h-[27px] relative">
                  <div className="absolute w-[24px] h-[24px] sm:w-[27px] sm:h-[27px] left-0 top-0 bg-[#FF735D] rounded-full"></div>
                  <div className="absolute w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] left-[3px] top-[3px] flex items-center justify-center text-[10px] sm:text-[12px] font-medium text-black">
                    1
                  </div>
                </div>
                <div className="w-auto md:w-[188px] h-auto md:h-[26px] text-[14px] sm:text-[16px] font-semibold text-right text-black">
                  تم تحديد منطقة مخصصة
                </div>
              </div>
              <div className="flex flex-col justify-center items-end gap-[8px] sm:gap-[16px] w-full md:w-[382px] h-auto md:h-[75px]">
                <div className="w-auto md:w-[93px] h-auto md:h-[21px] text-[12px] sm:text-[14px] font-bold text-right text-[#375A64]">
                  معلومات المنطقة
                </div>
                <div className="flex flex-row justify-end items-center gap-[5px] w-full md:w-[382px] h-auto md:h-[38px]">
                  <div className="w-full md:w-[382px] h-auto md:h-[38px] text-[10px] sm:text-[12px] font-normal text-right text-[#595959]">
                    يمكنك تغيير حجم المنطقة عن طريق سحب النقاط الحمراء في الزوايا، أو النقر مرة أخرى لإلغاء التحديد
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom notification - similar updates */}
            <div className="fixed md:absolute w-[90%] md:w-[502px] h-auto md:h-[194px] left-[5%] md:left-[calc(50%-502px/2-493px)] bottom-20 md:top-[calc(50%-194px/2+458px)] bg-[#F6F6F6] border-[0.5px] border-[#375A64] shadow-[0px_4px_24px_rgba(55,90,100,0.32)] rounded-[20px_20px_10px_20px] sm:rounded-[30px_30px_10px_30px] flex flex-col justify-center items-end p-3 sm:p-4 md:p-[25px] gap-2 sm:gap-4 md:gap-[38px] z-20">
              <div className="flex flex-row justify-between items-center w-full md:w-[452px] h-auto md:h-[27px]">
                <div className="w-[24px] h-[24px] sm:w-[27px] sm:h-[27px] relative">
                  <div className="absolute w-[24px] h-[24px] sm:w-[27px] sm:h-[27px] left-0 top-0 bg-[#FF735D] rounded-full"></div>
                  <div className="absolute w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] left-[3px] top-[3px] flex items-center justify-center text-[10px] sm:text-[12px] font-medium text-black">
                    2
                  </div>
                </div>
                <div className="w-auto md:w-[329px] h-auto md:h-[26px] text-[14px] sm:text-[16px] font-semibold text-right text-black">
                  اختر التصميم المناسب من القائمة على اليمين
                </div>
              </div>
              <div className="flex flex-col justify-center items-end gap-[8px] sm:gap-[16px] w-full md:w-[382px] h-auto md:h-[75px]">
                <div className="w-auto md:w-[93px] h-auto md:h-[21px] text-[12px] sm:text-[14px] font-bold text-right text-[#375A64]">
                  خطوات التصميم
                </div>
                <div className="flex flex-row justify-end items-center gap-[5px] w-full md:w-[382px] h-auto md:h-[38px]">
                  <div className="w-full md:w-[382px] h-auto md:h-[38px] text-[10px] sm:text-[12px] font-normal text-right text-[#595959]">
                    يمكنك إضافة مناطق جديدة بالضغط على زر "إضافة منطقة جديدة" ثم الرسم على المخطط
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
       
      </div>

      {/* Design Preview Modal */}
      <DesignPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        onConfirm={handleDesignConfirmation}
        selectedArea={selectedArea || null}
        selectedDesign={selectedDesign || null}
        floorPlanImage={floorPlanImagePath}
        designOptions={designOptions}
      />

      {/* Step Guide */}
      <DesignStepGuide
        isOpen={showStepGuide}
        onClose={() => setShowStepGuide(false)}
        onComplete={handleStepGuideComplete}
        steps={designSteps}
      />
       {/* Make action buttons more responsive */}
       <div className="fixed md:absolute bottom-4 left-0 right-0 flex justify-center gap-2 sm:gap-[20px] z-10">
          <button
            onClick={() => (selectedAreaId && selectedDesignOption ? setShowPreviewModal(true) : null)}
            className={`px-4 sm:px-8 py-2 sm:py-3 rounded-md text-xs sm:text-sm ${
              selectedAreaId && selectedDesignOption
                ? "bg-[#FF735D] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } font-medium`}
          >
            معاينة التصميم المختار
          </button>
          <button
            onClick={handleSendMessage}
            className="px-4 sm:px-8 py-2 sm:py-3 rounded-md bg-gray-200 text-gray-700 font-medium text-xs sm:text-sm"
          >
            إرسال رسالة توضيح
          </button>
        </div>
     
    </div>
  )
}
