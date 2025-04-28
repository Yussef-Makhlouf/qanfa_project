import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsGallerySection(): React.ReactElement {
  // Project data for mapping
  const projects = [
    { id: 1, title: "مشروع الفلاح للإسكان", units: 5, imageUrl: "/pro1.png" },
    { id: 2, title: "مشروع الأمل السكني", units: 10, imageUrl: "/pro2.png" },
    { id: 3, title: "مشروع النخيل للإسكان", units: 30, imageUrl: "/pro3.png" },
    { id: 4, title: "مشروع النخيل للإسكان", units: 30, imageUrl: "/pro4.png" },
    { id: 5, title: "مشروع الفلاح للإسكان", units: 5, imageUrl: "/pro5.png" },
    { id: 6, title: "مشروع الأمل السكني", units: 10, imageUrl: "/pro6.png" },
    { id: 7, title: "مشروع النخيل للإسكان", units: 30, imageUrl: "/pro7.png" },
    { id: 8, title: "مشروع الهدى السكني", units: 20, imageUrl: "/pro8.png" },
  ];

  return (
    <section className="container mx-auto px-4 py-20 max-w-[1920px]">
      {/* Projects Title */}
      <h2 
        className="text-center  text-2xl md:text-3xl lg:text-[34px] font-semibold text-[#375A64] mb-16"
      >
        أخـــــر المشاريـــــع التــــي تــــم اطلاقهـــــا
      </h2>

      {/* Projects Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-8">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            title={project.title} 
            units={project.units} 
            index={index}
            imageUrl={project.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}

// Project card component
function ProjectCard({ title, units, index, imageUrl }: { title: string; units: number; index: number; imageUrl: string }) {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Image container */}
      <div className="bg-[#F8F8F8] rounded-[20px] p-2.5">
        <div className="relative aspect-[379/326] w-full rounded-[20px] overflow-hidden bg-[#F2F2F2]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="rounded-[20px] transition-transform hover:scale-105 duration-300"
          />
          {/* <button 
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#F8F8F8]/80 backdrop-blur-sm transition-opacity hover:bg-white"
            aria-label="Add to favorites"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button> */}
        </div>
      </div>

      {/* Content container */}
      <div className="flex flex-col gap-6 ">
        {/* Title and units */}
        <div className="space-y-2.5" >
          <h3 className=" text-xl lg:text-2xl font-semibold text-right">
            {title}
          </h3>
          <div className="flex items-center justify-start gap-2.5" >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_627_5958)">
<path d="M7.5 11.0001C7.36739 11.0001 7.24021 10.9474 7.14645 10.8536C7.05268 10.7599 7 10.6327 7 10.5001V8.50007C6.99999 8.41778 7.02029 8.33675 7.0591 8.26418C7.09792 8.19162 7.15404 8.12975 7.2225 8.08407L8.7225 7.08407C8.80466 7.02926 8.90123 7 9 7C9.09877 7 9.19534 7.02926 9.2775 7.08407L10.7775 8.08407C10.846 8.12975 10.9021 8.19162 10.9409 8.26418C10.9797 8.33675 11 8.41778 11 8.50007V10.5001C11 10.6327 10.9473 10.7599 10.8536 10.8536C10.7598 10.9474 10.6326 11.0001 10.5 11.0001H7.5Z" stroke="#375A64" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 5C9 3.93913 8.57857 2.92172 7.82843 2.17157C7.07828 1.42143 6.06087 1 5 1C3.93913 1 2.92172 1.42143 2.17157 2.17157C1.42143 2.92172 1 3.93913 1 5C1 7.4965 3.7695 10.0965 4.6995 10.8995C4.78618 10.9645 4.89164 10.9996 5 10.9995" stroke="#375A64" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 11V9.5" stroke="#375A64" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 6.5C5.82843 6.5 6.5 5.82843 6.5 5C6.5 4.17157 5.82843 3.5 5 3.5C4.17157 3.5 3.5 4.17157 3.5 5C3.5 5.82843 4.17157 6.5 5 6.5Z" stroke="#375A64" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_627_5958">
<rect width="12" height="12" fill="white"/>
</clipPath>
</defs>
</svg>
            <span className=" text-sm font-semibold text-[#818181]">
              {units} وحـــدات سكنيـــه
            </span>


          </div>
        </div>

        {/* View more button */}
        <div className="group flex items-center justify-start gap-4 cursor-pointer transition-colors hover:text-[#FF735D]">
         <Link href={`/projects/${index + 1}`}>
          <span className=" text-base font-black text-[#FF735D]">
            رؤيــــة المزيـــد
          </span>
          </Link>
          <svg 
            width="20" 
            height="21" 
            viewBox="0 0 20 21" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform group-hover:-translate-x-2"
          >
            <path 
              d="M4.99935 7.1665L1.66602 10.4998L4.99935 13.8332" 
              stroke="currentColor" 
              strokeWidth="0.833333" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M1.66602 10.5H18.3327" 
              stroke="currentColor" 
              strokeWidth="0.833333" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
