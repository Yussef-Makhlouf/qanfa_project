import type React from "react"
import { cn } from "@/lib/utils"

interface DottedBorderContainerProps {
  children: React.ReactNode
  className?: string
}

export const DottedBorderContainer: React.FC<DottedBorderContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("border border-dashed border-[#0000001A] rounded-xl p-4 md:p-6", className)}>{children}</div>
  )
}
