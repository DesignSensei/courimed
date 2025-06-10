module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@components": "./app/components",
            "@constants": "./app/constants",
            "@data": "./app/data",
            "@assets": "./assets",
            "@images": "./assets/images",
            "@fonts": "./assets/fonts",
            "@auth": "./app/(auth)",
            "@customer": "./app/(app)/customer",
            "@courier": "./app/(app)/courier",
            "@orders": "./app/(app)/orders",
            "@profile": "./app/(app)/profile",
            "@business": "./app/business-onboarding",
            "@onboarding": "./app/onboarding"
          }
        }
      ]
    ]
  };
};
