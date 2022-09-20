import {
  AndroidConfig,
  ConfigPlugin,
  withAndroidManifest,
} from "@expo/config-plugins";

const ANDROID_SERVICE_KEY = "android:name";
const ANDROID_NAME_VALUE =
  "com.voximplant.foregroundservice.VIForegroundService";

const withAndroidManifestService: ConfigPlugin = (config) => {
  return withAndroidManifest(config, (config) => {
    //  <service android:name="com.voximplant.foregroundservice.VIForegroundService" />
    const services = [
      {
        $: {
          [ANDROID_SERVICE_KEY]: ANDROID_NAME_VALUE,
        },
      },
    ];
    const manifestApplication =
      AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);
    manifestApplication.service = [
      ...(manifestApplication.service || []).filter(
        (service) => service.$[ANDROID_SERVICE_KEY] !== ANDROID_NAME_VALUE
      ),
      ...services,
    ];
    console.log(manifestApplication)
    return config;
  });
};

export default withAndroidManifestService;
