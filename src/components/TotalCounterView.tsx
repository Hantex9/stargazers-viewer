import React from 'react';

import { HStack, Text } from 'native-base';
import { InterfaceHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import { normalizeStarCounter } from '../utils/generalFunctions';

type TotalCounterViewProps = {
  total?: number;
};

export const TotalCounterView = ({
  total,
  ...rest
}: InterfaceHStackProps & TotalCounterViewProps) => {
  return (
    <HStack {...rest}>
      <Text>Showing </Text>
      <Text fontWeight="semibold">{total ? normalizeStarCounter(total) : '-'}</Text>
      <Text> results</Text>
    </HStack>
  );
};
