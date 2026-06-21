import { useWeather } from '../hooks/useWeather'

function Settings() {
  const { unit, setUnit, isDarkMode, toggleDarkMode } = useWeather()

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-text-primary mb-8">⚙️ Settings</h1>

      {/* Preferences Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-6 border-b pb-4">Preferences</h2>

        {/* Temperature Unit */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-text-primary mb-3">Temperature Unit</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="unit"
                value="metric"
                checked={unit === 'metric'}
                onChange={() => setUnit('metric')}
                className="w-4 h-4"
              />
              <span className="text-text-primary">Celsius (°C)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="unit"
                value="imperial"
                checked={unit === 'imperial'}
                onChange={() => setUnit('imperial')}
                className="w-4 h-4"
              />
              <span className="text-text-primary">Fahrenheit (°F)</span>
            </label>
          </div>
        </div>

        {/* Theme */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-text-primary mb-3">Theme</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={!isDarkMode}
                onChange={() => !isDarkMode && toggleDarkMode()}
                className="w-4 h-4"
              />
              <span className="text-text-primary">☀️ Light Mode</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={isDarkMode}
                onChange={() => isDarkMode && toggleDarkMode()}
                className="w-4 h-4"
              />
              <span className="text-text-primary">🌙 Dark Mode</span>
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <label className="block text-lg font-semibold text-text-primary mb-3">Notifications</label>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-text-primary">Weather Alerts</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-text-primary">Daily Summary</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-text-primary">Severe Weather</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-text-primary">Weekly Forecast</span>
            </label>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-6 border-b pb-4">Account (Coming Soon)</h2>
        <p className="text-text-secondary mb-4">User account features will be available in Phase 5</p>
        <ul className="space-y-3 text-text-secondary">
          <li>✓ Email: user@example.com</li>
          <li>✓ Name: Your Name</li>
          <li>✓ Password Management</li>
        </ul>
      </div>

      {/* Data & Privacy Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-text-primary mb-6 border-b pb-4">Data & Privacy</h2>

        <label className="flex items-center gap-2 cursor-pointer mb-6">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-text-primary">Share usage data for improvement</span>
        </label>

        <div className="flex gap-4">
          <a
            href="#"
            className="text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault()
              alert('Privacy Policy - Coming Soon')
            }}
          >
            📄 View Privacy Policy
          </a>
          <a
            href="#"
            className="text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault()
              alert('Terms of Service - Coming Soon')
            }}
          >
            📋 View Terms
          </a>
        </div>
      </div>
    </div>
  )
}

export default Settings
