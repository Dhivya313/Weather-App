import { useWeather } from '../hooks/useWeather'

function UnitToggle() {
  const { unit, setUnit } = useWeather()

  return (
    <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-lg shadow">
      <span className="text-text-secondary font-semibold">Temperature Unit:</span>
      <button
        onClick={() => setUnit('metric')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          unit === 'metric'
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-text-primary hover:bg-gray-300'
        }`}
      >
        °C Celsius
      </button>
      <button
        onClick={() => setUnit('imperial')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          unit === 'imperial'
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-text-primary hover:bg-gray-300'
        }`}
      >
        °F Fahrenheit
      </button>
    </div>
  )
}

export default UnitToggle
