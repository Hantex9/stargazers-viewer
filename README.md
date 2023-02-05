<h1 align="center">
<img
		width="250"
		alt="Stargazers Viewer - React Native"
		src="https://github.com/Hantex9/stargazers-viewer/blob/master/screenshots/app-preview.gif">
</h1>

<h3 align="center">Stargazers Viewer</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

</div>

---

<p align="center"> A Simple mobile app that allows you to view the list of stargazers in a repository (the list of users who have added it to their favorites)
    <br> 
</p>

## 📝 Table of Contents

- [Overview](#overview)
- [Getting Started](#getting_started)
- [App Builds](#app_builds)
- [Running the Tests](#tests)
- [Components Documentation](#components)

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
npm run ios

// Android
npm run android
```

## 📱 App builds <a name = "app_builds"></a>

If you don't want install the local environment, I provided in this project also a build for _android_ and _ios_, so you can try the app on your simulator or device just installing the apk/ios-build on it.

You can find the final builds in the [BUILDS](https://github.com/Hantex9/stargazers-viewer/tree/master/builds) directory

## 🔧 Running the tests <a name = "tests"></a>

To run tests there are available two main npm command that you can type in order to check tests.

Use this following command in order to start tests and check if they pass or not

```
npm run test
```

But if you want check also the Unit Test coverage, is available the following command:

```
npm run test-coverage
```

## 📃 Components Documentation <a name = "components"></a>
In this section i will provide you a detailed documentation of the most used and important components of the project
### `RepositoriesList`
A component that shows a list of repositories. It is paginated and can have also a search bar to filter results.

| Prop | Type | Required | Explanation |
|------|------|----------|-------------|
| `onSearch` | function | Yes | Function called when the user submits a search in the search bar. The searched text is passed as argument. |
| `totalElements` | number | No | Total number of elements in the repository. If not passed, the total counter is not displayed. |
| `data` | RepositoryInfo[] | No | Array of repository information to be displayed in the list. |
| `loading` | boolean | No | Boolean indicating whether data is being loaded. If true, a loading state is displayed. |
| `error` | string | No | Error string to be displayed in case of a failed API request. |
| `searchedText` | string | No | Text that was searched in the search bar |
| `testID` | string | No | ID for testing purposes |
| `onSelectRepository` | function | No | Function called when a repository item is selected. The selected repository information is passed as argument. |
| `onLoadMore` | function | No | Function called when the user reaches the end of the list. This can be used to load more data in a pagination scenario. |

### `RepositoryItem`
A component that displays information about a repository. This component accepts the following props:

| Prop | Type | Required | Explanation |
|------|------|----------|-------------|
| repository | `RepositoryInfo` | No | The repository information to be shown. |
| skeleton | `boolean` | No | If the component should show a skeleton. Default is false. |
| onPress | `() => void` | No | The function that will be executed when the user press the component. |

#### RepositoryInfo
An interface that describes the repository information to be displayed.

| Prop | Type | Description |
|------|------|-------------|
| full_name | `string` | The full name of the repository. |
| description | `string` | The description of the repository. |
| stargazers_count | `number` | The number of stargazers for the repository. |
| updated_at | `string` | The last updated time of the repository. |
---

### `StargazersList`
The `StargazersList` component is a flat list that displays a list of stargazers for a specific repository.

| Prop | Type | Required | Explanation |
| ---- | ---- | -------- | ----------- |
| `loading` | `boolean` | No | If `true`, displays a loading state instead of the list of stargazers. |
| `data` | `Stargazer[]` | No | An array of `Stargazer` objects representing the stargazers of the repository. |
| `repository` | `RepositoryInfo` | No | An object representing the information of the repository. |
| `error` | `string` | No | An error message displayed when there is an error fetching the data. |
| `onLoadMore` | `() => void` | No | A callback function that is called when the user reaches the end of the list to load more data. |

### `StargazerItem`
A component to display a Stargazer item with details such as username and date of starring.

| Prop       | Type         | Required | Explanation |
| ---------- | ------------ | -------- | ----------- |
| stargazer  | `Stargazer`  | No       | The Stargazer data object to display. |
| skeleton   | `boolean`    | No       | A flag to show skeleton layout when it is `true` |

#### Stargazer
This interface represents the Stargazer of a GitHub repository.

| Prop     | Type      | Required | Explanation                                                                           |
|----------|-----------|----------|---------------------------------------------------------------------------------------|
| starred_at | `Date`   | Yes      | The date that the user starred the repository.                                        |
| user      | `OwnerInfo` | Yes    | An object that holds information about the owner of the repository.                   |

#### OwnerInfo
This interface represents the owner of a GitHub repository.

| Prop      | Type     | Required | Explanation                                                 |
|-----------|----------|----------|-------------------------------------------------------------|
| login     | `string` | Yes      | The username of the owner of the repository.                |
| avatar_url | `string` | No       | The URL of the owner's profile picture on GitHub (optional). |
---
## Common Components
In the following there is a documentation of the common components of the project

### `EmptyContent`
A component for displaying an empty state with a customizable Lottie animation and text.

| Prop | Type | Required | Explanation |
| --- | --- | --- | --- |
| text | string | No | The text to display below the Lottie animation |
| source | any | No | The source of the Lottie animation. If not provided, a default Lottie animation is used |
| height | number | No | The height of the Lottie animation. Default value is 220 |

Note: The component also accepts all props from [NativeBase Stack component](https://docs.nativebase.io/stack)

### `WelcomeContent`
A component that provides a common welcome page with animated components.

| Prop        | Type           | Required  | Explanation  |
| ------------- |:-------------:| -----:| -----------:|
| text      | string | Yes | The text to be displayed in the component |
| height      | number      |   No | The height of the animation component |
| title | string      |    No | The title of the component |

### `TotalCounterView`
A component that displays the total number of results for a search.

| Prop            | Type      | Required | Explanation                                                                                                        |
|----------------|-----------|----------|--------------------------------------------------------------------------------------------------------------------|
| total          | number    | No       | The total number of results. If not provided, will display "-" as the value.                                      |
| rest           | object    | No       | Other props to be passed to the `HStack` props from [NativeBase HStack component](https://docs.nativebase.io/hstack).                              |

### `SearchBar`
A component which is used as SearchBar in the app with a predefinited style. It inherits all the props from [NativeBase Input component](https://docs.nativebase.io/input)

### `TouchableContent`
Common component used to indicate if the content (children) is touchable with a feedback based on the OS.
This component supports all the props available for the [TouchableNativeFeedback](https://reactnative.dev/docs/touchablenativefeedback) component in Android, and [TouchableOpacity](https://reactnative.dev/docs/touchableopacity) component in iOS.
