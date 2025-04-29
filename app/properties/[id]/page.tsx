"use client"

import { useAuth } from "@/contexts/auth-context"
import LoggedInHeader from "@/components/LoggedInHeader"
import { MapPinIcon, HomeIcon, RulerIcon, BedIcon, BathIcon, Heart, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import HeaderContainer from "./properties_hero"
import Header from "@/components/Header"
import ApartmentCustomizer from "@/app/components/apartment-customizer"
import { useMediaQuery } from "@/hooks/use-media-query"
import Footer from "@/components/footer"


interface PropertyPageProps {
  params: {
    id: string
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const { isLoggedIn } = useAuth()
  const propertyId = params.id

  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')

  return (
    <>
      {/* {isLoggedIn && <LoggedInHeader />} */}
      <main className="min-h-screen" dir="rtl">
        <div className="pb-4">
          <Header />
        </div>
        <HeaderContainer />
        <ApartmentCustomizer />
        <Footer />
      </main>
    </>
  )
}
