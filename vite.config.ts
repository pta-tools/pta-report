import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/pta-report/',
    build: {
        outDir: './docs',
    },
    server: {
        port: 10011,
    },
})
