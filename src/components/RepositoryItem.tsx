import { HStack, Icon, Skeleton, Text, VStack } from 'native-base';
import React, { memo } from 'react';
import { TouchableNativeFeedbackProps, TouchableOpacityProps } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';

import colors from '../constants/colors';
import { RepositoryInfo } from '../models/RepositoryResponse';
import { equalProps, normalizeStarCounter } from '../utils/generalFunctions';
import { TouchableContent } from './TouchableContent';

type RepositoryItemProps = {
  repository?: RepositoryInfo;
  skeleton?: boolean;
  onPress?: () => void;
};

// Item component showed into the Repository List
const RepositoryItem: React.FunctionComponent<
  RepositoryItemProps & (TouchableNativeFeedbackProps | TouchableOpacityProps)
> = ({ repository, skeleton, onPress = () => null, ...rest }) => {
  return (
    <TouchableContent onPress={onPress} testID="repository-item" {...rest}>
      <HStack px="15px" py="12px">
        <VStack pr="6px" pt="5px">
          {skeleton ? (
            <Skeleton testID="skeleton-repository" size="18px" endColor="gray.300" rounded="full" />
          ) : (
            <Icon as={<AntDesign name="book" size={18} color={colors.primary} />} />
          )}
        </VStack>
        <VStack flex={1}>
          {!skeleton && repository && (
            <>
              <Text
                testID="repository-name"
                color={colors.primary}
                fontSize={16}
                fontWeight="semibold"
              >
                {repository.full_name}
              </Text>
              {repository.description && (
                <Text testID="repository-description" numberOfLines={4} fontSize={14}>
                  {repository.description}
                </Text>
              )}
            </>
          )}
          {skeleton && <Skeleton.Text endColor="gray.300" />}
          <HStack pt="14px" justifyContent="space-between" alignItems="center">
            <HStack alignItems="center">
              {!skeleton && repository && (
                <>
                  <Icon as={<AntDesign name="staro" size={18} color={colors.primary} />} />
                  <Text testID="repository-star-counter" fontSize={14} pl="4px">
                    {normalizeStarCounter(repository.stargazers_count)}
                  </Text>
                </>
              )}
              {skeleton && (
                <>
                  <Skeleton size="16px" endColor="gray.300" rounded="full" />
                  <Skeleton h="3" rounded="full" ml="4px" endColor="gray.300" width="50px" />
                </>
              )}
            </HStack>
            {!skeleton && repository && (
              <Text testID="repository-updated-at-text" color="muted.500">
                Updated on {moment(repository.updated_at).format('MMM D, YYYY')}
              </Text>
            )}
            {skeleton && <Skeleton h="3" rounded="full" endColor="gray.300" width="50%" />}
          </HStack>
        </VStack>
      </HStack>
    </TouchableContent>
  );
};

export default memo(RepositoryItem, equalProps);
