import {
  Platform,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';

export const TouchableContent = ({
  children,
  ...rest
}: TouchableNativeFeedbackProps | TouchableOpacityProps) => {
  return Platform.OS === 'android' ? (
    <TouchableNativeFeedback {...rest}>{children}</TouchableNativeFeedback>
  ) : (
    <TouchableOpacity activeOpacity={0.6} {...rest}>
      {children}
    </TouchableOpacity>
  );
};
