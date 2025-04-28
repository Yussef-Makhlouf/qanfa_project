import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, MapPin } from "lucide-react";
import React from "react";
// import NotificationItem from "@app/NotificationItem";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useFavorites } from "@/contexts/favorites-context";
import { useNotifications } from "@/app/context/NotificationContext";
import NotificationItem from "./NotificationItem";

export default function PropertyList() {
    // Data for apartments to enable mapping
    const apartments = [
        { id: "4", image: "/example.png" },
        { id: "3", image: "/example.png" },
        { id: "2", image: "/example.png" },
        { id: "1", image: "/example.png" },
        { id: "8", image: "/example.png" },
        { id: "7", image: "/example.png" },
        { id: "6", image: "/example.png" },
        { id: "5", image: "/example.png" },
    ];

    // Project name used in all cards
    const projectName = "مشـــروع الفـــلاح للإسكــــان";

    return (
        <section className="container mx-auto px-4 py-20 max-w-[1700px]">
            {/* Notification placed above the title */}
            <div className="w-full flex justify-center mb-10">
                <NotificationItem 
                    stepNumber={1}
                    title="الخطــوه الاولــى : اختيــار الشقــه"
                    subtitle="رسالـــة توجيــــــــه !"
                    content="تم اختيــار هــذه الشقــة بنـاء علـى مسحـك لرمـز الـqr. يمكنـك
                            الضغـط عليهـا للاطـلاع علـى التفاصيـل"
                />
            </div>
            
            {/* Section Title */}
            <h2 className="text-center  text-2xl md:text-3xl lg:text-[44px] font-semibold text-[#375A64] mb-16">
                الشقــق السكنيـــه
            </h2>

            {/* Apartments grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-8">
                {apartments.map((apartment) => (
                    <ApartmentCard 
                        key={apartment.id} 
                        id={apartment.id} 
                        image={apartment.image}
                    />
                ))}
            </div>
        </section>
    );
}

// Apartment card component
function ApartmentCard({ id, image }: { id: string; image: string }) {
    const { isLoggedIn } = useAuth();
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();
    const { addNotification } = useNotifications();
    
    const isFavorited = isFavorite(id);
    
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!isLoggedIn) {
            addNotification({
                stepNumber: 1,
                title: "تسجيل الدخول مطلوب",
                subtitle: "المفضلة",
                content: "يرجى تسجيل الدخول لإضافة هذه الشقة إلى المفضلة",
                durationInSeconds: 5
            });
            return;
        }
        
        if (isFavorited) {
            removeFavorite(id);
            addNotification({
                stepNumber: 1,
                title: "تمت إزالة الشقة",
                subtitle: "المفضلة",
                content: "تمت إزالة الشقة من المفضلة بنجاح",
                durationInSeconds: 3
            });
        } else {
            addFavorite({ id, type: "property" });
            addNotification({
                stepNumber: 1,
                title: "تمت إضافة الشقة",
                subtitle: "المفضلة",
                content: "تمت إضافة الشقة إلى المفضلة بنجاح",
                durationInSeconds: 3
            });
        }
    };
    
    return (
        <div className="flex flex-col gap-5 w-full">
            {/* Image container */}
            <div className="bg-[#F8F8F8] rounded-[20px] p-2.5">
                <div className="relative aspect-[379/326] w-full rounded-[20px] overflow-hidden bg-[#F2F2F2]">
                    {image && (
                        <Image
                            src={image}
                            alt={`شقة ${id}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                            className="rounded-[20px] transition-transform hover:scale-105 duration-300"
                        />
                    )}
                    <button 
                        className={`absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-[18px] ${isFavorited ? 'bg-[#FF735D]' : 'bg-[#F8F8F8]/80'} backdrop-blur-sm transition-opacity hover:bg-white`}
                        aria-label="Add to favorites"
                        onClick={handleFavoriteClick}
                    >
                        <Heart className={`w-6 h-6 ${isFavorited ? 'text-white' : 'text-black'}`} />
                    </button>
                </div>
            </div>

            {/* Content container */}
            <div className="flex flex-col gap-6">
                {/* Title and units */}
                <div className="space-y-2.5" dir="rtl">
                    <h3 className=" text-xl lg:text-2xl font-semibold text-right">
                        شقه {id}
                    </h3>
                    <div className="flex items-center justify-start gap-2.5">
                        <span className=" text-sm font-semibold text-[#818181]">
                            20 وحـــدات سكنيـــه
                        </span>
                        <MapPin className="w-3 h-3 text-[#375A64]" />
                    </div>
                </div>

                {/* View more button */}
                <Link href={`/properties/${id}`}>
                    <div className="group flex items-center justify-start gap-4 cursor-pointer transition-colors hover:text-[#FF735D]" dir="rtl">
                        <Link href={`/properties/${id}`}>
                        <span className=" text-base font-black text-[#FF735D]">
                            رؤيــــة المزيـــد
                        </span>
                        </Link>
                      
                        <ArrowLeft 
                            className="w-5 h-5 transition-transform group-hover:translate-x-2" 
                        />
                    </div>
                </Link>
            </div>
        </div>
    );
} 