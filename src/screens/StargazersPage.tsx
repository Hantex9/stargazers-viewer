import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ListRenderItem, StyleSheet } from 'react-native';
import { StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';
import { Divider, FlatList } from 'native-base';

import colors from '../constants/colors';
import { COMMON_NAV_OPTIONS } from '../constants/commonStyle';
import { AppNavigatorStackParams } from '../navigation/AppNavigator';
import EmptyContent from '../components/EmptyContent';
import RepositoryItem from '../components/RepositoryItem';
import config from '../constants/config';
import StargazerItem from '../components/StargazerItem';
import useStargazersApi from '../hooks/useStargazersApi';
import { Stargazer } from '../models/Stargazer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,
  },
  headerList: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 5,
    paddingBottom: 80,
  },
});

interface Props extends StackScreenProps<AppNavigatorStackParams, 'StargazersPage'> {}

export const StargazersPage = ({ route, navigation }: Props) => {
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

  const EmptyListComponent = useMemo(
    () => (
      <>
        {!stargazers.loading && (
          <EmptyContent
            px={2}
            key="empty-content"
            source={require('../../assets/lotties/ghost.json')}
            text="No one has this repository in their favorites :("
          />
        )}
        {!stargazers.loading && stargazers.error && stargazers.data?.length === 0 && (
          <EmptyContent
            height={200}
            source={require('../../assets/lotties/error.json')}
            key="empty-content"
            text={`${stargazers.error}`}
          />
        )}
      </>
    ),
    [stargazers.loading],
  );

  const ListFooterComponent = useMemo(
    () => (
      <>
        {stargazers.loading && (
          <>
            <StargazerItem key="1" skeleton />
            <Divider key="el" />
            <StargazerItem key="2" skeleton />
            <Divider key="sep" />
            <StargazerItem key="3" skeleton />
            <Divider key="sep3" />
            <StargazerItem key="4" skeleton />
            <Divider key="sep4" />
            <StargazerItem key="5" skeleton />
          </>
        )}
      </>
    ),
    [stargazers.loading],
  );

  const renderItem: ListRenderItem<Stargazer> = useCallback(({ item }) => <StargazerItem stargazer={item} />, []);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={stargazers.data}
      keyExtractor={item => `${item.user.login}`}
      // ListHeaderComponent={HeaderList}
      ListHeaderComponentStyle={styles.headerList}
      maxToRenderPerBatch={config.defaultTotalItemsPerPage}
      initialNumToRender={config.defaultTotalItemsPerPage}
      renderItem={renderItem}
      ListFooterComponent={ListFooterComponent}
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
