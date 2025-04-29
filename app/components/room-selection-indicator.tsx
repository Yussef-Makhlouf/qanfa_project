"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type RoomSelectionIndicatorProps = {
  roomName: string
  isVisible: boolean
}

export default function RoomSelectionIndicator({ roomName, isVisible }: RoomSelectionIndicatorProps) {
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowIndicator(true)
      const timer = setTimeout(() => {
        setShowIndicator(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, roomName])

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-10"
        >
          <p className="text-sm font-medium">{roomName} تم اختيار</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
