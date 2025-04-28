"use client";

import React, { useEffect } from "react";
import { useGuidanceNotifications, guidanceSteps } from "@/app/hooks/useGuidanceNotifications";
import ProjectHero from '@/components/project_hero';
// import GallerySection from '../GallerySection';
import TestimonialsSection from '@/components/testimonials-section';
import FooterSection from '@/components/footer';
import PropertyList from './PropertyList';
import { useAuth } from "@/contexts/auth-context";
import LoggedInHeader from '@/components/LoggedInHeader';
import GallerySection from "./GallerySection";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailsPage({ params }: PageProps) {
  const { isLoggedIn } = useAuth();
  
  // Initialize the guidance notification for apartment selection
  // This will automatically show the notification to first-time visitors
  const { resetGuidanceNotifications } = useGuidanceNotifications(
    guidanceSteps.APARTMENT_SELECTION,
    { initialDelay: 1500 }
  );

  // For demonstration purposes only - a button to reset the notifications
  // so they can be shown again (you would typically not include this in production)
  const handleResetGuidance = () => {
    resetGuidanceNotifications();
    // Force reload to see the notifications again
    window.location.reload();
  };

  return (
    <>
      {/* {isLoggedIn && <LoggedInHeader />} */}
      <main dir="rtl" className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="w-full bg-white">
          <ProjectHero />
        </section>
        {/* Gallery Section */}
        <section className="w-full bg-white">
          <GallerySection />
        </section>
        {/* Property List Section */}
        <section className="w-full bg-white">
          <PropertyList />
        </section>



        
        {/* Footer */}
        <FooterSection />

        {/* This button is for demonstration purposes only */}
        <div className="mt-10 text-center">
          <button 
            onClick={handleResetGuidance}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300"
          >
            إعادة ضبط رسائل التوجيه (للعرض التوضيحي فقط)
          </button>
        </div>
      </main>
    </>
  );
} 