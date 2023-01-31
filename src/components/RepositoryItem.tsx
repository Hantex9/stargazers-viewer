import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
  titleText: {
    fontWeight: 'bold',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
});

type RepositoryItemProps = {
  title: string;
  subtitle: string;
  onPress: () => void;
};

export const RepositoryItem = ({
  title,
  subtitle,
  onPress = () => null,
}: RepositoryItemProps) => {
  const rowStyles = [styles.row];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={rowStyles}>
        <Text style={[styles.titleText]}>{title}</Text>
        <Text>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};
