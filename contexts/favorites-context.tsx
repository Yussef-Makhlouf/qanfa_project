"use client"

import * as React from "react"
import { useAuth } from "./auth-context"

interface FavoriteItem {
  id: string
  type: "property" | "project"
}

interface FavoritesContextType {
  favorites: FavoriteItem[]
  addFavorite: (item: FavoriteItem) => void
  removeFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const FavoritesContext = React.createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  const [favorites, setFavorites] = React.useState<FavoriteItem[]>([])

  // Load favorites from localStorage on component mount
  React.useEffect(() => {
    if (isLoggedIn && typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem("favorites")
      if (storedFavorites) {
        try {
          setFavorites(JSON.parse(storedFavorites))
        } catch (error) {
          console.error("Failed to parse favorites from localStorage:", error)
        }
      }
    }
  }, [isLoggedIn])

  // Save favorites to localStorage when they change
  React.useEffect(() => {
    if (isLoggedIn && typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
  }, [favorites, isLoggedIn])

  const addFavorite = React.useCallback(
    (item: FavoriteItem) => {
      if (!isLoggedIn) return
      setFavorites((prev) => {
        if (prev.some((fav) => fav.id === item.id)) return prev
        return [...prev, item]
      })
    },
    [isLoggedIn]
  )

  const removeFavorite = React.useCallback(
    (id: string) => {
      if (!isLoggedIn) return
      setFavorites((prev) => prev.filter((item) => item.id !== id))
    },
    [isLoggedIn]
  )

  const isFavorite = React.useCallback(
    (id: string) => {
      return favorites.some((item) => item.id === id)
    },
    [favorites]
  )

  const value = React.useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
    }),
    [favorites, addFavorite, removeFavorite, isFavorite]
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = React.useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
} 