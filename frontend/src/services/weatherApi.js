import axios from 'axios'

const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8000/api'
    : 'https://weather-app-backend-xsm7.onrender.com/api'

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      return Promise.reject(new Error('City not found. Please try a different location.'))
    }
    if (error.response?.status === 429) {
      return Promise.reject(new Error('Too many requests. Please wait a moment and try again.'))
    }
    if (!error.response) {
      return Promise.reject(new Error('Network error. Please check your connection.'))
    }
    return Promise.reject(error)
  }
)

// Helper function to transform backend response to component-friendly format
const transformWeatherResponse = (data) => {
  if (!data) return null
  
  return {
    name: data.city || 'Unknown',
    city: data.city,
    country: data.country,
    sys: {
      country: data.country,
    },
    coord: {
      lat: data.latitude,
      lon: data.longitude,
    },
    main: {
      temp: data.temperature,
      feels_like: data.feels_like,
      temp_min: data.temp_min,
      temp_max: data.temp_max,
      humidity: data.humidity,
      pressure: data.pressure,
    },
    wind: {
      speed: data.wind_speed,
    },
    visibility: data.visibility,
    weather: [{
      main: data.condition,
      description: data.description,
    }],
  }
}

// Helper function to transform forecast response
const transformForecastResponse = (data) => {
  if (!data) return null
  
  return {
    city: data.city,
    country: data.country,
    list: (data.forecast || []).map(day => ({
      dt: new Date(day.date).getTime() / 1000,
      main: {
        temp_min: day.temp_min,
        temp_max: day.temp_max,
        humidity: day.humidity,
      },
      weather: [{
        main: day.condition,
        description: day.condition.toLowerCase(),
      }],
      wind: {
        speed: day.wind_speed,
      },
      rain: {
        '3h': day.precipitation,
      },
    })),
  }
}

export const weatherApi = {
  // Get current weather by city name
  getCurrentWeatherByCity: async (city, unit = 'metric') => {
    try {
      const response = await apiClient.get('/weather/city', {
        params: { city, unit },
      })
      return transformWeatherResponse(response.data.data)
    } catch (error) {
      throw error
    }
  },

  // Get weather by GPS coordinates
  getCurrentWeatherByCoords: async (lat, lon, unit = 'metric') => {
    try {
      const response = await apiClient.get('/weather/location', {
        params: { lat, lon, unit },
      })
      return transformWeatherResponse(response.data.data)
    } catch (error) {
      throw error
    }
  },

  // Get forecast by city name
  getForecast: async (city, unit = 'metric') => {
    try {
      const response = await apiClient.get('/weather/forecast', {
        params: { city, unit },
      })
      return transformForecastResponse(response.data.data)
    } catch (error) {
      throw error
    }
  },

  // Get AI weather suggestions
  getAIInsights: async (weatherData) => {
    try {
      const response = await apiClient.post('/weather/suggestion', weatherData)
      return response.data
    } catch (error) {
      // Return empty insights if AI service fails
      console.warn('AI insights unavailable:', error)
      return { summary: '', clothing_advice: '', travel_advice: '' }
    }
  },

  // Favorite locations
  saveFavorite: async (favorite) => {
    try {
      const response = await apiClient.post('/favorites', favorite)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getFavorites: async () => {
    try {
      const response = await apiClient.get('/favorites')
      return response.data
    } catch (error) {
      throw error
    }
  },

  removeFavorite: async (favoriteId) => {
    try {
      const response = await apiClient.delete(`/favorites/${favoriteId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Search history
  getHistory: async () => {
    try {
      const response = await apiClient.get('/history')
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default weatherApi
