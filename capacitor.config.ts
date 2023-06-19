import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sevedev.basedbook',
  appName: 'BasedBook',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    hostname: "basedbook.sevedev.com"
  },
  plugins: {
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
