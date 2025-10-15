import react from '@vitejs/plugin-react-swc'

import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'; // Вы не используете SVG как компоненты, а только как картинки → плагин вам не нужен.

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(),react()],
})
