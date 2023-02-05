import { StackNavigationOptions } from '@react-navigation/stack';
import { SearchBarProps } from 'react-native-screens';
import colors from './colors';

export const COMMON_NAV_OPTIONS: StackNavigationOptions = {
  headerTintColor: '#ffffff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerStyle: {
    backgroundColor: colors.primary,
  },
};