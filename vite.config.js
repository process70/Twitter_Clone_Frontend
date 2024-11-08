import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
			"/auth": {
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
			},
	},
  }
})
