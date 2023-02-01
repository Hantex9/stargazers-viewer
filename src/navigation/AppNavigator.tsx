import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {
  RepositoriesPage,
  RepositoriesPageNavOptions,
} from '../screens/RepositoriesPage';
import {
  StargazersPage,
  StargazersPageNavOptions,
} from '../screens/StargazersPage';

export type AppNavigatorStackParams = {
  RepositoriesPage: undefined;
  StargazersPage: undefined;
};

const MainStack = createStackNavigator<AppNavigatorStackParams>();

export const AppNavigator = () => (
  <NavigationContainer>
    <MainStack.Navigator>
      <MainStack.Screen
        name="RepositoriesPage"
        component={RepositoriesPage}
        options={RepositoriesPageNavOptions}
      />
      {/* <MainStack.Screen
        name="StargazersPage"
        component={StargazersPage}
        options={StargazersPageNavOptions}
      /> */}
    </MainStack.Navigator>
  </NavigationContainer>
);
