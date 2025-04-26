import { Card, CardContent } from "@/components/ui/card";
import { Heart, Play } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function GallerySection() {
  // Data for project images
  const projectImages = [
    { type: "image", src: "/images/interior-1.jpg", placeholder: true },
    { type: "video", src: "/images/interior-2.jpg", placeholder: true },
    { type: "image", src: "/images/interior-3.jpg", placeholder: true },
    { type: "image", src: "/images/interior-4.jpg", placeholder: true },
    { type: "more", count: 6, src: "/images/interior-5.jpg", placeholder: true },
    { type: "image", src: "/images/interior-6.jpg", placeholder: true },
    { type: "image", src: "/images/interior-7.jpg", placeholder: true },
    { type: "image", src: "/images/interior-8.jpg", placeholder: true },
  ];

  return (
    <section className="relative w-full max-w-[1680px] mx-auto px-4 py-6 sm:py-8 md:py-10">
      <h2 className="text-center  font-semibold text-2xl sm:text-3xl md:text-[44px] leading-normal md:leading-[66px] text-[#375A64] mb-8 sm:mb-12 md:mb-[106px]">
        صور المشروع
      </h2>

      <div className="flex flex-col gap-8 sm:gap-12 md:gap-[80px]">
        {/* First row of images */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {projectImages.slice(0, 4).map((image, index) => (
            <div
              key={`image-${index}`}
              className="group flex flex-col items-end gap-4 sm:gap-[21px] w-full"
            >
              <Card className="w-full bg-[#F8F8F8] rounded-[20px] p-2 sm:p-[10px] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative">
                    {image.type === "video" ? (
                      <div className="relative w-full aspect-[379/326] rounded-[20px] bg-black/50 overflow-hidden">
                        <Image
                          src={image.src}
                          alt="Project Interior"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover rounded-[20px] opacity-70"
                        />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-[104px] sm:h-[104px] flex items-center justify-center">
                          <Play className="w-12 h-12 sm:w-[87px] sm:h-[87px] text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full aspect-[379/326] rounded-[20px] bg-[#F2F2F2] overflow-hidden">
                        <Image
                          src={image.src}
                          alt="Project Interior"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover rounded-[20px] transition-all duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Second row of images */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {projectImages.slice(4, 8).map((image, index) => (
            <div
              key={`image-${index + 4}`}
              className="group flex flex-col items-end gap-4 sm:gap-[21px] w-full"
            >
              <Card className="w-full bg-[#F8F8F8] rounded-[20px] p-2 sm:p-[10px] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative">
                    {image.type === "more" ? (
                      <div className="relative w-full aspect-[379/326] rounded-[20px] bg-[#F2F2F2] overflow-hidden">
                        <Image
                          src={image.src}
                          alt="Project Interior"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover rounded-[20px]"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="font-['Lama Sans'] font-medium text-2xl sm:text-[32px] leading-normal sm:leading-[32px] text-white">
                            + {image.count}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full aspect-[379/326] rounded-[20px] bg-[#F2F2F2] overflow-hidden">
                        <Image
                          src={image.src}
                          alt="Project Interior"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover rounded-[20px] transition-all duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>

              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>

  )
}