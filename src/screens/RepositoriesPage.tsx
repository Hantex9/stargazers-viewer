import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Button } from 'native-base';

import colors from '../constants/colors';
import { ListSeparator } from '../components/RepositoryList';
import { AppNavigatorStackParams } from '../navigation/AppNavigator';
import GithubServices from '../services/GithubServices';
import { RepositoryItem } from '../components/RepositoryItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 20,
  },
});

const screens = [
  {
    title: 'Text',
    subtitle: 'An example of using the Text.js components.',
    target: 'DetailsPage',
  },
  {
    title: 'Form',
    subtitle: 'An example of using the Form.js components.',
    target: 'FormDemo',
  },
  {
    title: 'Button',
    subtitle: 'An example of using the Button.js components.',
    target: 'ButtonDemo',
  },
];

type Props = {
  navigation: NativeStackNavigationProp<
    AppNavigatorStackParams,
    'RepositoriesPage'
  >;
};

export const RepositoriesPage = ({ navigation }: Props) => {
  const [text, setText] = useState<string>();

  console.log(text);

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerBackground: () => <></>,
      headerSearchBarOptions: {
        placeholder: 'Search repositories...',
        autoCapitalize: 'none',
        hideWhenScrolling: false,
        onChangeText: evt => setText(evt.nativeEvent.text),
      },
    });
  }, []);

  return (
    <FlatList
      style={styles.container}
      contentInsetAdjustmentBehavior="automatic"
      data={screens}
      keyExtractor={item => item.title}
      renderItem={({ item }) => (
        <RepositoryItem
          title={item.title}
          subtitle={item.subtitle}
          // @ts-ignore
          // Disabling the next line because all the item.targets are valid - that data just
          // isn't getting picked up by TypeScript
          onPress={() => navigation.push(item.target)}
        />
      )}
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
  );
};

export const RepositoriesPageNavOptions: NativeStackNavigationOptions = {
  title: 'Repositories',
};
