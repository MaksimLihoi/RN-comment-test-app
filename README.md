# Project Overview

This project enables users to leave comments with a cascading display of replies. All user and comment data are stored
in a local relational database on the device.

## Main Features

### 1. Registration and Authentication

- Users register by providing an **email** and a **username**.
- The system ensures the **email is unique**.
- After registration or login, the **user's ID** is saved and passed between screens.

### 2. Adding Comments

- Users can add new comments from the main screen.
- **Cascading replies** allow users to respond to existing comments.
- A tree-like comment structure displays replies hierarchically.

### 3. Database

- **SQLite** is used to store users and comments locally.
- **SQL queries** handle operations for adding and fetching user and comment data.

### 4. Pagination (Pending Implementation)

- The comment list will paginate, displaying **25 comments per page**.

---

# Getting Started with launch

```bash
node v20.16.0
ruby 3.0.0
java 17 (openjdk@17)
```

## Step 0: Start the Metro Server

```bash
npm install
cd ios && pod install && cd ..
```

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
npm start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the
following command to start your _Android_ or _iOS_ app:

### For Android

```bash
npm run android

build for android: 

1. cd android 
2. ./gradlew assembleRelease


```

### For iOS

```bash
npm run ios

build for ios: 

1. cd ios
2. pod install (to confirm that pods installed)
3. xcodebuild -workspace CommentsApp.xcworkspace -scheme CommentsApp -configuration Release -sdk iphoneos

```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_
shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
If commands didn't open application on simulator try to open it directly from the XCode or Android Studio

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.
