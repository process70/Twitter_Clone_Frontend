import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
			"/auth": {
<<<<<<< HEAD
				target: "https://twitter-clone-backend-y6u4.onrender.com",
			},
			"/users": {
				target: "https://twitter-clone-backend-y6u4.onrender.com",
			},
			"/posts": {
				target: "https://twitter-clone-backend-y6u4.onrender.com",
			},
			"/notifications": {
				target: "https://twitter-clone-backend-y6u4.onrender.com",
=======
				target: "http://localhost:5000",
				changeOrigin: true,
			},
			"/users": {
				target: "http://localhost:5000",
				changeOrigin: true,
			},
			"/posts": {
				target: "http://localhost:5000",
				changeOrigin: true,
			},
			"/notifications": {
				target: "http://localhost:5000",
				changeOrigin: true,
>>>>>>> 56c96dcde60e53fd6ce328add9bce3702b4f3326
			},
	},
  }
})
