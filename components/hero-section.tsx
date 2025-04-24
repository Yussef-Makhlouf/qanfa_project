"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlatformLogo } from "./ui/platform-logo";
import { Button } from "./ui/button";
import { QRCodeModal } from "./qr-code-modal";
import { useAuth } from "@/contexts/auth-context";
import { motion, AnimatePresence } from "framer-motion";
import { UserMenu } from "./user-menu";
import { LoginModal } from "./auth/login-modal";
import { cn } from "@/lib/utils";
import React from "react";

export default function HeroSection() {
  const { isLoggedIn, login } = useAuth();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSmallDesktop, setIsSmallDesktop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallMobile(window.innerWidth < 480);
      setIsMobile(window.innerWidth >= 480 && window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
      setIsSmallDesktop(window.innerWidth >= 1024 && window.innerWidth < 1280);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = () => {
    setIsLoginModalOpen(true);
  };

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "مشاريع", href: "/projects" },
  ];

  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      style={{ minHeight: isSmallMobile || isMobile ? "100vh" : isTablet ? "90vh" : "995px" }}
      dir="rtl"
    >
      
      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "flex flex-col rounded-[20px] sm:rounded-[30px] bg-[#F8F8F8]",
          isSmallMobile ? "w-full min-h-screen px-3 py-6 mx-auto" : 
          isMobile ? "w-full min-h-screen px-4 py-8 mx-auto" : 
          isTablet ? "md:absolute md:right-[20px] md:top-[20px] w-[95%] h-[95vh]" : 
          isSmallDesktop ? "md:absolute md:right-[20px] md:top-[20px] w-[90%] h-[95vh]" : 
          "md:absolute md:right-[20px] md:top-[20px] w-[1020px] h-[955px]"
        )}
      >
        {/* Logo and Navigation */}
        <div className={cn(
          "flex items-center",
          isSmallMobile ? "mx-2 mt-2 gap-2" :
          isMobile ? "mx-4 mt-3 gap-3" : 
          isTablet ? "absolute right-[20px] top-[20px] gap-5" : 
          "absolute right-[40px] top-[30px] h-[72px] gap-[50px]"
        )}>
          {isLoggedIn && (
            <div className={cn(
              "flex items-center",
              isSmallMobile ? "h-[32px] gap-1" :
              isMobile ? "h-[36px] gap-2" : 
              isTablet ? "h-[40px] gap-3" : 
              "h-[44px] gap-[16px]"
            )}>
              {navLinks.map((link) => (
                <React.Fragment key={link.href}>
                  <Link href={link.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-[12px] sm:rounded-[18px] backdrop-blur-[40px] transition-colors",
                        pathname === link.href
                          ? "bg-white text-black"
                          : "bg-transparent text-black hover:bg-white/50",
                        isSmallMobile ? "h-[30px] min-w-[55px] px-1.5 py-0.5" :
                        isMobile ? "h-[34px] min-w-[65px] px-2 py-1" :
                        isTablet ? "h-[38px] min-w-[75px] px-3 py-1.5" : 
                        "h-[44px] min-w-[93px] px-[24px] py-[10px] gap-[8px]"
                      )}
                    >
                      <span className={cn(
                        "text-right  font-normal leading-tight",
                        isSmallMobile ? "text-[9px]" :
                        isMobile ? "text-[11px]" : 
                        isTablet ? "text-[13px]" :
                        "text-[14px] leading-[24px]"
                      )}>
                        {link.name}
                      </span>
                    </motion.div>
                  </Link>
                  {link.href !== "/projects" && (
                    <div className={cn(
                      "rounded-[40px] bg-black",
                      isSmallMobile ? "h-[2px] w-[2px]" : 
                      isMobile ? "h-[3px] w-[3px]" : 
                      "h-[4px] w-[4px]"
                    )}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
          <div className={cn(
            isSmallMobile ? "h-[36px] w-[50px]" :
            isMobile ? "h-[45px] w-[65px]" : 
            isTablet ? "h-[55px] w-[75px]" : 
            isSmallDesktop ? "h-[65px] w-[85px]" :
            "h-[72px] w-[95px]"
          )}>
            <svg width="100%" height="100%" viewBox="0 0 95 72" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <path d="M80.9144 47.9204C72.7899 42.174 62.8211 39.1865 53.0176 37.3662L49.309 36.7256C48.0663 36.5733 44.8998 36.1801 43.7033 36.0215C42.5001 35.9327 39.3006 35.679 38.0578 35.5775C33.0139 35.2731 27.9634 35.2604 22.8997 35.2921L23.7855 34.7784C20.6785 39.2309 17.5186 43.6391 14.1406 47.9204C16.6328 42.9161 19.3366 38.0258 22.1461 33.1863C24.9159 33.0024 27.6858 32.7614 30.4688 32.6218C32.7759 32.6472 35.949 32.5204 38.2165 32.6472C39.5121 32.7297 42.7778 32.9326 44.0272 33.0278C45.2501 33.18 48.5422 33.6113 49.8115 33.7762C56.1576 34.8862 62.5435 36.6177 68.3674 39.288C72.9684 41.508 77.5297 44.1465 80.9144 47.9141V47.9204Z" fill="#FF735D"/>
              <path d="M59.0522 38.0259C57.8821 28.201 65.3983 16.8349 71.3611 9.24267L71.6784 11.4182L70.0192 10.3209L69.1928 9.77546C67.2097 8.41178 64.7108 9.26804 63.5937 11.2406C62.2186 13.0927 60.2817 15.6678 58.9662 17.5199C56.7451 20.6151 54.2859 23.8119 52.5606 27.1101L52.2499 26.2411C54.6561 27.7887 57.5582 28.7719 60.4668 28.9558C57.1946 29.4442 53.843 28.7021 50.9277 27.2242C52.7258 22.0169 55.8989 17.4565 58.8803 12.839C60.0834 11.1518 61.0486 9.3061 62.536 7.81556C65.2265 5.41802 69.0606 5.6527 71.7974 7.85996C72.5246 8.37372 74.0715 9.37587 74.7986 9.87694L73.7608 11.1391C67.8575 18.4015 59.971 28.6894 59.0456 38.0259H59.0522Z" fill="#FF735D"/>
              <path d="M70.0259 3.81971C72.2206 3.81971 72.2206 0.546875 70.0259 0.546875C67.8312 0.546875 67.8312 3.81971 70.0259 3.81971Z" fill="#FF735D"/>
              <path d="M64.1958 3.81971C66.3906 3.81971 66.3906 0.546875 64.1958 0.546875C62.0011 0.546875 62.0011 3.81971 64.1958 3.81971Z" fill="#FF735D"/>
            </svg>
          </div>
        </div>

        {/* User Icon/Menu */}
        <div className={cn(
          isSmallMobile ? "fixed right-3 top-3 z-50" : 
          isMobile ? "fixed right-4 top-4 z-50" : 
          isTablet ? "absolute left-[20px] top-[20px]" : 
          "absolute left-[30px] top-[30px]"
        )}>
          {isLoggedIn ? (
            <UserMenu />
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              className={cn(
                "flex items-center justify-center rounded-[12px] sm:rounded-[18px] bg-white",
                isSmallMobile ? "h-[32px] w-[32px] p-[5px]" :
                isMobile ? "h-[36px] w-[36px] p-[7px]" : 
                isTablet ? "h-[42px] w-[42px] p-[8px]" :
                "h-[48px] w-[48px] p-[10px]"
              )}
            >
              <svg
                width={isSmallMobile ? "12" : isMobile ? "14" : isTablet ? "16" : "18"}
                height={isSmallMobile ? "12" : isMobile ? "14" : isTablet ? "16" : "18"}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 2L16.5 12L7.5 22"
                  stroke="black"
                  strokeWidth="1.5"
                />
                <path d="M3 12H16.5" stroke="black" strokeWidth="1.5" />
              </svg>
            </motion.button>
          )}
        </div>

        {/* Design Services */}
        <AnimatePresence>
          {isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
              className={cn(
                "flex flex-row items-center justify-center gap-[8px] rounded-[18px] bg-white backdrop-blur-[200px]", 
                isSmallMobile ? "mx-2 mt-16 h-[40px] w-[90%] p-[6px]" :
                isMobile ? "mx-4 mt-20 h-[45px] w-[80%] p-[8px]" : 
                isTablet ? "absolute right-[20px] top-[120px] h-[48px] w-[230px] p-[10px]" : 
                isSmallDesktop ? "absolute right-[20px] top-[140px] h-[50px] w-[240px] p-[10px]" :
                "absolute right-[40px] top-[154px] h-[53px] w-[261px] p-[10px]"
              )}
            >
              <span className={cn(
                "text-right  font-medium text-black",
                isSmallMobile ? "text-[10px] leading-[16px]" :
                isMobile ? "text-[12px] leading-[18px]" : 
                "text-[14px] leading-[21px]"
              )}>
                خدمات التصميم الداخلي
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Discover Button */}
        <div className={cn(
          "flex flex-row items-center justify-center gap-[10px] isolation-isolate",
          isSmallMobile ? "mx-2 mt-8" : 
          isMobile ? "mx-4 mt-12" : 
          isTablet ? "absolute right-[20px] top-[180px] w-[500px]" : 
          isSmallDesktop ? "absolute right-[30px] top-[200px] w-[600px]" :
          "absolute right-[40px] top-[247px] h-[172px] w-[692px]"
        )}>
          <div className={cn(
            "rounded-full bg-[#375A64]",
            isSmallMobile ? "absolute left-0 top-6 z-0 h-[6px] w-[6px]" :
            isMobile ? "absolute left-1 top-8 z-0 h-[8px] w-[8px]" : 
            isTablet ? "absolute left-[-2px] top-[40px] z-0 h-[10px] w-[10px]" : 
            "absolute left-[-3px] top-[54px] z-0 h-[11px] w-[11px]"
          )}></div>
          <AnimatePresence mode="wait">
            <motion.h1
              key={isLoggedIn ? "logged-in" : "logged-out"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "z-1 order-1 text-right  font-semibold leading-[160%] text-black",
                isSmallMobile ? "text-[22px]" :
                isMobile ? "text-[30px]" : 
                isTablet ? "text-[40px]" : 
                isSmallDesktop ? "text-[46px]" :
                "h-[172px] w-[692px] text-[54px]"
              )}
            >
              {isLoggedIn ? (
                <>
                  مرحباً بك في
                  <br />
                  <svg
                    width={isSmallMobile ? "40" : isMobile ? "50" : isTablet ? "60" : "67"}
                    height={isSmallMobile ? "28" : isMobile ? "36" : isTablet ? "42" : "48"}
                    viewBox="0 0 67 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M66.9144 47.9204C58.7899 42.174 48.8211 39.1865 39.0176 37.3662L35.309 36.7256C34.0663 36.5733 30.8998 36.1801 29.7033 36.0215C28.5001 35.9327 25.3006 35.679 24.0578 35.5775C19.0139 35.2731 13.9634 35.2604 8.89968 35.2921L9.7855 34.7784C6.67851 39.2309 3.51864 43.6391 0.140625 47.9204C2.63282 42.9161 5.33656 38.0258 8.14607 33.1863C10.9159 33.0024 13.6858 32.7614 16.4688 32.6218C18.7759 32.6472 21.949 32.5204 24.2165 32.6472C25.5121 32.7297 28.7778 32.9326 30.0272 33.0278C31.2501 33.18 34.5422 33.6113 35.8115 33.7762C42.1576 34.8862 48.5435 36.6177 54.3674 39.288C58.9684 41.508 63.5297 44.1465 66.9144 47.9141V47.9204Z"
                      fill="#FF735D"
                    />
                    <path
                      d="M45.0522 38.0259C43.8821 28.201 51.3983 16.8349 57.3611 9.24267L57.6784 11.4182L56.0192 10.3209L55.1928 9.77546C53.2097 8.41178 50.7108 9.26804 49.5937 11.2406C48.2186 13.0927 46.2817 15.6678 44.9662 17.5199C42.7451 20.6151 40.2859 23.8119 38.5606 27.1101L38.2499 26.2411C40.6561 27.7887 43.5582 28.7719 46.4668 28.9558C43.1946 29.4442 39.843 28.7021 36.9277 27.2242C38.7258 22.0169 41.8989 17.4565 44.8803 12.839C46.0834 11.1518 47.0486 9.3061 48.536 7.81556C51.2265 5.41802 55.0606 5.6527 57.7974 7.85996C58.5246 8.37372 60.0715 9.37587 60.7986 9.87694L59.7608 11.1391C53.8575 18.4015 45.971 28.6894 45.0456 38.0259H45.0522Z"
                      fill="#FF735D"
                    />
                    <path
                      d="M56.0269 3.81971C58.2216 3.81971 58.2216 0.546875 56.0269 0.546875C53.8322 0.546875 53.8322 3.81971 56.0269 3.81971Z"
                      fill="#FF735D"
                    />
                    <path
                      d="M50.1949 3.81971C52.3896 3.81971 52.3896 0.546875 50.1949 0.546875C48.0001 0.546875 48.0001 3.81971 50.1949 3.81971Z"
                      fill="#FF735D"
                    />
                  </svg>
                </>
              ) : (
                <>
                  إكتــــشف شقتــــك السكنيــــة
                  <br />
                  بضغطــــــــة زر
                </>
              )}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Description Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isLoggedIn ? "logged-in-desc" : "logged-out-desc"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={cn(
              "flex flex-row items-center justify-center gap-[10px]",
              isSmallMobile ? "mx-2 mt-3 px-1" : 
              isMobile ? "mx-4 mt-5 px-2" : 
              isTablet ? "absolute right-[20px] top-[320px] w-[500px]" : 
              isSmallDesktop ? "absolute right-[30px] top-[380px] w-[600px]" :
              "absolute right-[40px] top-[459px] h-[50px] w-[714px]"
            )}
          >
            <p className={cn(
              "text-right  font-medium leading-[180%] text-[#595959]",
              isSmallMobile ? "text-[10px]" :
              isMobile ? "text-[12px]" : 
              "text-[14px]"
            )}>
              {isLoggedIn
                ? "يمكنك الآن استعراض جميع العقارات المتاحة واختيار شقتك السكنية المناسبة بكل سهولة وبأفضل الأسعار."
                : "نقدم لك حلول عقارية رائعة وبأسعار منافسة. من خلال منصة قنفه يمكنك استعراض العقارات المتاحة واختيار شقتك السكنية المناسبة بكل سهولة وبأفضل الأسعار. وفرنا احتياجاتك بخدمة مريحة وموثوقة لمستقبل أفضل."}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Buttons Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={cn(
            "flex items-center justify-end gap-3 sm:gap-4",
            isSmallMobile ? "mx-2 mt-3 flex-wrap" : 
            isMobile ? "mx-4 mt-5" : 
            isTablet ? "absolute right-[20px] top-[390px]" : 
            isSmallDesktop ? "absolute right-[30px] top-[450px]" :
            "absolute right-[40px] top-[549px] h-[53px]"
          )}
        >
          <Button
            variant="default"
            className={cn(
              "bg-[#FF735D] hover:bg-[#FF735D]/90",
              isSmallMobile ? "text-xs py-1 h-8 px-2" :
              isMobile && "text-xs py-1 h-10"
            )}
            onClick={() => setIsQRModalOpen(true)}
          >
            <svg
              width={isSmallMobile ? "14" : isMobile ? "16" : "20"}
              height={isSmallMobile ? "14" : isMobile ? "16" : "20"}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="order-0 flex-none flex-grow-0"
            >
              <path d="M2 8H6" stroke="white" strokeWidth="0.833333" />
              <path d="M2 12H20" stroke="white" strokeWidth="0.833333" />
            </svg>
            <span className={cn(
              "order-1 text-right  font-medium leading-[180%] text-white",
              isSmallMobile ? "text-[10px]" :
              isMobile ? "text-[12px]" : 
              "h-[25px] w-[115px] text-[14px]"
            )}>
              إمســـــح ال Qr Code
            </span>
          </Button>

          {!isLoggedIn && (
            <Button
              variant="outline"
              className={cn(
                "border-[#FF735D] text-[#FF735D] hover:bg-[#FF735D]/5",
                isSmallMobile ? "text-xs py-1 h-8 px-2" :
                isMobile && "text-xs py-1 h-10"
              )}
              onClick={handleLogin}
            >
              <span className={cn(
                "text-right  font-medium leading-[180%]",
                isSmallMobile ? "text-[10px]" :
                isMobile ? "text-[12px]" : 
                "h-[25px] w-[115px] text-[14px]"
              )}>
                تسجيل الدخول
              </span>
            </Button>
          )}
        </motion.div>

        {/* Why Choose Us Section */}
        <AnimatePresence>
          {isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={cn(
                "flex flex-col items-end gap-[20px] p-0",
                isSmallMobile ? "mx-2 mt-8" : 
                isMobile ? "mx-4 mt-12" : 
                isTablet ? "absolute right-[20px] top-[460px] w-[90%]" : 
                isSmallDesktop ? "absolute right-[30px] top-[530px] w-[90%]" :
                "absolute right-[40px] top-[684px] h-[231px] w-[940px]"
              )}
            >
              <h3 className={cn(
                "self-stretch text-right  font-medium leading-[180%] text-black",
                isSmallMobile ? "text-[10px]" :
                isMobile ? "text-[12px]" : 
                "text-[14px] h-[25px] w-full"
              )}>
                لماذا منصة قنفه؟
              </h3>

              <div className={cn(
                "flex items-center justify-end gap-[20px] self-stretch",
                isSmallMobile || isMobile ? "flex-col" : "flex-row h-[186px] w-full"
              )}>
                {/* Our Projects */}
                <div className={cn(
                  "flex flex-col items-end justify-center gap-[20px] rounded-[20px] bg-white p-[24px]",
                  isSmallMobile ? "w-full h-auto p-4" :
                  isMobile ? "w-full h-auto" : 
                  isTablet ? "w-[48%] h-[186px]" : 
                  "h-[186px] w-[460px] flex-grow-1"
                )}>
                  <div className={cn(
                    "flex flex-row items-center justify-end self-stretch",
                    isSmallMobile ? "gap-[10px]" :
                    isMobile ? "gap-[20px]" : 
                    isTablet ? "gap-[80px]" : 
                    "h-[18px] w-[412px] gap-[169px]"
                  )}>
                    <span className={cn(
                      "text-right  font-medium text-[#375A64]",
                      isSmallMobile ? "text-[9px] leading-[14px]" :
                      isMobile ? "text-[10px] leading-[16px]" : 
                      "text-[12px] leading-[18px] h-[18px] w-[47px]"
                    )}>
                      مشاريعنا
                    </span>
                    <div className={cn(
                      "flex flex-row items-center justify-center gap-[12px]",
                      isSmallMobile ? "h-[28px]" : 
                      isMobile ? "h-[32px]" : 
                      "h-[36px] w-[62px]"
                    )}>
                      <svg
                        width={isSmallMobile ? "16" : isMobile ? "20" : "24"}
                        height={isSmallMobile ? "16" : isMobile ? "20" : "24"}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 22.0001C14.7348 22.0001 14.4804 21.8948 14.2929 21.7073C14.1054 21.5197 14 21.2654 14 21.0001V17.0001C14 16.8356 14.0406 16.6735 14.1182 16.5284C14.1958 16.3832 14.3081 16.2595 14.445 16.1681L17.445 14.1681C17.6093 14.0585 17.8025 14 18 14C18.1975 14 18.3907 14.0585 18.555 14.1681L21.555 16.1681C21.6919 16.2595 21.8042 16.3832 21.8818 16.5284C21.9594 16.6735 22 16.8356 22 17.0001V21.0001C22 21.2654 21.8946 21.5197 21.7071 21.7073C21.5196 21.8948 21.2652 22.0001 21 22.0001H15Z"
                          stroke="#FF735D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 14.993 7.539 20.193 9.399 21.799C9.57237 21.929 9.78329 21.9992 10 21.999"
                          stroke="#FF735D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18 22V19"
                          stroke="#FF735D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
                          stroke="#FF735D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span className={cn(
                        "text-right  font-semibold text-[#FF735D]",
                        isSmallMobile ? "text-[16px] leading-[24px]" :
                        isMobile ? "text-[20px] leading-[30px]" : 
                        "text-[24px] leading-[36px] h-[36px] w-[26px]"
                      )}>
                        50
                      </span>
                    </div>
                  </div>

                  <div className={cn(
                    "flex flex-row items-center justify-end self-stretch",
                    isSmallMobile ? "gap-[10px]" :
                    isMobile ? "gap-[20px]" : 
                    isTablet ? "gap-[80px]" : 
                    "h-[44px] w-[412px] gap-[169px]"
                  )}>
                    <p className={cn(
                      "text-right  font-normal leading-[180%] text-[#595959]",
                      isSmallMobile ? "text-[8px] w-full" :
                      isMobile ? "text-[10px] w-full" : 
                      isTablet ? "text-[11px]" : 
                      "text-[12px] h-[44px] w-[277px]"
                    )}>
                      نحن الخيار الأول لأكثر من خمسين شركة عقارية متميزة في المنطقة
                    </p>
                  </div>
                </div>

                {/* Happy Clients */}
                <div className={cn(
                  "flex flex-col items-end justify-center gap-[20px] rounded-[20px] bg-white p-[24px]",
                  isSmallMobile ? "w-full h-auto mt-2 p-4" :
                  isMobile ? "w-full h-auto mt-4" : 
                  isTablet ? "w-[48%] h-[186px]" : 
                  "h-[186px] w-[460px] flex-grow-1"
                )}>
                  <div className={cn(
                    "flex flex-row items-center justify-end self-stretch",
                    isSmallMobile ? "gap-[10px]" :
                    isMobile ? "gap-[20px]" : 
                    isTablet ? "gap-[80px]" : 
                    "h-[18px] w-[412px] gap-[169px]"
                  )}>
                    <span className={cn(
                      "text-right  font-medium text-[#375A64]",
                      isSmallMobile ? "text-[9px] leading-[14px]" :
                      isMobile ? "text-[10px] leading-[16px]" : 
                      "text-[12px] leading-[18px] h-[18px] w-[69px]"
                    )}>
                      عملاء سعداء
                    </span>
                    <div className={cn(
                      "flex flex-row items-center justify-center gap-[12px]",
                      isSmallMobile ? "h-[28px]" : 
                      isMobile ? "h-[32px]" : 
                      "h-[36px] w-[84px]"
                    )}>
                      <svg
                        width={isSmallMobile ? "16" : isMobile ? "20" : "24"}
                        height={isSmallMobile ? "16" : isMobile ? "20" : "24"}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 21C18 18.8783 17.1571 16.8434 15.6569 15.3431C14.1566 13.8429 12.1217 13 10 13C7.87827 13 5.84344 13.8429 4.34315 15.3431C2.84285 16.8434 2 18.8783 2 21"
                          stroke="#FF735D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 13C12.7614 13 15 10.7614 15 8C15 5.23858 12.7614 3 10 3C7.23858 3 5 5.23858 5 8C5 10.7614 7.23858 13 10 13Z"
                          stroke="#FF735D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22.0008 20.0002C22.0008 16.6302 20.0008 13.5002 18.0008 12.0002C18.6582 11.507 19.1839 10.8593 19.5313 10.1145C19.8788 9.36965 20.0373 8.55066 19.9928 7.73C19.9483 6.90933 19.7022 6.11228 19.2763 5.40939C18.8503 4.70651 18.2577 4.11946 17.5508 3.7002"
                          stroke="#FF735D"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span className={cn(
                        "text-right  font-semibold text-[#FF735D]",
                        isSmallMobile ? "text-[16px] leading-[24px]" :
                        isMobile ? "text-[20px] leading-[30px]" : 
                        "text-[24px] leading-[36px] h-[36px] w-[48px]"
                      )}>
                        1000
                      </span>
                    </div>
                  </div>

                  <div className={cn(
                    "flex flex-row items-center justify-end self-stretch",
                    isSmallMobile ? "gap-[10px]" :
                    isMobile ? "gap-[20px]" : 
                    isTablet ? "gap-[80px]" : 
                    "h-[44px] w-[412px] gap-[169px]"
                  )}>
                    <p className={cn(
                      "text-right  font-normal leading-[180%] text-[#595959]",
                      isSmallMobile ? "text-[8px] w-full" :
                      isMobile ? "text-[10px] w-full" : 
                      isTablet ? "text-[11px]" : 
                      "text-[12px] h-[44px] w-[277px]"
                    )}>
                      نحن الخيار الأول لأكثر من ألف شخص في البحث عن العقارات السكنية
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Vector Element */}
        <div className={cn(
          "rotate-[-60deg] rounded-[270px] border-2 border-[#375A64]",
          isSmallMobile || isMobile ? "hidden" : 
          isTablet ? "absolute left-[80%] bottom-[10px] h-[30px] w-[30px]" : 
          isSmallDesktop ? "absolute left-[85%] bottom-[15px] h-[34px] w-[34px]" :
          "absolute left-[839px] top-[974.18px] h-[37px] w-[36px]"
        )}></div>
      </motion.div>

      {/* Image Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={cn(
          "overflow-hidden rounded-[30px]",
          "hidden md:block", // Hide on all mobile screens, show on md and up
          isTablet ? "absolute left-[20px] top-[20px] h-[70vh] w-[45%]" : 
          isSmallDesktop ? "absolute left-[20px] top-[20px] h-[80vh] w-[40%]" :
          "absolute left-[20px] top-[20px] h-[955px] w-[840px]"
        )}
      >
        <Image
          src="/home.png"
          alt="شقة سكنية فاخرة"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 0px, (max-width: 1024px) 45vw, (max-width: 1280px) 40vw, 840px"
          quality={100}
        />
        {/* Hidden elements for later activation */}
        <div className="invisible absolute left-[301px] top-[841px] h-[49px] w-[49px]">
          <div className="absolute left-[29px] top-[21px] h-[0px] w-[36.77px] rotate-[-45deg] border border-[rgba(238,238,238,0.8)]"></div>
          <div className="absolute left-[calc(50%-15px)] top-[calc(50%-15px)] box-border h-[30px] w-[30px] rounded-full border-[0.5px] border-[rgba(238,238,238,0.8)]"></div>
          <div className="absolute left-[calc(50%-7px)] top-[calc(50%-7px)] h-[14px] w-[14px] rounded-full bg-[rgba(238,238,238,0.8)]"></div>
        </div>
        <div className="invisible absolute left-[320px] top-[794px] flex h-[32px] w-[117px] flex-col items-center justify-center gap-[8px] rounded-[18px] bg-[rgba(238,238,238,0.8)] px-[10px] py-[4px]">
          <span className="order-0 h-[24px] w-[97px] flex-none flex-grow-0 text-right  text-[10px] font-normal leading-[24px] text-black">
            مساحه لا تقل عن 200 متر
          </span>
        </div>
      </motion.div>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
      />

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </section>
  );
}
