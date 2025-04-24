import React from "react"
import { cn } from "@/lib/utils"

interface BottomBorderInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  showIcon?: boolean
}

export const BottomBorderInput = React.forwardRef<HTMLInputElement, BottomBorderInputProps>(
  ({ className, icon, showIcon = true, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          className={cn(
            "w-full rounded-none border-0 border-b border-[#0000001A] bg-transparent py-2 text-right text-[#375A64] placeholder-[#5A5A5A] focus:border-b-[#FF735D] focus:outline-none transition-all duration-200",
            showIcon ? "pr-8" : "pr-0",
            className,
          )}
          {...props}
        />
        {showIcon && icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">{icon}</div>
        )}
      </div>
    )
  },
)

BottomBorderInput.displayName = "BottomBorderInput"
