const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Mantenemos la configuración de SQLite
config.resolver.assetExts.push("wasm");

// Envolvemos la configuración con NativeWind
module.exports = withNativeWind(config, { input: "./global.css" });