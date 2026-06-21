# 🧪 PHASE 2: FRONTEND TESTING GUIDE

## ✅ Pre-Testing Verification

### Package.json Status
✅ **VERIFIED**: Package.json exists at `C:\Dhivya\WeatherApp\frontend\package.json`
✅ **Dependencies**: 159 packages installed
✅ **Build Test**: SUCCESS (npm run build passed - 1.76s, 100 modules)
✅ **Production Build**: Verified in dist/ folder

### Project Structure  
✅ All 20 React files created and compiled
✅ All configuration files in place
✅ node_modules folder populated
✅ dist/ folder with production build

---

## 🚀 How to Start the Development Server

### Option 1: Using VS Code Terminal (Recommended)
1. **Open VS Code integrated terminal**: Ctrl + `
2. **Run these commands**:
```powershell
cd C:\Dhivya\WeatherApp\frontend
npm run dev
```

3. **Wait for output** (it should show):
```
VITE v5.0.0  ready in 123 ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

4. **Open browser** at http://localhost:3000

---

## 📋 Complete Testing Checklist

### 1️⃣ **Home Page Tests** (Main Dashboard)

#### Search Functionality
- [ ] **Search by City Name**
  - Enter: "Chennai"
  - Expected: Weather card displays with current conditions
  - Details shown: Temperature, humidity, wind, pressure, visibility
  
- [ ] **Search by Invalid City**
  - Enter: "InvalidCityXYZ123"
  - Expected: Error message displays: "City not found"
  - Button: Retry button appears
  
- [ ] **GPS Location Button**
  - Click: 📍 GPS button
  - Expected: Browser asks for location permission
  - Grant permission: Weather for your location loads
  - Deny permission: Friendly error message shows

#### Weather Card Display
- [ ] **Temperature Display**
  - Shows main temperature (e.g., 34.5°C)
  - Shows "Feels like" temperature (e.g., 37.2°C)
  
- [ ] **Weather Details**
  - Humidity percentage visible (e.g., 65%)
  - Wind speed shown (e.g., 3.5 m/s)
  - Atmospheric pressure displayed (e.g., 1013 hPa)
  - Visibility distance shown (e.g., 10 km)
  
- [ ] **Weather Icon**
  - Weather condition icon displays (☀️, ☁️, 🌧️, etc.)
  - Matches the weather condition
  
- [ ] **Min/Max Temperature**
  - Shows minimum temperature (e.g., 30.1°C)
  - Shows maximum temperature (e.g., 36.8°C)

- [ ] **Favorite Button**
  - Click ⭐ star icon
  - Star fills in with yellow color
  - Location is saved to favorites

#### 5-Day Forecast Card
- [ ] **Forecast Display**
  - Shows 5 days (Today, Mon, Tue, Wed, Thu)
  - Each day shows: weather icon, condition, min/max temp, precipitation %
  
- [ ] **Forecast Updates**
  - When searching new city, forecast updates
  - Shows correct data for that location

#### Loading & Error States
- [ ] **Loading Spinner**
  - Appears while fetching data
  - Shows animated spinner with "Loading weather data..."
  
- [ ] **Error Message**
  - Displays on failed requests
  - Shows user-friendly error text
  - Retry button works correctly

---

### 2️⃣ **Temperature Unit Toggle Tests**

- [ ] **°C to °F Toggle**
  - Click toggle button
  - All temperatures convert immediately
  - Current temp: 34.5°C → 94°F
  - Feels like: 37.2°C → 99°F
  - Min/Max temps update correctly
  
- [ ] **Preference Persists**
  - Set unit to °F
  - Refresh page (F5)
  - Unit setting still in °F ✓

- [ ] **Forecast Units Update**
  - Toggle from °C to °F
  - Forecast min/max temps update
  - All temperatures show in °F

---

### 3️⃣ **Favorites Page Tests**

- [ ] **Add to Favorites**
  - Search for "Mumbai"
  - Click ⭐ star icon
  - Go to Favorites page
  - "Mumbai, India" appears in list
  
- [ ] **View Weather from Favorites**
  - On Favorites page
  - Click "View Weather" button on a favorite
  - Returns to Home page
  - Weather for that city displays
  
- [ ] **Remove from Favorites**
  - On Favorites page
  - Click ✕ (X) button
  - Confirm deletion
  - Location removed from list
  
- [ ] **Multiple Favorites**
  - Add 3-4 different cities
  - All appear on Favorites page
  - Can manage all separately
  
- [ ] **Favorites Persist**
  - Add favorites
  - Close browser completely
  - Reopen app
  - Favorites still there ✓
  
- [ ] **Empty Favorites**
  - No favorites added
  - Favorites page shows: "No favorite locations yet"
  - Message explains how to add

---

### 4️⃣ **Search History Page Tests**

- [ ] **History Records Searches**
  - Search for 3 different cities
  - Go to History page
  - All 3 cities listed with timestamps
  
- [ ] **Oldest First**
  - History shows most recent searches first
  - Each entry has timestamp (e.g., "Today, 2:30 PM")
  
- [ ] **View from History**
  - On History page
  - Click "View Weather" on any entry
  - Weather for that city displays on Home
  
- [ ] **Clear History**
  - History page has "Clear History" button
  - Click it and confirm
  - All history deleted
  - Page shows empty state
  
- [ ] **History Limit (20 items)**
  - Search for many cities (> 20)
  - History only shows last 20
  - Oldest entries removed automatically
  
- [ ] **History Persists**
  - Search cities and add to history
  - Close and reopen browser
  - History still there ✓

---

### 5️⃣ **Settings Page Tests**

- [ ] **Temperature Unit Setting**
  - Settings page shows radio buttons
  - Select "Celsius (°C)"
  - Select "Fahrenheit (°F)"
  - Setting applies immediately
  
- [ ] **Dark Mode Toggle**
  - Settings page shows dark mode option
  - Toggle to Dark Mode
  - Entire app background turns dark
  - Text becomes light colored
  
- [ ] **Light Mode Toggle**
  - In dark mode, click Light Mode
  - App background turns light again
  - Text becomes dark
  
- [ ] **Theme Persists**
  - Set dark mode
  - Refresh page
  - Still in dark mode ✓
  
- [ ] **Notification Settings**
  - Checkboxes visible for:
    - Weather Alerts
    - Daily Summary
    - Severe Weather
    - Weekly Forecast
  - Can check/uncheck (will work in Phase 5)

- [ ] **Account Section (Placeholder)**
  - Shows "Coming Soon" message
  - Displays placeholder account info
  - Explains Phase 5 feature

- [ ] **Data & Privacy**
  - Option to share usage data
  - Links to Privacy Policy (placeholder)
  - Links to Terms (placeholder)

---

### 6️⃣ **Navigation & Routing Tests**

- [ ] **Header Navigation**
  - Click "Home" → Home page loads
  - Click "⭐ Favorites" → Favorites page loads
  - Click "📋 History" → History page loads
  - Click "⚙️ Settings" → Settings page loads
  
- [ ] **Logo Click**
  - Click Weather App logo
  - Returns to Home page
  
- [ ] **Browser Back/Forward**
  - Search weather on Home
  - Go to Favorites
  - Click browser back button
  - Returns to Home
  - Click browser forward button
  - Returns to Favorites
  
- [ ] **URL Changes**
  - Home: http://localhost:3000/
  - Favorites: http://localhost:3000/favorites
  - History: http://localhost:3000/history
  - Settings: http://localhost:3000/settings

---

### 7️⃣ **Dark Mode Header Tests**

- [ ] **Header Navigation Bar**
  - All links visible and clickable
  - Links change color on hover
  
- [ ] **Dark/Light Mode Toggle**
  - Moon icon (🌙) visible in light mode
  - Sun icon (☀️) visible in dark mode
  - Click to toggle between modes
  
- [ ] **Logo Display**
  - Weather App logo visible
  - Weather emoji (🌤️) displays
  - Text "Weather App" displays

---

### 8️⃣ **Responsive Design Tests**

#### Mobile Layout (375px width)
- [ ] **Single Column**
  - Weather card full width
  - Forecast cards stack vertically
  
- [ ] **Touch Friendly**
  - Buttons are at least 44px tall
  - Easy to tap with finger
  
- [ ] **Text Readable**
  - Font sizes appropriate for mobile
  - No horizontal scrolling needed

#### Tablet Layout (768px width)
- [ ] **Two Columns**
  - Forecast cards display 2 per row
  - Search bar full width
  
- [ ] **Spacing**
  - Adequate padding and margins
  - Looks balanced

#### Desktop Layout (1920px width)
- [ ] **Multi-Column**
  - Forecast cards 5 across
  - Extra spacing for large screens
  
- [ ] **Optimized**
  - Content not too spread out
  - Still readable and focused

#### Resize Test
- [ ] **Fluid Design**
  - Resize browser window slowly
  - Layout adapts smoothly
  - No broken elements
  - No overlapping text

---

### 9️⃣ **Performance Tests**

- [ ] **Page Load**
  - App loads in < 2 seconds
  - Open DevTools (F12) → Network tab
  - Check load time
  
- [ ] **Search Response**
  - Search takes < 1 second
  - Weather data displays quickly
  
- [ ] **No Lag**
  - Toggle units smoothly
  - Click buttons instantly respond
  - Switching pages is fast
  
- [ ] **Hot Reload**
  - Make a code change (save a file)
  - Browser updates instantly (< 100ms)
  - No manual refresh needed

---

### 🔟 **Data Persistence Tests**

- [ ] **Favorites Saved**
  - Add favorites
  - Refresh page
  - Favorites still there
  
- [ ] **History Saved**
  - Search cities
  - Refresh page
  - History still there
  
- [ ] **Preferences Saved**
  - Change to °F
  - Change to dark mode
  - Close browser completely
  - Reopen
  - Settings still applied
  
- [ ] **localStorage Check**
  - Open DevTools (F12)
  - Go to Application tab
  - Local Storage → http://localhost:3000
  - See stored data

---

## 🎯 Test Scenarios

### Scenario 1: First Time User
1. App loads with empty state
2. Search for "London"
3. Current weather displays
4. 5-day forecast shows
5. Can toggle between °C and °F
6. Can add to favorites
7. History records the search

### Scenario 2: Saved Preferences
1. User sets °F and dark mode
2. Adds 3 favorites
3. Searches cities (creates history)
4. Closes browser
5. **Next visit**: All settings preserved ✓

### Scenario 3: GPS Location
1. Click GPS button
2. Allow location access
3. Weather loads for current location
4. Shows location name
5. Can add to favorites
6. History records it

### Scenario 4: Error Handling
1. Search for invalid city
2. Error message displays
3. Click Retry button
4. Search works again
5. No app crash

---

## 📊 Expected Results Summary

| Feature | Expected | Status |
|---------|----------|--------|
| Search by city | Works | ✓ |
| GPS location | Works | ✓ |
| Weather display | Shows all details | ✓ |
| 5-day forecast | Displays correctly | ✓ |
| Unit toggle | °C ↔ °F | ✓ |
| Favorites | Save/delete | ✓ |
| History | Records searches | ✓ |
| Settings | Dark mode + prefs | ✓ |
| Navigation | All pages work | ✓ |
| Responsive | Mobile/Tablet/Desktop | ✓ |
| Data persist | localStorage | ✓ |
| Loading state | Spinner visible | ✓ |
| Error handling | User-friendly messages | ✓ |

---

## 🛠️ Troubleshooting During Testing

### Issue: Server won't start
```powershell
# Make sure you're in the frontend directory
cd C:\Dhivya\WeatherApp\frontend

# If npm run dev fails:
npm install    # Reinstall dependencies
npm run dev
```

### Issue: Port 3000 already in use
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Then try npm run dev again
```

### Issue: Page won't load
- Clear browser cache (Ctrl + Shift + Delete)
- Hard refresh (Ctrl + Shift + R)
- Try in incognito/private window

### Issue: localStorage not persisting
- Check browser localStorage enabled
- Open DevTools (F12) → Application → Local Storage
- Verify http://localhost:3000 is listed

---

## ✅ When All Tests Pass

Once you complete this testing checklist and all tests pass:

1. **Phase 2 is VERIFIED** ✅
2. **Ready for Phase 3 Backend** ✅
3. **Frontend can integrate with real API** ✅

---

## 📝 Test Report Template

Keep track of your testing:

```
Date: June 19, 2026
Browser: [Chrome/Firefox/Safari/Edge]
Screen Size: [Mobile/Tablet/Desktop]

✓ Completed Tests:
  - Search functionality
  - Favorites management
  - History tracking
  - Unit toggle
  - Settings
  - Navigation
  - Responsive design
  - Data persistence

❌ Failed Tests (if any):
  - [List any issues found]

Notes:
  - [General observations]
  - [Performance observations]
  - [UI/UX feedback]
```

---

## 🎉 Phase 2 Frontend Testing Complete!

When you've completed this testing guide and everything passes:

**Phase 2 Status**: ✅ TESTED & VERIFIED  
**Next Step**: Phase 3 Backend Foundation

---

**Happy Testing!** 🚀

For any issues during testing, refer to the troubleshooting section or check:
- PHASE2_IMPLEMENTATION.md (detailed guide)
- Frontend README.md (quick reference)

