import React from 'react';

import { Icon, IInputProps, Input } from 'native-base';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Common component used as a SearchBar
export const SearchBar = ({ ...rest }: IInputProps) => {
  return (
    <Input
      testID="searchbar"
      width="100%"
      borderRadius="12"
      py="3"
      px="1"
      fontSize="15"
      h="45px"
      clearButtonMode="while-editing"
      returnKeyType="search"
      autoCapitalize="none"
      autoCorrect={false}
      InputLeftElement={
        <Icon
          m="2"
          ml="2"
          size="6"
          name="search"
          color="gray.400"
          as={<MaterialIcons name="search" />}
        />
      }
      {...rest}
    />
  );
};
