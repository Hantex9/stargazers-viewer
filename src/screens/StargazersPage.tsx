import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Text } from 'native-base';

import colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
});

export const StargazersPage = () => (
  <View style={styles.container}>
    <Text fontSize="2xl" fontWeight="bold">
      This is a header
    </Text>
    <Text fontSize="xl" fontWeight="semibold">
      This is a subheader
    </Text>
    <Text>This is normal text</Text>
  </View>
);

export const StargazersPageNavOptions: StackNavigationOptions = {
  title: 'Text Demo',
};
