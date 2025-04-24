import React from "react"

interface PlatformLogoProps {
  className?: string
}

export function PlatformLogo({ className = "" }: PlatformLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-8 text-[#FF735D]"
      >
        <path
          d="M12 2L4 10l8 8 8-8-8-8z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="mr-1 font-bold text-gray-900">منصة قنفه</span>
    </div>
  )
}
