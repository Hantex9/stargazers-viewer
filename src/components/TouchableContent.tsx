import {
  Platform,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';

// Common component used to indicate if the content (children) is touchable with a feedback based on the OS
export const TouchableContent: React.FunctionComponent<
  TouchableNativeFeedbackProps | TouchableOpacityProps
> = ({ children, ...rest }) => {
  return Platform.OS === 'android' ? (
    <TouchableNativeFeedback {...rest}>{children}</TouchableNativeFeedback>
  ) : (
    <TouchableOpacity activeOpacity={0.6} {...rest}>
      {children}
    </TouchableOpacity>
  );
};
