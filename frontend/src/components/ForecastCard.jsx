function ForecastCard({ forecast, unit }) {
  if (!forecast) return null

  const tempUnit = unit === 'metric' ? '°C' : '°F'

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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-text-primary mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {forecast.list?.slice(0, 5).map((day, index) => {
          const date = new Date(day.dt * 1000)
          return (
            <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-shadow">
              <p className="font-semibold text-text-primary mb-2">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <p className="text-3xl mb-2">{getWeatherIcon(day.weather[0]?.main)}</p>
              <p className="text-sm text-text-secondary capitalize mb-2">
                {day.weather[0]?.main}
              </p>
              <p className="text-lg font-bold text-primary mb-1">
                {Math.round(day.main.temp_max)}{tempUnit} / {Math.round(day.main.temp_min)}{tempUnit}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ForecastCard
