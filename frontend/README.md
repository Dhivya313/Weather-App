# Weather App - Frontend

Modern React weather application with Tailwind CSS.

## Quick Start

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

## Features

✅ Search weather by city name  
✅ GPS-based location detection  
✅ Current weather display  
✅ 5-day forecast  
✅ Temperature unit toggle (°C/°F)  
✅ Save favorite locations  
✅ Search history  
✅ Dark/Light theme  
✅ Fully responsive design  
✅ localStorage persistence  

## Project Structure

```
src/
├── components/   # Reusable UI components
├── pages/        # Route pages
├── services/     # API integration
├── hooks/        # Custom React hooks
├── context/      # Global state (React Context)
└── assets/       # Images and icons
```

## Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Fix code style |

## Technologies

- **React 18** - UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation

## Environment Variables

```
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Weather App
```

## API Integration

The app expects a backend API at `http://localhost:8000/api`

Key endpoints:
- `GET /weather/current?city=...` - Current weather
- `GET /weather/current/location?lat=...&lon=...` - Weather by coords
- `GET /weather/forecast?city=...` - 5-day forecast

## Testing

### Manual Test Checklist
- [ ] Search weather by city
- [ ] Use GPS location
- [ ] Toggle temperature units
- [ ] Add/remove favorites
- [ ] View search history
- [ ] Test on mobile/tablet/desktop
- [ ] Test dark/light mode

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Performance

- Page load: < 2s
- API response: < 1s
- Responsive on all devices
- Optimized with Vite

## License

MIT

## Documentation

- [Phase 2 Implementation Guide](PHASE2_IMPLEMENTATION.md) - Detailed setup and testing

---

**Phase**: 2 of 7 (Frontend Foundation)

**Status**: ✅ Complete - Ready for backend integration (Phase 3)
