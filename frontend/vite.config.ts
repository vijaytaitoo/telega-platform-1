/// <reference types="node" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const VITE_PORT = process.env.VITE_PORT ? Number(process.env.VITE_PORT) : 5173;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tg-shop/shared': path.resolve(__dirname, '../shared/src'),
    },
  },
  server: {
    port: VITE_PORT,
    proxy: {
      '/api': 'http://localhost:3031',
    },
  },
});
