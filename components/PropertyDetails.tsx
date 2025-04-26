import React from 'react';
import Image from 'next/image';

export default function PropertyDetails() {
  return (
    <div className="flex flex-col justify-center items-center gap-[60px] w-full max-w-[684px] mx-auto px-4 md:px-0 py-8 md:py-0 md:absolute md:left-[30px] md:top-[210px]">
      {/* Image Container */}
      <div className="flex flex-col justify-center items-center gap-5 w-full">
        {/* Property Image */}
        <div className="relative w-full h-[442px] bg-[#F2F2F2] rounded-[32px]">
          <div className="absolute inset-[14px] overflow-hidden rounded-[20px] bg-[#F2F2F2]">
            <Image
              src="/images/property.png"
              alt="Property"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* Image Navigation */}
        <div className="flex flex-row justify-center items-center gap-[10px] w-full">
          {/* Navigation Buttons */}
          {[1, 2, 3, 4].map((index) => (
            <button
              key={index}
              className="flex justify-center items-center px-[22px] py-[10px] gap-2 w-[90.5px] h-[44px] bg-[#F8F8F8] border-[0.5px] border-[#375A64] rounded-[14px] backdrop-blur-[40px]"
            >
              <div className="w-6 h-6" />
            </button>
          ))}
        </div>
      </div>

      {/* Property Info */}
      <div className="flex flex-col items-end gap-10 w-full">
        {/* Location Info */}
        <div className="flex flex-row justify-end items-center gap-[13px]">
          <h2 className="text-right text-[20px] font-semibold leading-[30px] text-[#375A64]">
            شمال الرياض - حي الياسمين
          </h2>
          <div className="w-6 h-6">
            {/* Location Icon */}
          </div>
        </div>

        {/* Rating Container */}
        <div className="flex flex-col items-end gap-10 w-full">
          <h1 className="text-right text-[28px] font-semibold leading-[42px] text-black w-full">
            مشروع الفلاح للإسكان
          </h1>
          <p className="text-right text-[22px] font-medium leading-[180%] text-[#595959] w-full">
            مشروع سكني متكامل يقع في حي الياسمين شمال مدينة الرياض على مساحة 2.5 مليون متر مربع
          </p>
        </div>

        {/* Additional Info Container */}
        <div className="flex flex-col items-end gap-5 w-full">
          <h3 className="text-right text-[22px] font-medium leading-[33px] text-black w-full">
            معلومات إضافية
          </h3>
          
          {/* Additional Info Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {/* Info Items */}
            {[
              { label: 'المساحة', value: '250م²' },
              { label: 'الغرف', value: '4 غرف' },
              { label: 'دورات المياه', value: '3' },
              { label: 'الصالات', value: '2' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col justify-center items-end gap-[10px]">
                <span className="text-[16px] font-normal leading-6 text-[#595959]">
                  {item.label}
                </span>
                <div className="flex flex-row justify-center items-center px-[22px] py-[10px] gap-2 w-full h-[68px] bg-[#F8F8F8] rounded-[18px] backdrop-blur-[40px]">
                  <span className="text-[18px] font-normal leading-[27px] text-right text-black">
                    {item.value}
                  </span>
                  <div className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 