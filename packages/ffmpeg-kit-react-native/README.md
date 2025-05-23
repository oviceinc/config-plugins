# config-plugins/ffmpeg-kit-react-native

Config plugin to auto-configure `ffmpeg-kit-react-native` when the native code is generated (`expo prebuild`).

## Versioning

| `expo` | `ffmpeg-kit-react-native` | `@config-plugins/ffmpeg-kit-react-native` |
| ------ | ------------------------- | ----------------------------------------- |
| 46.0.0 | 4.5.2                     | ^3.0.0                                    |
| 45.0.0 | 4.5.1                     | ^2.0.0                                    |

## Expo installation

> Tested against Expo SDK 46. Most packages worked on iOS. Not all packages have been tested on Android.

> This package cannot be used in the "Expo Go" app because [it requires custom native code](https://docs.expo.io/workflow/customizing/).
> First install the package with yarn, npm, or [`expo install`](https://docs.expo.io/workflow/expo-cli/#expo-install).

```sh
yarn add ffmpeg-kit-react-native @config-plugins/ffmpeg-kit-react-native
```

After installing this npm package, add the [config plugin](https://docs.expo.io/guides/config-plugins/) to the [`plugins`](https://docs.expo.io/versions/latest/config/app/#plugins) array of your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": ["@config-plugins/ffmpeg-kit-react-native"]
  }
}
```

Next, rebuild your app as described in the ["Adding custom native code"](https://docs.expo.io/workflow/customizing/) guide.

## API

The plugin provides props for extra customization. Every time you change the props or plugins, you'll need to rebuild (and `prebuild`) the native app. If no extra properties are added, defaults will be used.

- `package` (_string_): Package to use. Options are: `min`, `min-gpl`, `https`, `https-gpl`, `audio`, `video`, `full`, `full-gpl`. [Learn more](https://github.com/tanersener/ffmpeg-kit/tree/main/react-native#211-package-names).
- `ios.package` (_string_): Specify an iOS-only package.
- `android.package` (_string_): Specify an Android-only package.

#### Example

```json
{
  "expo": {
    "plugins": [
      [
        "@config-plugins/ffmpeg-kit-react-native",
        {
          "package": "min",
          "ios": {
            "package": "video"
          }
        }
      ]
    ]
  }
}
```

## Important Notes

- This plugin changes the minimum deployment target on Android to `24` (from `21`) which may break other packages in your app!
- Changing the "package" field on iOS will require re-running `pod install` after updating with `expo prebuild -p ios --no-install`.
- Most of the modifications in this plugin are dangerous meaning it's highly likely that something may break over time. The plugin is heavily unit-tested to attempt to prevent breaking.
