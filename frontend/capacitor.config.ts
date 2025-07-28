import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mdtravels.app',
  appName: 'MD Tours & Travels',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keyPassword: undefined,
    }
  }
};

export default config;
