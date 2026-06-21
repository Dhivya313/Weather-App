# Phase 1: Wireframes and UI Flow

## 1. Page Wireframes

### Home Page / Main Weather Dashboard

```
┌──────────────────────────────────────────────────────────┐
│  🌤️ WEATHER APP              [🔔] [⚙️] [👤]              │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────────────────────────────────┐                 │
│  │ 🔍 Search City... | 📍 Use My Location  │                 │
│  └─────────────────────────────────────┘                 │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Current Weather - Chennai, India                    │  │
│  ├─────────────────────────────────────────────────────┤  │
│  │                                                     │  │
│  │   ☁️  Partly Cloudy          °C | °F               │  │
│  │   34.5°C                                           │  │
│  │   Feels like 37.2°C                               │  │
│  │                                                     │  │
│  │   💧 Humidity: 65%      💨 Wind: 3.5 m/s         │  │
│  │   🌡️ Pressure: 1013 hPa   👁️ Visibility: 10 km    │  │
│  │                                                     │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Hourly Forecast (Next 24 Hours)                   │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ 10AM   11AM   12PM   1PM   2PM   3PM  4PM  5PM   │   │
│  │  28°   30°    32°    34°   35°   34°  32°  30°   │   │
│  │  ☁️    ☁️     ⛅     ☀️     ☀️    ☁️   ⛅   ☁️    │   │
│  │ 20%    15%    10%     5%    5%   10%  15%  20%   │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │ 7-Day Forecast                                    │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ Today  Mon   Tue   Wed   Thu   Fri   Sat         │   │
│  │ ☁️     ⛅   🌧️   ☀️    ⛈️    ☁️   ⛅             │   │
│  │ 32/24° 31/23° 28/22° 33/25° 29/21° 32/24° 30/23° │   │
│  │ 20%    25%   60%   10%   70%  30%  15%           │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  AI Insights                                             │
│  ────────────                                            │
│  👕 Clothing: Light cotton clothes recommended            │
│  🚗 Travel: Good day for outdoor activities              │
│  ⚠️  Alert: Stay hydrated due to heat                    │
│                                                            │
│  ⭐ Add to Favorites  |  📋 More Details                 │
│                                                            │
└──────────────────────────────────────────────────────────┘

MOBILE VERSION (375px width):
┌─────────────────────────┐
│ 🌤️ WEATHER   [🔔][⚙️]  │
├─────────────────────────┤
│ 🔍 Search City...      │
│ 📍 Use My Location     │
│                         │
│ Chennai, India          │
│ ☁️ Partly Cloudy       │
│ 34.5°C                 │
│ Feels: 37.2°C          │
│                         │
│ 💧 Humidity: 65%       │
│ 💨 Wind: 3.5 m/s       │
│                         │
│ ─── Hourly ───         │
│ ← 10AM 11AM 12PM →     │
│   28°  30°  32°        │
│                         │
│ ─── 7-Day ───          │
│ Today ☁️ 32/24°       │
│ Mon   ⛅ 31/23°       │
│ Tue   🌧️ 28/22°       │
│                         │
│ ⭐ Favorites  📋 More  │
└─────────────────────────┘
```

### Favorites Page

```
┌──────────────────────────────────────────────────────────┐
│  🌤️ WEATHER APP              [🔔] [⚙️] [👤]              │
├──────────────────────────────────────────────────────────┤
│  Favorites                                                │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────────────┐  ┌──────────────────────┐      │
│  │ Mumbai, India        │  │ Delhi, India         │      │
│  │ ☀️  33°C            │  │ ⛅  31°C            │      │
│  │ Clear, Humid        │  │ Partly Cloudy        │      │
│  │ 💧 70%  💨 4 m/s    │  │ 💧 65%  💨 5 m/s    │      │
│  │ [View] [Remove ❌]  │  │ [View] [Remove ❌]  │      │
│  └──────────────────────┘  └──────────────────────┘      │
│                                                            │
│  ┌──────────────────────┐  ┌──────────────────────┐      │
│  │ Bangalore, India     │  │ Hyderabad, India     │      │
│  │ ⛅  28°C            │  │ 🌧️  26°C            │      │
│  │ Cloudy               │  │ Rainy                │      │
│  │ 💧 75%  💨 3 m/s    │  │ 💧 85%  💨 2 m/s    │      │
│  │ [View] [Remove ❌]  │  │ [View] [Remove ❌]  │      │
│  └──────────────────────┘  └──────────────────────┘      │
│                                                            │
│  [+ Add More Locations]                                  │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

### Search History Page

```
┌──────────────────────────────────────────────────────────┐
│  🌤️ WEATHER APP              [🔔] [⚙️] [👤]              │
├──────────────────────────────────────────────────────────┤
│  Search History                                           │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  Recent Searches:                                        │
│                                                            │
│  ✓ Chennai         - Today, 2:30 PM    [Clear] 34.5°C   │
│  ✓ Mumbai          - Today, 1:15 PM    [Sunny] 33°C     │
│  ✓ Delhi           - Today, 11:45 AM   [Cloudy] 31°C    │
│  ✓ Bangalore       - Today, 10:20 AM   [Cloudy] 28°C    │
│  ✓ Hyderabad       - Yesterday, 5:30 PM [Rainy] 26°C    │
│  ✓ London          - Yesterday, 3:00 PM [Rainy] 15°C    │
│  ✓ New York        - 3 days ago, 2:15 PM [Sunny] 22°C   │
│  ✓ Tokyo           - 1 week ago, 4:45 PM [Cloudy] 28°C  │
│                                                            │
│  [Clear History]                                         │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

### Settings Page

```
┌──────────────────────────────────────────────────────────┐
│  🌤️ WEATHER APP              [🔔] [⚙️] [👤]              │
├──────────────────────────────────────────────────────────┤
│  Settings                                                 │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  Preferences                                             │
│  ─────────────                                           │
│                                                            │
│  Temperature Unit:                                       │
│  ○ Celsius (°C)   ◉ Fahrenheit (°F)                     │
│                                                            │
│  Theme:                                                  │
│  ◉ Light Mode    ○ Dark Mode     ○ Auto                │
│                                                            │
│  Notifications:                                          │
│  ☑ Weather Alerts    ☑ Daily Summary                   │
│  ☑ Severe Weather    ☐ Weekly Forecast                │
│                                                            │
│  Location Settings                                       │
│  ──────────────────                                      │
│                                                            │
│  Default Location: Chennai, India    [Change]          │
│  GPS Permission: Enabled  [Manage]                      │
│  Auto-locate on Startup: ☑ Enabled                    │
│                                                            │
│  Account                                                 │
│  ───────                                                 │
│                                                            │
│  Email: user@example.com         [Edit]                 │
│  Name: John Doe                  [Edit]                 │
│  Password: ••••••••              [Change]               │
│                                                            │
│  Data & Privacy                                          │
│  ──────────────                                          │
│                                                            │
│  ☐ Share Usage Data for Improvement                     │
│  [View Privacy Policy]  [View Terms]                    │
│                                                            │
│  [Logout]                                                │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

---

## 2. User Flow Diagrams

### Main Search Flow

```
START
  |
  v
Home Page
  |
  +──────────────────────+──────────────────────+
  |                      |                      |
  v                      v                      v
Search by City      GPS Location          Recent Search
  |                      |                      |
  +──────────────────────+──────────────────────+
  |
  v
Validate Input
  |
  +─ Invalid ─> Show Error
  |
  +─ Valid ──> Call Weather API
  |
  v
Weather API Response
  |
  +─ Success ──> Cache Data
  |              |
  |              v
  |         Display Weather
  |         (Current + Forecast)
  |              |
  |              v
  |         Show AI Insights
  |              |
  |              v
  |         Save to Search History
  |              |
  +──────────────+
  |
  +─ Error ──> Show Error Message
  |            + Retry Option
  |
  v
User Actions:
- Add to Favorites
- View More Details
- Search Again
- View History
```

### Favorites Management Flow

```
Weather Display
  |
  v
User clicks "⭐ Add to Favorites"
  |
  v
Check if location already favorited
  |
  +─ Already Favorite ──> Show "Remove from Favorites"
  |
  +─ Not Favorite ──> Add to Database
  |                    |
  |                    v
  |               Update UI
  |               |
  |               v
  |          Show Confirmation
  |
  v
Save to User's Favorites List
```

---

## 3. Component Hierarchy

```
App
├── Header
│   ├── Logo
│   ├── Navigation
│   └── Settings Icon
│
├── MainContent
│   ├── SearchBar
│   │   ├── TextInput
│   │   ├── SearchButton
│   │   └── GPSButton
│   │
│   ├── WeatherDisplay
│   │   ├── CurrentWeather
│   │   │   ├── LocationInfo
│   │   │   ├── TemperatureCard
│   │   │   ├── ConditionIcon
│   │   │   └── FavoritesButton
│   │   │
│   │   ├── HourlyForecast
│   │   │   └── HourlyCard (x24)
│   │   │
│   │   ├── DailyForecast
│   │   │   └── DailyCard (x7)
│   │   │
│   │   └── AIInsights
│   │       ├── ClothingAdvice
│   │       ├── TravelAdvice
│   │       └── HealthAlert
│   │
│   ├── ErrorMessage (conditional)
│   └── LoadingSpinner (conditional)
│
├── Sidebar (Desktop) / Navigation (Mobile)
│   ├── Favorites
│   ├── History
│   ├── Settings
│   └── Logout
│
└── Footer
    └── Links
```

---

## 4. Data Flow Diagram

```
┌────────────────────────────────────────────────────────────┐
│                    WEATHER APP DATA FLOW                   │
└────────────────────────────────────────────────────────────┘

USER INTERACTION
      |
      v
┌─────────────────────────────┐
│  React Component State      │
│  - selectedCity             │
│  - selectedUnit (C/F)       │
│  - weatherData              │
│  - favorites                │
│  - searchHistory            │
└─────────────────────────────┘
      |
      v
┌─────────────────────────────────────┐
│  Backend API Call                   │
│  GET /api/weather/current?city=...  │
│  GET /api/weather/forecast?city=... │
└─────────────────────────────────────┘
      |
      v
┌──────────────────────────────────────────┐
│  Backend Processing (FastAPI)            │
│  - Validate input                        │
│  - Check cache (10 min TTL)             │
│  - Call OpenWeatherMap API if needed    │
│  - Format response                       │
│  - Call AI Service for insights         │
└──────────────────────────────────────────┘
      |
      v
┌──────────────────────────────────────────┐
│  External APIs                           │
│  - OpenWeatherMap API                   │
│  - OpenAI API (for AI insights)        │
│  - IP Geolocation (if needed)          │
└──────────────────────────────────────────┘
      |
      v
┌──────────────────────────────────────────┐
│  Database (PostgreSQL)                   │
│  - Save search history                   │
│  - Save favorite locations              │
│  - Save user preferences                │
│  - Cache weather data                   │
└──────────────────────────────────────────┘
      |
      v
┌──────────────────────────────────────────┐
│  Response to Frontend                    │
│  {                                       │
│    "current": {...},                    │
│    "forecast": [...],                   │
│    "aiInsights": {...}                 │
│  }                                       │
└──────────────────────────────────────────┘
      |
      v
┌─────────────────────────┐
│  Display on UI          │
│  - Weather cards        │
│  - Forecast list        │
│  - AI suggestions       │
└─────────────────────────┘
```

---

## 5. Mobile Responsive Breakpoints

- **Mobile (< 640px)**: Single column, stacked cards, touch-friendly buttons
- **Tablet (640px - 1024px)**: 2-column layout where applicable, larger touch targets
- **Desktop (> 1024px)**: 3+ column layout, hover effects, optimized spacing

---

## 6. Color Scheme & Typography

### Color Palette
- **Primary**: #0066CC (Weather Blue)
- **Secondary**: #FF9500 (Sunny Orange)
- **Success**: #34C759 (Green)
- **Error**: #FF3B30 (Red)
- **Background**: #F5F7FA (Light Gray)
- **Text Primary**: #1C1C1E
- **Text Secondary**: #8E8E93

### Typography
- **Heading (H1)**: 32px, Bold, #1C1C1E
- **Heading (H2)**: 24px, Semi-bold, #1C1C1E
- **Body**: 16px, Regular, #1C1C1E
- **Caption**: 12px, Regular, #8E8E93

---

**Phase 1 Wireframes Status**: ✅ Complete - Ready for Developer Handoff

