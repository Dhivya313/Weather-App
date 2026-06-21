/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        secondary: '#FF9500',
        success: '#34C759',
        error: '#FF3B30',
        background: '#F5F7FA',
        'text-primary': '#1C1C1E',
        'text-secondary': '#8E8E93',
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['32px', '40px'],
      },
    },
  },
  plugins: [],
}
