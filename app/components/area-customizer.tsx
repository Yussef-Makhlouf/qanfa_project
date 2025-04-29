"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Move, Plus, Trash } from "lucide-react"

type ResizeHandle = "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | null

type CustomArea = {
  id: string
  startX: number
  startY: number
  width: number
  height: number
  color: string
  name?: string
}

type AreaCustomizerProps = {
  imageUrl: string
  onAreaSelect?: (areaId: string | null) => void
  onAreaChange?: (areas: CustomArea[]) => void
  onAreaCreate?: (area: CustomArea) => void
  onAreaDelete?: (areaId: string) => void
  initialAreas?: CustomArea[]
  className?: string
}

export default function AreaCustomizer({
  imageUrl,
  onAreaSelect,
  onAreaChange,
  onAreaCreate,
  onAreaDelete,
  initialAreas = [],
  className = "",
}: AreaCustomizerProps) {
  const [customAreas, setCustomAreas] = useState<CustomArea[]>(initialAreas)
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentArea, setCurrentArea] = useState<Omit<CustomArea, "id" | "color"> | null>(null)
  const [isDrawingMode, setIsDrawingMode] = useState<boolean>(false)
  const [activeResizeHandle, setActiveResizeHandle] = useState<ResizeHandle>(null)
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const [resizeStartPos, setResizeStartPos] = useState<{ x: number; y: number } | null>(null)

  const imageContainerRef = useRef<HTMLDivElement>(null)

  // Get the selected area object
  const selectedArea = customAreas.find((area) => area.id === selectedAreaId)

  // Update parent component when areas change
  useEffect(() => {
    if (onAreaChange) {
      onAreaChange(customAreas)
    }
  }, [customAreas, onAreaChange])

  // Update parent component when selection changes
  useEffect(() => {
    if (onAreaSelect) {
      onAreaSelect(selectedAreaId)
    }
  }, [selectedAreaId, onAreaSelect])

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
    if (!imageContainerRef.current) return

    const rect = imageContainerRef.current.getBoundingClientRect()
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
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageContainerRef.current) return

    const rect = imageContainerRef.current.getBoundingClientRect()
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

        if (onAreaCreate) {
          onAreaCreate(newArea)
        }
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
    } else {
      setSelectedAreaId(areaId)
    }
  }

  const handleResizeStart = (handle: ResizeHandle, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!imageContainerRef.current) return

    const rect = imageContainerRef.current.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    setActiveResizeHandle(handle)
    setIsResizing(true)
    setResizeStartPos({ x: mouseX, y: mouseY })
  }

  const deleteSelectedArea = () => {
    if (selectedAreaId) {
      setCustomAreas(customAreas.filter((area) => area.id !== selectedAreaId))

      if (onAreaDelete) {
        onAreaDelete(selectedAreaId)
      }

      setSelectedAreaId(null)
    }
  }

  const toggleDrawingMode = () => {
    setIsDrawingMode(!isDrawingMode)
    // Exit drawing mode and deselect area
    if (isDrawingMode) {
      setSelectedAreaId(null)
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
    <div className={`relative ${className}`}>
      {/* Controls */}
      <div className="absolute left-4 top-4 flex gap-2 z-10">
        <button
          onClick={toggleDrawingMode}
          className={`flex items-center gap-1 px-4 py-2 rounded-md ${
            isDrawingMode ? "bg-[#FF735D] text-white" : "bg-white text-gray-700 border"
          }`}
        >
          <Plus size={16} />
          <span>{isDrawingMode ? "إلغاء وضع الرسم" : "إضافة منطقة جديدة"}</span>
        </button>

        {selectedAreaId && (
          <button
            onClick={deleteSelectedArea}
            className="flex items-center gap-1 px-4 py-2 rounded-md bg-red-100 text-red-600 border border-red-200"
          >
            <Trash size={16} />
            <span>حذف المنطقة المحددة</span>
          </button>
        )}
      </div>

      {/* Resize instructions */}
      {selectedAreaId && (
        <div className="absolute left-4 top-16 bg-white bg-opacity-80 p-3 rounded-md shadow-sm border border-gray-200 z-10">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Move size={16} />
            <span>اسحب النقاط الحمراء في الزوايا لتغيير حجم المنطقة</span>
          </div>
        </div>
      )}

      {/* Main Image Container */}
      <div
        ref={imageContainerRef}
        className={`relative w-full h-full bg-white rounded-[14px] overflow-hidden ${
          isDrawingMode ? "cursor-crosshair" : "cursor-default"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="صورة للتخصيص"
          className="w-full h-full object-cover"
          fill
          priority
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
    </div>
  )
}
