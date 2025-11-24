import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.jibonroute.app",
  appName: "Jibon Route",
  webDir: "dist",
  server: {
    url: "http://100.84.154.38:8080",
    cleartext: true,
  },
};

export default config;
