module.exports = {
  name: "connect_it",
  version: "1.0.0",
  extra: {
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  },
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    infoPlist: {
      NSLocationAlwaysAndWhenInUseUsageDescription: "REASON_FOR_REQUEST",
      UIBackgroundModes: ["location", "fetch"],
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
      permissions: ["ACCESS_BACKGROUND_LOCATION"],
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
};
