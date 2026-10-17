import { defineConfig } from '@playwright/test';

// Em máquinas comuns, `npx playwright install chromium` basta.
// Aqui um Chromium já instalado pode ser indicado por CHROMIUM_PATH.
const executablePath = process.env.CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  use: { baseURL: 'http://localhost:4173', launchOptions: { executablePath } },
  webServer: { command: 'npm run build && npx vite preview --port 4173 --strictPort', port: 4173, reuseExistingServer: true },
});
