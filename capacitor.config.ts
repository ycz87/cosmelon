import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.cosmelon.clock',
  appName: 'Cosmelon Clock',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
