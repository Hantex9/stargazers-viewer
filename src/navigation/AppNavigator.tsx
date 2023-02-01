import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const MainStack = createNativeStackNavigator<AppNavigatorStackParams>();

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
