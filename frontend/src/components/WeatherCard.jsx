import { useWeather } from '../hooks/useWeather'
import { useState, useEffect } from 'react'

function WeatherCard({ weather, onFavoriteToggle }) {
  const { unit, isFavorite, addToFavorites, removeFavorite } = useWeather()
  const [_isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (weather?.name) {
      setIsFavorite(isFavorite(weather.name))
    }
  }, [weather, isFavorite])

  if (!weather) {
    return null
  }

  const tempUnit = unit === 'metric' ? '°C' : '°F'
  const speedUnit = unit === 'metric' ? 'm/s' : 'mph'

  const handleFavoriteClick = () => {
    if (_isFavorite) {
      removeFavorite(weather.name)
    } else {
      addToFavorites({
        name: weather.name,
        country: weather.sys?.country,
        latitude: weather.coord?.lat,
        longitude: weather.coord?.lon,
      })
    }
    setIsFavorite(!_isFavorite)
    onFavoriteToggle?.()
  }

  const getWeatherIcon = (weatherMain) => {
    const iconMap = {
      'Thunderstorm': '⚡',
      'Drizzle': '🌧️',
      'Rain': '🌧️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Smoke': '🌫️',
      'Haze': '🌫️',
      'Dust': '🌫️',
      'Fog': '🌫️',
      'Sand': '🌫️',
      'Ash': '🌫️',
      'Squall': '💨',
      'Tornado': '🌪️',
      'Clear': '☀️',
      'Clouds': '☁️',
    }
    return iconMap[weatherMain] || '🌤️'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      {/* Header with location and favorite button */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-3xl font-bold text-text-primary">
            {weather.name}
            {weather.sys?.country && <span className="text-xl ml-2">, {weather.sys.country}</span>}
          </h2>
          <p className="text-text-secondary text-sm">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={handleFavoriteClick}
          className={`text-3xl transition-transform hover:scale-110 ${
            _isFavorite ? 'text-yellow-500' : 'text-gray-300'
          }`}
          title={_isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {_isFavorite ? '⭐' : '☆'}
        </button>
      </div>

      {/* Main weather display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Left: Temperature and condition */}
        <div className="flex flex-col justify-center">
          <div className="text-7xl mb-4">
            {getWeatherIcon(weather.weather[0]?.main)}
          </div>
          <div className="text-6xl font-bold text-primary mb-2">
            {Math.round(weather.main.temp)}{tempUnit}
          </div>
          <p className="text-2xl text-text-primary capitalize mb-2">
            {weather.weather[0]?.description}
          </p>
          <p className="text-text-secondary">
            Feels like {Math.round(weather.main.feels_like)}{tempUnit}
          </p>
        </div>

        {/* Right: Additional info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-text-secondary text-sm font-semibold mb-1">Humidity</p>
            <p className="text-2xl font-bold text-primary">{weather.main.humidity}%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-text-secondary text-sm font-semibold mb-1">Wind Speed</p>
            <p className="text-2xl font-bold text-primary">{weather.wind.speed} {speedUnit}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-text-secondary text-sm font-semibold mb-1">Pressure</p>
            <p className="text-2xl font-bold text-primary">{weather.main.pressure} hPa</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-text-secondary text-sm font-semibold mb-1">Visibility</p>
            <p className="text-2xl font-bold text-primary">
              {(weather.visibility / 1000).toFixed(1)} km
            </p>
          </div>
        </div>
      </div>

      {/* Min/Max temp */}
      <div className="border-t pt-4 flex gap-4">
        <div>
          <p className="text-text-secondary text-sm">Min Temperature</p>
          <p className="text-xl font-semibold text-primary">
            {Math.round(weather.main.temp_min)}{tempUnit}
          </p>
        </div>
        <div className="ml-auto">
          <p className="text-text-secondary text-sm">Max Temperature</p>
          <p className="text-xl font-semibold text-primary">
            {Math.round(weather.main.temp_max)}{tempUnit}
          </p>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
