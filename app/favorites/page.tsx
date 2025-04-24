"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useFavorites } from "@/contexts/favorites-context"
import { ChevronRight, Heart, HomeIcon, BuildingIcon, MapPinIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FavoritesPage() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const { favorites } = useFavorites()

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  // Filter favorites by type
  const projectFavorites = favorites.filter(fav => fav.type === "project")
  const propertyFavorites = favorites.filter(fav => fav.type === "property")

  if (!isLoggedIn) {
    return null
  }

  // Mock project data - in a real app, you would fetch this data from an API
  const mockProjects = [
    { id: "1", title: "مشـــروع الفـــلاح للإسكــــان", location: "شمال الرياض - حي الياسمين", image: "/images/property-interior.jpg" },
    { id: "2", title: "مشـــروع الورود السكني", location: "شرق الرياض - حي الورود", image: "/images/property-interior.jpg" },
  ]

  // Mock property data
  const mockProperties = [
    { id: "1", title: "شقة فاخرة في حي الياسمين", location: "شمال الرياض - حي الياسمين", price: "1,200,000 ريال", image: "/images/property-interior.jpg" },
    { id: "2", title: "شقة مميزة مع إطلالة رائعة", location: "غرب الرياض - حي الملقا", price: "950,000 ريال", image: "/images/property-interior.jpg" },
  ]

  // Filter mock data based on favorites
  const filteredProjects = mockProjects.filter(project => 
    projectFavorites.some(fav => fav.id === project.id)
  )
  
  const filteredProperties = mockProperties.filter(property => 
    propertyFavorites.some(fav => fav.id === property.id)
  )

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="container mx-auto pt-[150px] px-4">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 mb-8">
          <Link href="/" className="text-gray-500 text-sm hover:text-[#FF735D]">
            الرئيسية
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-[#FF735D] text-sm font-medium">المفضلة</span>
        </div>
        
        {/* Page title */}
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-6 h-6 text-[#FF735D]" />
          <h1 className="text-2xl font-bold">المفضلة</h1>
        </div>
        
        {/* Tabs for Projects and Properties */}
        <Tabs defaultValue="projects" className="mb-10">
          <TabsList className="mb-6">
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <BuildingIcon className="w-4 h-4" />
              <span>المشاريع</span>
              <span className="w-5 h-5 bg-[#FF735D] text-white text-xs rounded-full flex items-center justify-center">
                {filteredProjects.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <HomeIcon className="w-4 h-4" />
              <span>العقارات</span>
              <span className="w-5 h-5 bg-[#FF735D] text-white text-xs rounded-full flex items-center justify-center">
                {filteredProperties.length}
              </span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Link href={`/projects/${project.id}`} key={project.id}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-[200px] relative">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Heart className="w-6 h-6 text-white fill-[#FF735D]" />
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <BuildingIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">لا توجد مشاريع في المفضلة</h3>
                <p className="text-gray-500 mb-4">يمكنك إضافة المشاريع المفضلة لديك لتظهر هنا</p>
                <Button asChild>
                  <Link href="/projects">
                    تصفح المشاريع
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="properties">
            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <Link href={`/properties/${property.id}`} key={property.id}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-[200px] relative">
                        <img 
                          src={property.image} 
                          alt={property.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Heart className="w-6 h-6 text-white fill-[#FF735D]" />
                        </div>
                        <div className="absolute bottom-3 right-3 bg-[#FF735D] text-white px-2 py-1 rounded-lg text-sm">
                          {property.price}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <MapPinIcon className="w-4 h-4" />
                          <span>{property.location}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <HomeIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">لا توجد عقارات في المفضلة</h3>
                <p className="text-gray-500 mb-4">يمكنك إضافة العقارات المفضلة لديك لتظهر هنا</p>
                <Button asChild>
                  <Link href="/properties">
                    تصفح العقارات
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 