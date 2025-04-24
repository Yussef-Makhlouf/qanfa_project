import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import TestimonialsSection from "@/components/testimonials-section"
import FaqSection from "@/components/faq-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* <Navbar /> */}
      <HeroSection />
      <ProjectsSection />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </main>
  )
}
