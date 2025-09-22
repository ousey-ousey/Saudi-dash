import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from './eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      include: ['src/**/*.{js,jsx}', 'public/**/*.{js,jsx}']
    }),
  ],
})
