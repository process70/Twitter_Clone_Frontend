import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
			"/auth": {
				target: "https://twitter_clone_backend.onrender.com",
				changeOrigin: true,
			},
			"/users": {
				target: "https://twitter_clone_backend.onrender.com",
				changeOrigin: true,
			},
			"/posts": {
				target: "https://twitter_clone_backend.onrender.com",
				changeOrigin: true,
			},
			"/notifications": {
				target: "https://twitter_clone_backend.onrender.com",
				changeOrigin: true,
			},
	},
  }
})
