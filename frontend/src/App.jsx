import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WeatherProvider } from './context/WeatherContext'
import Header from './components/Header'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import History from './pages/History'
import Settings from './pages/Settings'

function App() {
  return (
    <WeatherProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WeatherProvider>
  )
}

export default App
