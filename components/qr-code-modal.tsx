"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function QRCodeModal({ isOpen, onClose }: QRCodeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex w-[562px] flex-col items-center justify-center gap-[50px] p-[50px] rounded-[20px]">
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-xl font-semibold text-[#375A64]">رفع ال QR CODE !</h3>
          <p className="text-sm text-[#6A6A6A]">إرفع صورة ال QR CODE الخاص بك</p>
        </div>

        <div className="relative w-[412px] h-[412px] border-2 border-dashed border-[#0000001A] rounded-[20px] flex items-center justify-center">
        <svg width="196" height="188" viewBox="0 0 196 188" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_87_2431)">
<path d="M79.75 22H23.5V76H79.75V22ZM70.375 67H32.875V31H70.375V67Z" fill="#FF735D"/>
<path d="M42.25 40H61V58H42.25V40ZM23.5 166H79.75V112H23.5V166ZM32.875 121H70.375V157H32.875V121Z" fill="#FF735D"/>
<path d="M42.25 130H61V148H42.25V130ZM117.25 22V76H173.5V22H117.25ZM164.125 67H126.625V31H164.125V67Z" fill="#FF735D"/>
<path d="M136 40H154.75V58H136V40ZM42.25 85H23.5V103H51.625V94H42.25V85ZM89.125 103H107.875V121H89.125V103ZM51.625 85H70.375V94H51.625V85ZM107.875 130H89.125V139H98.5V148H107.875V139V130ZM79.75 85V94H70.375V103H89.125V85H79.75ZM98.5 58H107.875V76H98.5V58ZM107.875 94V103H126.625V85H98.5V94H107.875ZM89.125 76H98.5V85H89.125V76ZM107.875 148H126.625V166H107.875V148ZM89.125 148H98.5V166H89.125V148ZM107.875 121H117.25V130H107.875V121ZM107.875 49V31H98.5V22H89.125V58H98.5V49H107.875ZM136 148H145.375V166H136V148ZM136 130H154.75V139H136V130ZM126.625 139H136V148H126.625V139ZM117.25 130H126.625V139H117.25V130ZM154.75 112V121H164.125V130H173.5V112H164.125H154.75ZM164.125 139H154.75V166H173.5V148H164.125V139ZM117.25 112V121H145.375V103H126.625V112H117.25ZM136 85V94H154.75V103H173.5V85H154.75H136Z" fill="#FF735D"/>
</g>
<path d="M154.5 3H184.5C188.918 3 192.5 6.58172 192.5 11V41" stroke="#375A64" stroke-width="6" stroke-linecap="round"/>
<path d="M42.5 3H12.5C8.08172 3 4.5 6.58172 4.5 11V41" stroke="#375A64" stroke-width="6" stroke-linecap="round"/>
<path d="M42.5 185L11.5 185C7.08173 185 3.5 181.418 3.5 177L3.5 147" stroke="#375A64" stroke-width="6" stroke-linecap="round"/>
<path d="M154.5 185L184.5 185C188.918 185 192.5 181.418 192.5 177L192.5 147" stroke="#375A64" stroke-width="6" stroke-linecap="round"/>
<defs>
<clipPath id="clip0_87_2431">
<rect width="150" height="144" fill="white" transform="translate(23.5 22)"/>
</clipPath>
</defs>
</svg>


        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="h-[53px] w-[209px] rounded-[12px] border-[#0000001A] text-[#5A5A5A]"
            onClick={onClose}
          >
            إلغاء
          </Button>
          <Button
            className="h-[53px] w-[209px] rounded-[12px] bg-[#FF735D] text-white hover:bg-[#FF735D]/90"
          >
            موافقة
          </Button>
        </div>

        <button
          onClick={onClose}
          className="absolute left-1/2 -bottom-16 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-[#0000001A] text-[#5A5A5A] hover:bg-[#F8F8F8] transition-colors duration-200"
        >
          <X className="h-4 w-4" />
        </button>
      </DialogContent>
    </Dialog>
  )
} 