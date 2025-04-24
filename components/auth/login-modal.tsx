"use client"

import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import LoginForm from "./login-form"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-none bg-transparent p-0 shadow-none">
        <LoginForm />
      </DialogContent>
    </Dialog>
  )
} 