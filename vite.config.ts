import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base relativa: o build funciona na raiz de um domínio ou em subpasta
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});
