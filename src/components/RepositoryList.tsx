import React from 'react';
import { View, StyleSheet } from 'react-native';

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

export const ListSeparator = () => <View style={styles.separator} />;
