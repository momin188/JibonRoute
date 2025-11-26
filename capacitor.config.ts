/// <reference types="@capacitor/app" />

import type { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize } from "@capacitor/keyboard";

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
    Keyboard: {
      resize: KeyboardResize.Body,
      resizeOnFullScreen: true,
    },
  },
};

export default config;
