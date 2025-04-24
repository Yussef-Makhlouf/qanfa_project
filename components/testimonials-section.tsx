'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import React, { useState } from "react";
import  {ReviewModal}  from "./review-modal";

export default function TestimonialsDisplaySection(): React.ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  // Testimonial data for mapping
  const testimonials = [
    {
      id: 1,
      name: "عبــد اللــه العتيبــي",
      location: "من الريـــاض",
      reviews: "2 تقييمات",
      rating: 5.0,
      initial: "ع",
      text: '"لقد كانت تجربتنا في شراء وحدات سكنية من شركة قنفه رائعة للغاية. كانت الخدمة ممتازة، وكان فريق العمل متعاونا جدا. كل التفاصيل كانت مدروسة بعناية، مما جعل عملية الشراء سهلة وممتعة. بالتأكيد سنعود مرة أخرى لاستكشاف المزيد من خياراتكم!"',
    },
    {
      id: 2,
      name: "أحمـــد فتحـــــي",
      location: "من الريـــاض",
      reviews: "2 تقييمــــات",
      rating: 5.0,
      initial: "أ",
      text: '"تجربتنا في شراء وحدات سكنية من شركة قنفه كانت مذهلة حقا. الخدمة كانت على أعلى مستوى، وفريق العمل كان دائما جاهزا للمساعدة. كل شيء كان مرتبا بعناية، مما جعل عملية الشراء سهلة وممتعة. بالتأكيد سنعود لاستكشاف المزيد من خياراتكم!"',
    },
    {
      id: 3,
      name: "أحمـــد الشقيــــــري",
      location: "من الريـــاض",
      reviews: "2 تقييمــات",
      rating: 5.0,
      initial: "أ",
      text: '"تجربتنا في شراء وحدات سكنية من شركة قنفه كانت مدهشة حقا. الخدمة كانت على أعلى مستوى، وفريق العمل كان دائما متعاونا. كل التفاصيل كانت محسوبة بدقة، مما جعل عملية الشراء سهلة وممتعة. بالتأكيد سنعود لاستكشاف المزيد من خياراتكم!"',
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  // Display only current testimonial and next one (if available)
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);
  if (visibleTestimonials.length < 3 && currentIndex + 1 >= testimonials.length) {
    visibleTestimonials.push(testimonials[0]);
  }

  return (
    <section dir="rtl" className="relative mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-[100px]">
      {/* Title Section */}
      <div className="mb-8 sm:mb-12 lg:mb-16 flex w-full flex-col sm:flex-row items-center justify-between">
        <h2 className="text-right  text-3xl sm:text-[38px] lg:text-[44px] font-semibold leading-normal mb-6 sm:mb-0">
          مــاذا يقــول عملاؤنا عنا !
        </h2>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4 sm:gap-8">
        <button 
            onClick={handlePrevious}
            className="focus:outline-none transition-transform hover:scale-105 p-2"
            aria-label="Previous testimonial"
          >
            <svg width="80" height="12" viewBox="0 0 123 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[60px] sm:w-[80px] lg:w-[123px]">
              <path d="M123 6L113 11.7735V0.226497L123 6ZM114 7H69V5H114V7Z" fill="black"/>
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="focus:outline-none transition-transform hover:scale-105 p-2"
            aria-label="Next testimonial"
          >
            <svg width="80" height="12" viewBox="0 0 123 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[60px] sm:w-[80px] lg:w-[123px]">
              <path d="M0 6L10 11.7735V0.226497L0 6ZM9 7H54V5H9V7Z" fill="#ADADAD"/>
            </svg>
          </button>
     
        </div>
      </div>

      {/* Testimonials Cards */}
      <div className="mb-8 sm:mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 transition-all duration-300 ease-in-out">
        {visibleTestimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="w-full bg-[#F8F8F8] rounded-[20px] transform transition-transform hover:scale-[1.02]"
          >
            <CardContent className="flex flex-col items-end gap-6 sm:gap-8 p-6 sm:p-8 lg:p-10">
              <div className="flex w-full items-center justify-between ">
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-[18px] bg-[#375A64] text-white">
                    <div className=" text-base sm:text-lg font-bold">
                      {testimonial.initial}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-1 sm:gap-2">
                    <div className=" text-sm sm:text-base font-bold">
                      {testimonial.name}
                    </div>
                    <div className=" text-xs sm:text-sm text-gray-600">
                      {testimonial.location} • {testimonial.reviews}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                <span className=" text-sm sm:text-base font-semibold">
                  {'0.'}   {testimonial.rating} 
                  </span>
                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.04894 2.92705C8.3483 2.00574 9.6517 2.00574 9.95106 2.92705L10.6839 5.18237C10.8177 5.5944 11.2017 5.87336 11.6349 5.87336L14.0063 5.87336C14.975 5.87336 15.3778 7.11297 14.5941 7.68237L12.6756 9.07624C12.3251 9.33088 12.1784 9.78225 12.3123 10.1943L13.0451 12.4496C13.3445 13.3709 12.29 14.137 11.5063 13.5676L9.58778 12.1738C9.2373 11.9191 8.7627 11.9191 8.41221 12.1738L6.49372 13.5676C5.71001 14.137 4.65553 13.3709 4.95488 12.4496L5.68768 10.1943C5.82155 9.78225 5.6749 9.33088 5.32441 9.07624L3.40592 7.68237C2.6222 7.11297 3.02498 5.87336 3.9937 5.87336L6.36509 5.87336C6.79832 5.87336 7.18227 5.5944 7.31614 5.18237L8.04894 2.92705Z" fill="#FFBE33"/>
</svg>

         
                </div>
              </div>

              <div className="text-right w-full">
                <p className=" text-sm sm:text-base leading-[1.8] sm:leading-[2] text-gray-700">
                  {testimonial.text}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Review Button */}
      <div className="flex justify-center ">
        <Button 
          onClick={() => setIsReviewModalOpen(true)}
          className="group flex h-[45px] sm:h-[53px] items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#FF735D] hover:bg-[#FF735D]/90 rounded-xl transition-all duration-300 hover:scale-105"
        >
          <span className=" text-sm sm:text-base font-medium text-white order-2">
            إضافة تقييم
          </span>
          <svg 
            width="21" 
            height="21" 
            viewBox="0 0 21 21" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-[18px] h-[18px] sm:w-[21px] sm:h-[21px] transform transition-transform group-hover:translate-x-1 order-1"
          >
            <path 
              d="M5.50033 7.1665L2.16699 10.4998L5.50033 13.8332" 
              stroke="white" 
              strokeWidth="1.5"
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M2.16699 10.5H18.8337" 
              stroke="white" 
              strokeWidth="1.5"
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>


    </section>
  );
}
