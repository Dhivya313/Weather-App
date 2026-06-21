import { createContext, useState, useCallback, useEffect } from 'react'

export const WeatherContext = createContext()

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentCity, setCurrentCity] = useState('Chennai')
  const [unit, setUnit] = useState('metric') // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [favorites, setFavorites] = useState([])
  const [searchHistory, setSearchHistory] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Load favorites and settings from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')
    const savedHistory = localStorage.getItem('searchHistory')
    const savedUnit = localStorage.getItem('unit')
    const savedDarkMode = localStorage.getItem('isDarkMode')

    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    if (savedHistory) setSearchHistory(JSON.parse(savedHistory))
    if (savedUnit) setUnit(savedUnit)
    if (savedDarkMode) setIsDarkMode(JSON.parse(savedDarkMode))
  }, [])

  // Save to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
  }, [searchHistory])

  useEffect(() => {
    localStorage.setItem('unit', unit)
  }, [unit])

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const addToFavorites = useCallback((city) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.name === city.name)
      if (exists) {
        return prev.filter(fav => fav.name !== city.name)
      }
      return [...prev, { ...city, addedAt: new Date().toISOString() }]
    })
  }, [])

  const removeFavorite = useCallback((cityName) => {
    setFavorites(prev => prev.filter(fav => fav.name !== cityName))
  }, [])

  const isFavorite = useCallback((cityName) => {
    return favorites.some(fav => fav.name === cityName)
  }, [favorites])

  const addToHistory = useCallback((city) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(h => h.name !== city)
      return [{ name: city, searchedAt: new Date().toISOString() }, ...filtered].slice(0, 20)
    })
  }, [])

  const clearHistory = useCallback(() => {
    setSearchHistory([])
  }, [])

  const setWeatherData = useCallback((data) => {
    setWeather(data)
    if (data?.name) {
      setCurrentCity(data.name)
      addToHistory(data.name)
    }
  }, [addToHistory])

  const value = {
    // Weather data
    weather,
    forecast,
    loading,
    error,
    currentCity,
    unit,
    isDarkMode,

    // Methods
    setWeather: setWeatherData,
    setForecast,
    setLoading,
    setError,
    setCurrentCity,
    setUnit,
    toggleDarkMode,

    // Favorites
    favorites,
    addToFavorites,
    removeFavorite,
    isFavorite,

    // History
    searchHistory,
    addToHistory,
    clearHistory,
  }

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
}
