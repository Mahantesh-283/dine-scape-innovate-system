import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1384a3b70adc4a7b91963fc3b2f7f4a6',
  appName: 'dine-scape-innovate-system',
  webDir: 'dist',
  server: {
    url: 'https://1384a3b7-0adc-4a7b-9196-3fc3b2f7f4a6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a1a',
      showSpinner: false
    }
  }
};

export default config;