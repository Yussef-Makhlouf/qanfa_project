"use client"

import React from 'react';
import ApartmentDesignCustomizer from '../components/ApartmentDesignCustomizer';

// Sample areas for demonstration
const sampleAreas = [
  {
    id: 'living-room',
    x: 20,
    y: 30,
    width: 30,
    height: 25,
    label: 'غرفة المعيشة'
  },
  {
    id: 'kitchen',
    x: 50,
    y: 30,
    width: 20,
    height: 25,
    label: 'المطبخ'
  },
  {
    id: 'bedroom',
    x: 20,
    y: 55,
    width: 25,
    height: 25,
    label: 'غرفة النوم'
  },
  {
    id: 'bathroom',
    x: 45,
    y: 55,
    width: 15,
    height: 25,
    label: 'الحمام'
  }
];

export default function ApartmentCustomizerPage() {
  const handleAreaSelect = (area: any) => {
    console.log('Selected area:', area);
    // Here you would typically handle the selection and show customization options
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-[150px]">
      <div className="container mx-auto px-4">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">تخصيص تصميم الشقة</h1>
          <p className="text-gray-600">اختر المنطقة التي ترغب في تخصيصها</p>
        </div>

        {/* Apartment customizer component */}
        <ApartmentDesignCustomizer
          imageUrl="/images/apartment-layout.jpg"
          initialAreas={sampleAreas}
          onAreaSelect={handleAreaSelect}
        />

        {/* Instructions section */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">تعليمات التخصيص</h2>
          <ul className="space-y-2 text-gray-600 list-disc list-inside">
            <li>انقر على المنطقة التي ترغب في تخصيصها في مخطط الشقة</li>
            <li>سيتم عرض خيارات التخصيص المتاحة للمنطقة المحددة</li>
            <li>يمكنك تغيير اختياراتك في أي وقت بالنقر على منطقة مختلفة</li>
            <li>سيتم حفظ تفضيلاتك تلقائياً عند الانتهاء</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 