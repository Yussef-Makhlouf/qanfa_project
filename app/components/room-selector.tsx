"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type RoomSelectorProps = {
  roomId: string
  x: number
  y: number
  width: number
  height: number
  isSelected: boolean
  onSelect: (roomId: string) => void
}

export default function RoomSelector({ roomId, x, y, width, height, isSelected, onSelect }: RoomSelectorProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "absolute cursor-pointer transition-all duration-200",
        isSelected ? "bg-blue-200 bg-opacity-40" : "bg-transparent",
        isHovered ? "bg-blue-100 bg-opacity-30" : "",
      )}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={() => onSelect(roomId)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  )
}
