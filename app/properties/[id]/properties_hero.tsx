import { Card, CardContent } from "@/components/ui/card";
import {
    Building2,
    Home,
    LayoutDashboard,
    Maximize,
    UtensilsCrossed,
} from "lucide-react";
import React from "react";

export default function HeaderContainer() {
    // Property details data
    const propertyDetails = [
        {
            label: "المساحه",
            value: "250 M",
            icon: <Maximize className="w-5 h-5 text-gray-700" />,
        },
        {
            label: "عدد الغرف",
            value: "3",
            icon: <Building2 className="w-5 h-5 text-gray-700" />
        },
        {
            label: "الصاله",
            value: "1",
            icon: <LayoutDashboard className="w-5 h-5 text-gray-700" />,
        },
        {
            label: "الدور",
            value: "2",
            icon: <Home className="w-5 h-5 text-gray-700" />
        },
        {
            label: "المطبخ",
            value: "1",
            icon: <UtensilsCrossed className="w-5 h-5 text-gray-700" />,
        },
    ];

    return (
        <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12 max-w-[1920px]">
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
                {/* Main content section */}
                <div className="flex flex-col-reverse lg:flex-row items-start gap-8 lg:gap-16 w-full">
                    {/* Property image */}
                    <div className="w-full lg:w-[650px] aspect-[16/9] lg:aspect-auto lg:h-[590px] relative rounded-2xl overflow-hidden shadow-lg">
                        <img
                            className="w-full h-full object-cover"
                            alt="Apartment interior"
                            src="/example.png"
                        />
                    </div>

                    {/* Property information */}
                    <div className="flex flex-col w-full lg:w-[780px] items-start gap-8 lg:gap-12">
                        {/* Header with project name */}
                        <div className="flex items-center justify-start gap-4 w-full">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#375A64]">
                                <path d="M15 22.0001C14.7348 22.0001 14.4804 21.8948 14.2929 21.7073C14.1054 21.5197 14 21.2654 14 21.0001V17.0001C14 16.8356 14.0406 16.6735 14.1182 16.5284C14.1958 16.3832 14.3081 16.2595 14.445 16.1681L17.445 14.1681C17.6093 14.0585 17.8025 14 18 14C18.1975 14 18.3907 14.0585 18.555 14.1681L21.555 16.1681C21.6919 16.2595 21.8042 16.3832 21.8818 16.5284C21.9594 16.6735 22 16.8356 22 17.0001V21.0001C22 21.2654 21.8946 21.5197 21.7071 21.7073C21.5196 21.8948 21.2652 22.0001 21 22.0001H15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 14.993 7.539 20.193 9.399 21.799C9.57237 21.929 9.78329 21.9992 10 21.999" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18 22V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <h1 className="text-[#375A64] font-semibold text-xl lg:text-2xl">
                                مشـــروع الفـــلاح للإسكــــان
                            </h1>
                        </div>

                        {/* Property title and ID */}
                        <div className="flex flex-col items-start gap-6 lg:gap-8 w-full">
                            <div className="space-y-3 lg:space-y-4 w-full">
                                <div className="text-red-400 font-medium text-base lg:text-lg">
                                    #210MQ0
                                </div>
                                <h2 className="font-semibold text-gray-900 text-3xl lg:text-[42px] leading-tight">
                                    شقــــه رقــم 6
                                </h2>
                            </div>

                            {/* Property description */}
                            <p className="text-gray-600 font-medium text-lg lg:text-2xl leading-relaxed lg:leading-[1.8]">
                                تقدم شقة في مشروع الفلاح للإسكان تصميما عصريا يضمن الراحة
                                والخصوصية. تحتوي الشقة على غرفتي نوم spacious، وصالة واسعة مع
                                نوافذ كبيرة تسمح بدخول الضوء الطبيعي. كما تضم مطبخا مجهزا بأحدث
                                الأجهزة.
                            </p>
                        </div>

                        {/* Property specifications */}
                        <div className="flex flex-col items-start gap-6 lg:gap-8 w-full">
                            <h3 className="font-medium text-gray-900 text-xl lg:text-2xl">
                                معلومــات الشقــه :
                            </h3>

                            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 w-full">
                                {propertyDetails.map((detail, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-start gap-3"
                                    >
                                        <div className="font-medium text-gray-600 text-base">
                                            {detail.label}
                                        </div>
                                        <Card className="w-full border-0">
                                            <CardContent className="flex items-center justify-between gap-3 p-4 lg:p-5 h-[60px] lg:h-[68px] bg-gray-100/80 rounded-2xl backdrop-blur-xl">
                                                <span className="font-medium text-gray-900 text-lg">
                                                    {detail.value}
                                                </span>
                                                {detail.icon}
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
