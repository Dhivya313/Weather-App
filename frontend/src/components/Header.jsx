import { Link } from 'react-router-dom'
import { useWeather } from '../hooks/useWeather'

function Header() {
  const { isDarkMode, toggleDarkMode } = useWeather()

  return (
    <header className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'} shadow-md`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl">🌤️</span>
            <h1 className="text-2xl font-bold text-primary">Weather App</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/favorites" className="hover:text-primary transition-colors">
              ⭐ Favorites
            </Link>
            <Link to="/history" className="hover:text-primary transition-colors">
              📋 History
            </Link>
            <Link to="/settings" className="hover:text-primary transition-colors">
              ⚙️ Settings
            </Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle dark mode"
              title={isDarkMode ? 'Light mode' : 'Dark mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden p-2" aria-label="Menu">
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
