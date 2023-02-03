import AnimatedLottieView from 'lottie-react-native';
import { Stack, Text } from 'native-base';
import { InterfaceStackProps } from 'native-base/lib/typescript/components/primitives/Stack/Stack';
import React from 'react';
import { Animated } from 'react-native';

type EmptyContentProps = {
  text: string;
  source?: any;
  height?: number;
};

const EmptyContent = ({
  text,
  source,
  height = 220,
  ...rest
}: EmptyContentProps & InterfaceStackProps) => (
  <Stack flex={1} {...rest}>
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
        style={{
          height,
        }}
      />
    </Animated.View>
    <Text fontWeight="bold" fontSize={24} color="muted.600" textAlign="center">
      {text}
    </Text>
  </Stack>
);

export default EmptyContent;
