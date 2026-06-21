import { useWeather } from '../hooks/useWeather'
import { useCallback } from 'react'
import { weatherApi } from '../services/weatherApi'

function Favorites() {
  const { favorites, removeFavorite, setWeather, setForecast, setLoading, setError, unit } =
    useWeather()

  const handleFavoriteClick = useCallback(
    async (favorite) => {
      setLoading(true)
      setError(null)

      try {
        const weatherData = await weatherApi.getCurrentWeatherByCity(favorite.name, unit)
        const forecastData = await weatherApi.getForecast(favorite.name, unit)

        setWeather(weatherData)
        setForecast(forecastData)

        // Navigate to home
        window.location.href = '/'
      } catch (err) {
        setError(err.message || 'Failed to fetch weather for this location')
      } finally {
        setLoading(false)
      }
    },
    [unit, setWeather, setForecast, setLoading, setError]
  )

  const handleRemove = (cityName) => {
    if (confirm(`Remove ${cityName} from favorites?`)) {
      removeFavorite(cityName)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-text-primary mb-8">⭐ My Favorite Locations</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-3xl mb-4">📍</p>
          <p className="text-xl text-text-secondary">No favorite locations yet</p>
          <p className="text-text-secondary">Search for a location and click the star icon to add it to favorites</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favorites.map((favorite) => (
            <div
              key={favorite.name}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-2xl font-bold text-text-primary mb-2">
                {favorite.name}
                {favorite.country && <span className="text-lg ml-2">, {favorite.country}</span>}
              </h3>

              <p className="text-text-secondary text-sm mb-4">
                📍 {favorite.latitude?.toFixed(2)}, {favorite.longitude?.toFixed(2)}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleFavoriteClick(favorite)}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Weather
                </button>
                <button
                  onClick={() => handleRemove(favorite.name)}
                  className="px-4 py-2 bg-error text-white rounded-lg hover:bg-red-700 transition-colors"
                  title="Remove from favorites"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
