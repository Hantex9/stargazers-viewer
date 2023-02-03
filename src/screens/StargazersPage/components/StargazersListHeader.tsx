import React, { memo } from 'react';
import { HStack, Icon, Text } from 'native-base';
import { InterfaceHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import { AntDesign } from '@expo/vector-icons';

import colors from '../../../constants/colors';
import { equalProps } from '../../../utils/generalFunctions';
import { TotalCounterView } from '../../../components/TotalCounterView';

type StargazersListHeaderProps = {
  name: string;
  counter?: number;
};

// Header of the Stargazers List indicating the repo's name and the star counter
const StargazersListHeader: React.FunctionComponent<
  StargazersListHeaderProps & InterfaceHStackProps
> = ({ name, counter, ...rest }) => {
  return (
    <>
      <HStack alignItems="center" {...rest}>
        <Icon as={<AntDesign name="book" size={18} color={colors.primary} />} />
        <Text color={colors.primary} fontSize={16} pl={1} fontWeight="semibold">
          {name}
        </Text>
      </HStack>
      {counter && <TotalCounterView total={counter} />}
    </>
  );
};

export default memo(StargazersListHeader, equalProps);
