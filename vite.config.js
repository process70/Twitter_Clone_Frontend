import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
			"/auth": {
				target: "https://twitter-clone-api.netlify.app",
			},
			"/users": {
				target: "https://twitter-clone-api.netlify.app",
			},
			"/posts": {
				target: "https://twitter-clone-api.netlify.app",
			},
			"/notifications": {
				target: "https://twitter-clone-api.netlify.app",
			},
	},
  }
})
