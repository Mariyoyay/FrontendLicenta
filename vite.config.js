import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        basicSsl(),
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
        https: true,
        headers: {
            'Content-Security-Policy':
                "default-src 'self';" +
                "script-src 'self' 'sha256-NEZvGkT0ZWP6XHdKYM4B1laRPcM6Lw4LJfkDtIEVAKc=';" +
                "style-src 'self' 'unsafe-inline';" +
                "img-src 'self' https://www.shutterstock.com https://static01.nyt.com https://cdn.creazilla.com https://dentistry.co.uk data:;" +
                "frame-src https://www.google.com;" +
                "connect-src https://192.168.0.97:8443 wss://192.168.0.97:5173;" +
                "frame-ancestors 'none';" +
                "object-src 'none';"
        },
    }
})
