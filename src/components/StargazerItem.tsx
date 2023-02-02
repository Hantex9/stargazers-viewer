import moment from 'moment';
import { Avatar, HStack, Icon, Skeleton, Text, VStack } from 'native-base';
import React, { memo } from 'react';
import { AntDesign } from '@expo/vector-icons';

import colors from '../constants/colors';
import { Stargazer } from '../models/Stargazer';
import { equalProps } from '../utils/generalFunctions';

type StargazerItemProps = {
  stargazer?: Stargazer;
  skeleton?: boolean;
};

const StargazerItem = ({ stargazer, skeleton, ...rest }: StargazerItemProps) => {
  return (
    <HStack flex={1} {...rest} mt="8px">
      {!skeleton && <Avatar mx="8px" mb="8px" size="48px" source={{ uri: stargazer?.user.avatar_url }} />}
      {skeleton && <Skeleton size="48px" mx="8px" mb="8px" endColor="gray.300" rounded="full" />}
      <VStack ml="4px" mb="10px" justifyContent="space-between" flex={1}>
        {!skeleton && (
          <>
            <Text fontWeight="bold" fontSize="16px">
              {stargazer?.user.login}
            </Text>
            <HStack alignContent="center" alignItems="center">
              {stargazer && (
                <>
                  <Icon as={<AntDesign name="staro" size={18} color={colors.primary} />} />
                  <Text color="muted.500" pl="4px" fontWeight="medium">
                    Starred at {moment(stargazer?.starred_at).format('MMM DD, YYYY')}
                  </Text>
                </>
              )}
            </HStack>
          </>
        )}
        {skeleton && (
          <>
            <Skeleton h="3" rounded="full" endColor="gray.300" width="120px" />
            <HStack alignContent="center" alignItems="center">
              <Skeleton size="16px" endColor="gray.300" rounded="full" />
              <Skeleton h="2" rounded="full" ml="4px" endColor="gray.300" width="170px" />
            </HStack>
          </>
        )}
      </VStack>
    </HStack>
  );
};

export default memo(StargazerItem, equalProps);
