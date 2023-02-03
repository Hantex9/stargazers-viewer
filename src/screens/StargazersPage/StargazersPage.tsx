import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ListRenderItem, StyleSheet } from 'react-native';
import { StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';
import { Divider, FlatList, HStack, Icon, Text } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

import colors from '../../constants/colors';
import { COMMON_NAV_OPTIONS } from '../../constants/commonStyle';
import { AppNavigatorStackParams } from '../../navigation/AppNavigator';
import EmptyContent from '../../components/EmptyContent';
import config from '../../constants/config';
import StargazerItem from '../../components/StargazerItem';
import useStargazersApi from '../../hooks/useStargazersApi';
import { Stargazer } from '../../models/Stargazer';
import { TotalCounterView } from '../../components/TotalCounterView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,
  },
  headerList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 5,
    paddingBottom: 80,
  },
});

interface Props extends StackScreenProps<AppNavigatorStackParams, 'StargazersPage'> {}

export const StargazersPage = ({ route }: Props) => {
  const repository = route.params?.repository;
  const [endReached, setEndReached] = useState<boolean>(false);
  const currentPage = useRef<number>(1);
  const listEndReached = useRef<boolean>(false);

  const stargazers = useStargazersApi();

  useEffect(() => {
    fetchStargazers();
  }, []);

  const fetchStargazers = async (page: number = 1) => {
    if (stargazers.loading || endReached) {
      return;
    }
    try {
      const response = await stargazers.request({
        userRepo: repository.owner.login,
        repoName: repository.name,
        page,
      });
      currentPage.current = page;
      if (response?.data && response.data.length === 0) {
        setEndReached(true);
      }
    } catch (err) {
      setEndReached(true);
    }
  };

  const loadMoreData = () => {
    if (!stargazers.loading && !endReached && !listEndReached.current) {
      fetchStargazers(currentPage.current + 1);
      listEndReached.current = true;
    }
  };

  const HeaderList = useMemo(
    () => (
      <>
        <HStack key="repo-name" alignItems="center">
          <Icon key="icon-repo" as={<AntDesign name="book" size={18} color={colors.primary} />} />
          <Text key="text-repo" color={colors.primary} fontSize={16} pl={1} fontWeight="semibold">
            {repository.full_name}
          </Text>
        </HStack>
        <TotalCounterView key="total-count" total={repository.stargazers_count} />
      </>
    ),
    [],
  );

  const EmptyListComponent = useMemo(
    () => (
      <>
        {!stargazers.loading && !stargazers.error && (
          <EmptyContent
            px={2}
            height={150}
            key="empty-content"
            source={require('../../../assets/lotties/ghost.json')}
            text="No one has this repository in his favorites :("
          />
        )}
        {!stargazers.loading &&
          stargazers.error &&
          (!stargazers.data || stargazers.data.length === 0) && (
            <EmptyContent
              px={2}
              height={200}
              source={require('../../../assets/lotties/error.json')}
              key="error-content"
              text={`There is an error: ${stargazers.error}`}
            />
          )}
      </>
    ),
    [stargazers.loading],
  );

  const ListFooterComponent = useMemo(
    () => (
      <>
        {[1, 2, 3, 4].map((el, index) => (
          <React.Fragment key={`footer-skeleton-${index}`}>
            <StargazerItem key={`skeleton-${index}`} skeleton />
            <Divider key={`divider-${index}`} />
          </React.Fragment>
        ))}
      </>
    ),
    [stargazers.loading],
  );

  const renderItem: ListRenderItem<Stargazer> = useCallback(
    ({ item }) => <StargazerItem stargazer={item} />,
    [],
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={stargazers.data}
      keyExtractor={item => `${item.user.login}`}
      ListHeaderComponent={stargazers.data && stargazers.data.length > 0 ? HeaderList : null}
      ListHeaderComponentStyle={styles.headerList}
      maxToRenderPerBatch={config.defaultTotalItemsPerPage}
      initialNumToRender={config.defaultTotalItemsPerPage}
      renderItem={renderItem}
      ListFooterComponent={stargazers.loading ? ListFooterComponent : null}
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={EmptyListComponent}
      onMomentumScrollBegin={() => {
        listEndReached.current = false;
      }}
      onEndReached={loadMoreData}
      windowSize={5}
      onEndReachedThreshold={0.01}
    />
  );
};

export const StargazersPageNavOptions: StackNavigationOptions = {
  title: 'Stargazers List',
  headerBackTitleVisible: false,
  ...COMMON_NAV_OPTIONS,
};
