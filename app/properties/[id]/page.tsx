"use client"

import { useAuth } from "@/contexts/auth-context"
import LoggedInHeader from "@/components/LoggedInHeader"
import { MapPinIcon, HomeIcon, RulerIcon, BedIcon, BathIcon, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const { isLoggedIn } = useAuth()
  const propertyId = params.id

  return (
    <>
      {isLoggedIn && <LoggedInHeader />}
      <main className="min-h-screen">
        <div className="container mx-auto pt-[120px] px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="rounded-2xl overflow-hidden">
              <img 
                src="/images/property-interior.jpg"
                alt="صورة العقار" 
                className="w-full h-[400px] object-cover"
              />
            </div>
            
            {/* Property Details */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">شقة {propertyId} - مشروع الفلاح للإسكان</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPinIcon className="w-5 h-5" />
                  <span>شمال الرياض - حي الياسمين</span>
                </div>
                <div className="mt-2 text-2xl font-bold text-[#FF735D]">
                  1,200,000 ريال
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="flex flex-col items-center gap-2 p-3 bg-[#F8F8F8] rounded-lg">
                  <HomeIcon className="w-6 h-6 text-[#375A64]" />
                  <span className="text-sm font-medium">شقة سكنية</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 p-3 bg-[#F8F8F8] rounded-lg">
                  <RulerIcon className="w-6 h-6 text-[#375A64]" />
                  <span className="text-sm font-medium">180 متر مربع</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 p-3 bg-[#F8F8F8] rounded-lg">
                  <BedIcon className="w-6 h-6 text-[#375A64]" />
                  <span className="text-sm font-medium">3 غرف نوم</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 p-3 bg-[#F8F8F8] rounded-lg">
                  <BathIcon className="w-6 h-6 text-[#375A64]" />
                  <span className="text-sm font-medium">2 حمام</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-3">وصف العقار</h2>
                <p className="text-gray-700 leading-relaxed">
                  شقة فاخرة في مشروع الفلاح للإسكان، توفر مساحة واسعة وتصميم عصري يلبي احتياجات العائلة.
                  تتميز بموقعها الاستراتيجي في حي الياسمين شمال الرياض، مع إطلالة رائعة وقريبة من الخدمات الأساسية.
                  تشمل غرفة معيشة واسعة، 3 غرف نوم، مطبخ مجهز بالكامل، و2 حمام. التشطيبات عالية الجودة
                  مع نوافذ كبيرة تتيح دخول الإضاءة الطبيعية.
                </p>
              </div>
              
              <div className="mt-6 flex gap-4">
                <Button className="flex-1 bg-[#FF735D] hover:bg-[#FF3C3F]">
                  تواصل مع المالك
                </Button>
                
                <Button variant="outline" className="w-12 h-12 p-0 border-gray-300">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
} 