import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@assets': '/src/assets' // Adjust the path as per your project structure
    }
  },
  plugins: [react()],
})
