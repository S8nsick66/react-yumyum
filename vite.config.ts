import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Setting the base path to '/react-yumyum/' for production builds to work with GitHub Pages
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/react-yumyum/' : '/',
  plugins: [react(), tailwindcss()],
}));
