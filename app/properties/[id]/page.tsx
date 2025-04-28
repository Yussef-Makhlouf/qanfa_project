"use client"

import { useAuth } from "@/contexts/auth-context"
import LoggedInHeader from "@/components/LoggedInHeader"
import { MapPinIcon, HomeIcon, RulerIcon, BedIcon, BathIcon, Heart, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import HeaderContainer from "./properties_hero"
import Header from "@/components/Header"

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
      {/* {isLoggedIn && <LoggedInHeader />} */}
      <main className="min-h-screen" dir="rtl">
        <div className="pb-4">
          <Header />
        </div>
        <HeaderContainer />
        {/* <div className="container mx-auto px-4 pt-[120px]">

          <div className="mb-6">
            <Link href="/projects/1" className="flex items-center gap-2 text-[#375A64] hover:text-[#FF735D] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">العودة إلى المشروع</span>
            </Link>
          </div>
          

          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-12 max-w-7xl mx-auto mb-10">

            <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden h-[450px] relative">
              <img 
                src="/example.png"
                alt="صورة العقار" 
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-full">
                <Heart className="w-5 h-5 text-[#FF735D]" />
              </div>
            </div>
            

            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#375A64] text-sm font-medium">
                  <span className="bg-[#F8F8F8] px-3 py-1 rounded-full">مشروع الفلاح للإسكان</span>
                </div>
                <h1 className="text-3xl font-bold">شقة رقم {propertyId}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPinIcon className="w-5 h-5" />
                  <span>شمال الرياض - حي الياسمين</span>
                </div>
                <div className="mt-2 text-2xl font-bold text-[#FF735D]">
                  1,200,000 ريال
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <div className="flex flex-col items-center gap-2 p-3 bg-[#F8F8F8] rounded-lg hover:bg-[#F0F0F0] transition-colors">
                  <HomeIcon className="w-6 h-6 text-[#375A64]" />
                  <span className="text-sm font-medium">شقة سكنية</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 p-3 bg-[#F8F8F8] rounded-lg hover:bg-[#F0F0F0] transition-colors">
                  <RulerIcon className="w-6 h-6 text-[#375A64]" />
                  <span className="text-sm font-medium">180 متر مربع</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 p-3 bg-[#F8F8F8] rounded-lg hover:bg-[#F0F0F0] transition-colors">
                  <BedIcon className="w-6 h-6 text-[#375A64]" />
                  <span className="text-sm font-medium">3 غرف نوم</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 p-3 bg-[#F8F8F8] rounded-lg hover:bg-[#F0F0F0] transition-colors">
                  <BathIcon className="w-6 h-6 text-[#375A64]" />
                  <span className="text-sm font-medium">2 حمام</span>
                </div>
              </div>
              
              <div className="mt-6 bg-[#F8F8F8] p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-3">وصف العقار</h2>
                <p className="text-gray-700 leading-relaxed">
                  شقة فاخرة في مشروع الفلاح للإسكان، توفر مساحة واسعة وتصميم عصري يلبي احتياجات العائلة.
                  تتميز بموقعها الاستراتيجي في حي الياسمين شمال الرياض، مع إطلالة رائعة وقريبة من الخدمات الأساسية.
                  تشمل غرفة معيشة واسعة، 3 غرف نوم، مطبخ مجهز بالكامل، و2 حمام. التشطيبات عالية الجودة
                  مع نوافذ كبيرة تتيح دخول الإضاءة الطبيعية.
                </p>
              </div>
              
              <div className="mt-6 flex gap-4">
                <Button className="flex-1 bg-[#FF735D] hover:bg-[#FF3C3F] text-white py-6 text-lg font-medium">
                  تواصل مع المالك
                </Button>
                
                <Button variant="outline" className="w-14 h-14 p-0 border-gray-300 hover:bg-[#F8F8F8]">
                  <Heart className="w-6 h-6 text-[#FF735D]" />
                </Button>
                
                <Button variant="outline" className="w-14 h-14 p-0 border-gray-300 hover:bg-[#F8F8F8]">
                  <Share2 className="w-6 h-6 text-[#375A64]" />
                </Button>
              </div>
            </div>
          </div>
          

          <div className="max-w-7xl mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-6">معلومات إضافية</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#F8F8F8] p-5 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">مميزات العقار</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>موقع استراتيجي في حي الياسمين</li>
                  <li>قريب من المرافق الخدمية الرئيسية</li>
                  <li>تشطيبات عالية الجودة</li>
                  <li>نوافذ كبيرة للإضاءة الطبيعية</li>
                  <li>مساحات واسعة ومريحة</li>
                </ul>
              </div>
              
              <div className="bg-[#F8F8F8] p-5 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">المرافق القريبة</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>مدارس ومراكز تعليمية</li>
                  <li>مراكز تسوق ومطاعم</li>
                  <li>مستشفيات ومراكز صحية</li>
                  <li>حدائق ومساحات خضراء</li>
                  <li>مساجد</li>
                </ul>
              </div>
              
              <div className="bg-[#F8F8F8] p-5 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">معلومات التواصل</h3>
                <div className="space-y-3 text-gray-700">
                  <p><strong>الهاتف:</strong> +966 12 345 6789</p>
                  <p><strong>البريد الإلكتروني:</strong> info@alfalah.sa</p>
                  <p><strong>ساعات العمل:</strong> 9 صباحاً - 5 مساءً</p>
                  <p><strong>أيام العمل:</strong> الأحد - الخميس</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </main>
    </>
  )
}
