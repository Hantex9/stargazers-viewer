import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {
  RepositoriesPage,
  RepositoriesPageNavOptions,
} from '../screens/RepositoriesPage/RepositoriesPage';
import { StargazersPage, StargazersPageNavOptions } from '../screens/StargazersPage/StargazersPage';
import { RepositoryInfo } from '../models/RepositoryResponse';

export type AppNavigatorStackParams = {
  RepositoriesPage: undefined;
  StargazersPage: { repository: RepositoryInfo };
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
      <MainStack.Screen
        name="StargazersPage"
        component={StargazersPage}
        options={StargazersPageNavOptions}
      />
    </MainStack.Navigator>
  </NavigationContainer>
);
