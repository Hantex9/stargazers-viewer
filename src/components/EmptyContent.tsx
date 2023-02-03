import AnimatedLottieView from 'lottie-react-native';
import { Stack, Text } from 'native-base';
import { InterfaceStackProps } from 'native-base/lib/typescript/components/primitives/Stack/Stack';
import React from 'react';
import { Animated } from 'react-native';

type EmptyContentProps = {
  text?: string;
  source?: any;
  height?: number;
};

// Component used for the empy content in a List with the Lottie animation and text customizable
const EmptyContent = ({
  text,
  source,
  height = 220,
  ...rest
}: EmptyContentProps & InterfaceStackProps) => (
  <Stack testID="empty-content" flex={1} {...rest}>
    <Animated.View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: height || 160,
      }}
    >
      <AnimatedLottieView
        source={source || require('../../assets/lotties/no-data.json')}
        autoPlay
        loop
        testID="lottie-animation"
        style={{
          height,
        }}
      />
    </Animated.View>
    {text && (
      <Text fontWeight="bold" fontSize={24} color="muted.600" textAlign="center">
        {text}
      </Text>
    )}
  </Stack>
);

export default EmptyContent;
