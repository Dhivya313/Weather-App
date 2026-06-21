import { useState } from 'react'

function SearchBar({ onSearch, isLoading }) {
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      onSearch(searchInput.trim())
      setSearchInput('')
    }
  }

  const handleGPSClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          onSearch(null, latitude, longitude)
        },
        (error) => {
          alert('Unable to access your location: ' + error.message)
        }
      )
    } else {
      alert('Geolocation is not supported by your browser.')
    }
  }

  return (
    <form onSubmit={handleSearch} className="mb-8">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search city name, ZIP code, or coordinates..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        {/* Search button */}
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? '⏳' : '🔍'} Search
        </button>

        {/* GPS button */}
        <button
          type="button"
          onClick={handleGPSClick}
          disabled={isLoading}
          className="px-4 py-3 bg-secondary text-white rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          title="Use my location"
        >
          📍
        </button>
      </div>
    </form>
  )
}

export default SearchBar
