import AnimatedLottieView from 'lottie-react-native';
import { Stack, Text } from 'native-base';
import React from 'react';
import ReAnimated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { Animated } from 'react-native';

type WelcomeContentProps = {
  text: string;
  height?: number;
  title?: string;
};

// Common content used as Welcome Page with some kind of animations
const WelcomeContent = ({ text, height = 220, title, ...rest }: WelcomeContentProps) => (
  <Stack flex={1} px={2} {...rest}>
    <Animated.View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: height || 160,
      }}
    >
      <AnimatedLottieView
        source={require('../../assets/lotties/welcome-animation.json')}
        autoPlay
        loop
        style={{
          height,
        }}
      />
    </Animated.View>
    {title && (
      <ReAnimated.View entering={FadeInRight.duration(1000)}>
        <Text fontWeight="bold" mt={5} fontSize={24} color="muted.600" textAlign="center">
          {title}
        </Text>
      </ReAnimated.View>
    )}
    <ReAnimated.View entering={FadeInLeft.duration(1000).delay(900)}>
      <Text fontSize={24} color="muted.600" textAlign="center">
        {text}
      </Text>
    </ReAnimated.View>
  </Stack>
);

export default WelcomeContent;
