import { useWeather } from '../hooks/useWeather'
import { useCallback } from 'react'
import { weatherApi } from '../services/weatherApi'

function History() {
  const { searchHistory, clearHistory, setWeather, setForecast, setLoading, setError, unit } =
    useWeather()

  const handleSearchClick = useCallback(
    async (cityName) => {
      setLoading(true)
      setError(null)

      try {
        const weatherData = await weatherApi.getCurrentWeatherByCity(cityName, unit)
        const forecastData = await weatherApi.getForecast(cityName, unit)

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

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear search history?')) {
      clearHistory()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-text-primary">📋 Search History</h1>
        {searchHistory.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="px-4 py-2 bg-error text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear History
          </button>
        )}
      </div>

      {searchHistory.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-3xl mb-4">🕐</p>
          <p className="text-xl text-text-secondary">No search history</p>
          <p className="text-text-secondary">Your recent searches will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-text-primary">Location</th>
                <th className="px-6 py-4 text-left font-semibold text-text-primary">Searched At</th>
                <th className="px-6 py-4 text-left font-semibold text-text-primary">Action</th>
              </tr>
            </thead>
            <tbody>
              {searchHistory.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-text-primary font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-text-secondary text-sm">
                    {new Date(item.searchedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleSearchClick(item.name)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      View Weather
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default History
