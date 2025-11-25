/// <reference types="@capacitor/app" />

import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.jibonroute.app",
  appName: "Jibon Route",
  webDir: "dist",
  android: {},
  plugins: {
    App: {
      // disableBackButtonHandler: true,
    },
    StatusBar: {
      overlaysWebView: true,
    },
  },
};

export default config;
