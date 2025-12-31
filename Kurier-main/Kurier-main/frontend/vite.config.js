import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // this proxy is just for development environment later will be changed/removed when deployed on server/internet
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
      }
    }
  }
})
