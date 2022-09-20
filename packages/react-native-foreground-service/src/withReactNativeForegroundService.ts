import {
  AndroidConfig,
  ConfigPlugin,
  createRunOncePlugin,
} from "@expo/config-plugins";
import withAndroidManifestService from "./withAndroidManifestService";
/**
 * Apply react-native-foreground-service configuration for Expo SDK 42 projects.
 */
const withReactNativeForegroundService: ConfigPlugin<{} | void> = (
  config,
  _props = {}
) => {
  // Support passing no props to the plugin.
  const props = _props || {};

  config = AndroidConfig.Permissions.withPermissions(config, [
    "android.permission.FOREGROUND_SERVICE",
  ]);

  // Return the modified config.
  return withAndroidManifestService(config);
};

const pkg = {
  // Prevent this plugin from being run more than once.
  // This pattern enables users to safely migrate off of this
  // out-of-tree `@config-plugins/react-native-foreground-service` to a future
  // upstream plugin in `react-native-foreground-service`
  name: "react-native-foreground-service",
  // Indicates that this plugin is dangerously linked to a module,
  // and might not work with the latest version of that module.
  version: "3.0.2",
};

export default createRunOncePlugin(
  withReactNativeForegroundService,
  pkg.name,
  pkg.version
);
