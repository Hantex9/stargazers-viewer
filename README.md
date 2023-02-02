<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">Stargazers Viewer</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A Simple mobile app that allows you to view the list of stargazers in a repository (the list of users who have added it to their favorites)
    <br> 
</p>

## 📝 Table of Contents
- [Overview](#overview)
- [Getting Started](#getting_started)
- [Running the Tests](#tests)

## 🧐 Overview <a name = "overview"></a>
This project is developed in React Native with TypeScript using [Expo](https://github.com/expo/expo) since it is a simple app with two main screens:
- A first screen used to search a repository with a search bar at the top and a list of repositories found;
- A second screen used to view the list of all users who have added that repository in to their favorites.
 
The use of TypeScript was chosen to make the project more maintainable and comprehensive. Below I will indicate all the libraries used with the relative reasons of usage:

### Libraries
- [NativeBase](https://nativebase.io/): A UI library for React & React Native used for the entire app using their in-box components;
- [React Navigation 6](https://reactnavigation.org/): Used for the routing and navigation for the app, for this app is used only a Stack Navigator;
- [React Native Reanimated 2](https://github.com/software-mansion/react-native-reanimated): An Animation API, in the project is used to show animations to improve the UX;
- [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native): A library used to render animations natively, in the project it is used to show animations such as the Not Found in a list after a search and in the on boarding page at the startup of the project;
- [Axios](https://github.com/axios/axios): A promise-based HTTP Client, used to make HTTP requests (in this case to the GitHub APIs);
- [Moment](https://github.com/moment/moment): A library used for formatting dates;
- [Expo Splash Screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/): Used for pre-loading fonts and showing a Splash Screen until they are not loaded correctly;

### Utility Libraries
- [Prettier](https://prettier.io/): Used as code formatter of the project;
- [ESLint](https://github.com/eslint/eslint): A tool that analyzes code to quickly find problems used with the VSCode extension
- [Jest](https://github.com/facebook/jest): A testing library used to implements Unit Tests in the app;

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
To run this application, you will need [NodeJS](https://nodejs.org/en/) and [Expo CLI](https://expo.dev/tools) installed on your computer

### Installing
Go inside the project folder and then install the project dependencies
```
npm install
```
### Starting
To run the app locally based on the target OS run one of the following commands
```
// iOS
expo run:ios

// Android
expo run:android
```
### Building
To run the app locally based on the target OS run one of the following commands
```
// iOS
expo run:ios

// Android
expo run:android
```

End with an example of getting some data out of the system or using it for a little demo.

## 🔧 Running the tests <a name = "tests"></a>
TODO

