# Chrome Weather Extension

## How to install on chrome?

1. Download the [release](https://github.com/madebyaman/chrome-weather-extension/releases/tag/publish)
2. Unzip the downloaded folder.
3. Go to [Chrome Extensions Page](chrome://extensions/)
4. Turn on the Developer mode.
5. Click 'Load Unpacked' and select the unzipped folder.
6. This is it! You can now enjoy using the Weather Chrome Extension.

## How to get started developing?

Step 1: Install node modules

```sh
npm i
```

Step 2: Run `npm start` to start webpack and compile the modules into a `dist/` folder.
Step 3: Now you can load the unpacked folder in Chrome.

## Features

- Uses Chrome Alarms API to update and show weather of your home city every hour.
- Use Chrome Storage API to store the data.
- Content Script is used to load the weather of your home city in the current page.
- Additionally, you can see the weather of more cities using the extension.
