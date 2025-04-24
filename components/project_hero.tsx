import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    BuildingIcon,
    CompassIcon,
    HeartIcon,
    HomeIcon,
    MapPinIcon,
    Share2Icon,
    UsersIcon,
} from "lucide-react";
import React from "react";
import { useAuth } from "@/contexts/auth-context";
import { useFavorites } from "@/contexts/favorites-context";
import { useNotifications } from "@/app/context/NotificationContext";

export default function ProjectHero() {
    const { isLoggedIn } = useAuth();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const { addNotification } = useNotifications();
    
    // Assuming the project ID is "1" for demonstration
    const projectId = "1";
    const isFavorited = isFavorite(projectId);
    
    const handleFavoriteClick = () => {
        if (!isLoggedIn) {
            addNotification({
                stepNumber: 1,
                title: "تسجيل الدخول مطلوب",
                subtitle: "المفضلة",
                content: "يرجى تسجيل الدخول لإضافة هذا المشروع إلى المفضلة",
                durationInSeconds: 5
            });
            return;
        }
        
        if (isFavorited) {
            removeFavorite(projectId);
            addNotification({
                stepNumber: 1,
                title: "تمت إزالة المشروع",
                subtitle: "المفضلة",
                content: "تمت إزالة المشروع من المفضلة بنجاح",
                durationInSeconds: 3
            });
        } else {
            addFavorite({ id: projectId, type: "project" });
            addNotification({
                stepNumber: 1,
                title: "تمت إضافة المشروع",
                subtitle: "المفضلة",
                content: "تمت إضافة المشروع إلى المفضلة بنجاح",
                durationInSeconds: 3
            });
        }
    };

    // Data for the additional information cards
    const additionalInfoCards = [
        {
            title: "الواجهـــه :",
            value: "جنوبيــه شرقيــه",
            icon: <CompassIcon className="w-5 h-5" />,
        },
        {
            title: "عـــدد الشـــقق :",
            value: "25 شقـــه",
            icon: <BuildingIcon className="w-5 h-5" />,
        },
        {
            title: "الغـــرض :",
            value: "سكنـــي",
            icon: <HomeIcon className="w-5 h-5" />,
        },
        {
            title: "نــوع البنــاء :",
            value: "شــقق",
            icon: <BuildingIcon className="w-5 h-5" />,
        },
    ];

    // Data for the image navigation buttons
    const imageNavButtons = [1, 2, 3, 4].map((num) => ({
        id: num,
        isActive: num === 1,
    }));

    return (
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-[100px] max-w-[1530px] mx-auto px-4 relative">
            {/* Left side - Logo/Icon section */}
            <div className="flex items-center gap-2 w-[104px] h-12 order-1 lg:order-none">
                <button 
                    className={`flex justify-center items-center w-12 h-12 p-2.5 ${isFavorited ? 'bg-[#FF735D]' : 'bg-[#F8F8F8]'} rounded-[18px] backdrop-blur-[22.5px]`} 
                    aria-label="Like"
                    onClick={handleFavoriteClick}
                >
                    <HeartIcon className={`w-6 h-6 ${isFavorited ? 'text-white' : 'text-black'}`} />
                </button>
                <button className="flex justify-center items-center w-12 h-12 p-2.5 bg-[#F8F8F8] rounded-[18px] backdrop-blur-[40px]" aria-label="Share">
                    <Share2Icon className="w-[18px] h-[18px] text-[#1C274C]" />
                </button>
            </div>

            {/* Main content section */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-6 lg:gap-[100px] flex-1 w-full order-2 lg:order-none">
                {/* Right side - Property information */}
                <div className="flex flex-col w-full lg:w-[780px] items-end gap-8 lg:gap-10">
                    {/* Location */}
                    <div className="flex items-center justify-end gap-[13px] w-full lg:w-[247px] h-[30px]">
                        <div className="font-['The Year of Handicrafts'] font-semibold text-[#375A64] text-lg lg:text-xl text-right w-full lg:w-[210px] h-[30px]">
                            شمال الرياض - حي الياسمين
                        </div>
                        <MapPinIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#375A64]" />
                    </div>

                    {/* Title and description */}
                    <div className="flex flex-col items-end gap-6 lg:gap-10 w-full">
                        <h1 className="w-full  font-semibold text-black text-2xl md:text-3xl lg:text-[38px] leading-normal lg:leading-[57px] text-right">
                            مشـــروع الفـــلاح للإسكــــان
                        </h1>
                        <p className="w-full  font-medium text-[#595959] text-base md:text-lg lg:text-[22px] leading-[180%] text-right">
                            مشروع الفلاح للإسكان هو مجتمع سكني حديث يوفر شققا مريحة ومرافق
                            متكاملة، مصمم لتلبية احتياجات العائلات في بيئة هادئة ومناسبة.
                        </p>
                    </div>

                    {/* Additional information section */}
                    <div className="flex flex-col items-end gap-4 lg:gap-5 w-full">
                        <h2 className="w-full  font-medium text-black text-lg md:text-xl lg:text-[22px] leading-normal lg:leading-[33px] text-right">
                            معلومـــات اضافيــه :
                        </h2>

                        <div className="flex flex-row flex-wrap sm:flex-nowrap gap-4 lg:gap-2.5 w-full overflow-x-auto">
                            {additionalInfoCards.map((card, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-end justify-center gap-2.5 min-w-[200px] sm:min-w-0 flex-1"
                                >
                                    <div className=" font-normal text-[#595959] text-sm lg:text-base text-center w-full">
                                        {card.title}
                                    </div>
                                    <div className="flex flex-row justify-center items-center gap-2 w-full h-[68px] px-4 lg:px-[22px] py-2.5 bg-[#F8F8F8] backdrop-blur-[40px] rounded-[18px]">
                                        <div className=" font-normal text-black text-base lg:text-lg text-right">
                                            {card.value}
                                        </div>
                                        <div className="flex-none">
                                            {card.icon}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Image gallery - responsive for all screens */}
                <div className="flex flex-col w-full lg:w-[650px] items-center justify-center gap-5">
                    <div className="w-full h-[250px] sm:h-[350px] lg:h-[442px] bg-[#F2F2F2] rounded-[32px] overflow-hidden">
                        <img
                            src="/images/property-interior.jpg"
                            alt="Property Interior"
                            className="w-full h-full object-cover rounded-[20px]"
                        />
                    </div>

                    <div className="flex items-center justify-center gap-2.5 w-full">
                        {imageNavButtons.map((button) => (
                            <Badge
                                key={button.id}
                                variant="outline"
                                className={`w-[60px] sm:w-[70px] lg:w-[90.5px] h-9 sm:h-10 lg:h-11 flex items-center justify-center rounded-full cursor-pointer border-[0.5px] border-[#375A64] backdrop-blur-[40px] ${
                                    button.isActive ? "bg-[#FF735D] text-white border-none" : "bg-[#F8F8F8]"
                                }`}
                            >
                                {button.id}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
