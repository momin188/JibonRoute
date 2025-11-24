import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.jibonroute.app",
  appName: "Jibon Route",
  webDir: "dist",
  android: {},
  plugins: {
    StatusBar: {
      overlaysWebView: true,
    },
  },
  server: {
    url: "http://192.168.0.103:8080",
    cleartext: true,
  },
};

export default config;
