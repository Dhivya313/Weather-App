import { useState, useCallback, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import WeatherCard from '../components/WeatherCard'
import ForecastCard from '../components/ForecastCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import UnitToggle from '../components/UnitToggle'
import { useWeather } from '../hooks/useWeather'
import { weatherApi } from '../services/weatherApi'

function Home() {
  const { weather, forecast, loading, error, unit, setWeather, setForecast, setLoading, setError } =
    useWeather()

  const handleSearch = useCallback(
    async (city, lat, lon) => {
      setLoading(true)
      setError(null)

      try {
        let weatherData, forecastData

        if (city) {
          // Search by city name
          weatherData = await weatherApi.getCurrentWeatherByCity(city, unit)
          forecastData = await weatherApi.getForecast(city, unit)
        } else if (lat && lon) {
          // Search by GPS coordinates
          weatherData = await weatherApi.getCurrentWeatherByCoords(lat, lon, unit)
          // For forecast by coords, we'll use the city name from the result
          if (weatherData) {
            forecastData = await weatherApi.getForecast(weatherData.name, unit)
          }
        }

        setWeather(weatherData)
        setForecast(forecastData)
      } catch (err) {
        setError(err.message || 'Failed to fetch weather data. Please try again.')
        setWeather(null)
        setForecast(null)
      } finally {
        setLoading(false)
      }
    },
    [unit, setWeather, setForecast, setLoading, setError]
  )

  // Load default weather on mount
  const handleRetry = () => {
    if (weather?.name) {
      handleSearch(weather.name)
    }
  }

  // Re-fetch weather when unit changes
  useEffect(() => {
    if (weather?.name) {
      handleSearch(weather.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-text-primary mb-8">Weather Dashboard</h1>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} isLoading={loading} />

      {/* Unit Toggle */}
      <UnitToggle />

      {/* Error Message */}
      {error && <ErrorMessage message={error} onRetry={handleRetry} />}

      {/* Loading State */}
      {loading && <LoadingSpinner />}

      {/* Weather Card */}
      {!loading && weather && (
        <>
          <WeatherCard weather={weather} />
          <ForecastCard forecast={forecast} unit={unit} />
        </>
      )}

      {/* Empty State */}
      {!loading && !weather && !error && (
        <div className="text-center py-12">
          <p className="text-3xl mb-4">🌍</p>
          <p className="text-xl text-text-secondary mb-4">Search for a city to get started</p>
          <p className="text-text-secondary">Enter a city name or use your location to see weather information</p>
        </div>
      )}
    </div>
  )
}

export default Home
