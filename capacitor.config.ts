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
};

export default config;
