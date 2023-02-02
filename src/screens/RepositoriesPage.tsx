import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ListRenderItem, StyleSheet } from 'react-native';
import { Divider, FlatList } from 'native-base';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';

import colors from '../constants/colors';
import { AppNavigatorStackParams } from '../navigation/AppNavigator';
import RepositoryItem from '../components/RepositoryItem';

import { COMMON_NAV_OPTIONS } from '../constants/commonStyle';
import { SearchBar } from '../components/SearchBar';
import useRepositoryApi from '../hooks/useRepositoryApi';
import config from '../constants/config';
import EmptyContent from '../components/EmptyContent';
import WelcomeContent from '../components/WelcomeContent';
import { RepositoryInfo } from '../models/RepositoryResponse';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,
  },
  headerList: {
    paddingHorizontal: 5,
    paddingBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 5,
    paddingBottom: 80,
  },
});

type Props = {
  navigation: StackNavigationProp<AppNavigatorStackParams, 'RepositoriesPage'>;
};

export const RepositoriesPage = ({ navigation }: Props) => {
  const [text, setText] = useState<string>();
  const [searchExecuted, setSearchExecuted] = useState<boolean>(false);
  const currentPage = useRef<number>(1);
  const listEndReached = useRef<boolean>(false);

  const repositories = useRepositoryApi();

  const searchRepositories = async (searchedText: string | undefined, page: number = currentPage.current) => {
    try {
      await repositories.request({ text: searchedText, page });
      currentPage.current = page;
    } catch (err) {
      console.log(err);
    } finally {
      setSearchExecuted(false);
    }
  };

  const loadMoreData = () => {
    if (
      !repositories.loading &&
      !listEndReached.current &&
      repositories.data?.total_count !== undefined &&
      repositories.data?.items &&
      repositories.data?.total_count > repositories.data?.items.length
    ) {
      searchRepositories(text, currentPage.current + 1);
      listEndReached.current = true;
    }
  };

  const onSearchRepository = (searchedText: string) => {
    if (!searchedText) {
      return;
    }
    setSearchExecuted(true);
    searchRepositories(searchedText, 0);
    setText(searchedText);
  };

  const HeaderList = useMemo(
    () => (
      <SearchBar
        onSubmitEditing={evt => onSearchRepository(evt.nativeEvent.text)}
        placeholder="Search repositories..."
      />
    ),
    [],
  );

  const EmptyListComponent = useMemo(
    () => (
      <>
        {text && !repositories.loading && !repositories.error && (
          <EmptyContent key="empty-content" text={`No results for repository '${text}'`} />
        )}
        {!text && !repositories.loading && (
          <WelcomeContent
            key="welcome-content"
            title="Hello!"
            text="You can start this demo by searching a repository"
          />
        )}
        {text && !repositories.loading && repositories.error && (
          <EmptyContent
            height={200}
            source={require('../../assets/lotties/error.json')}
            key="empty-content"
            text={`${repositories.error}`}
          />
        )}
      </>
    ),
    [text, repositories.loading],
  );

  const ListFooterComponent = useMemo(
    () => (
      <>
        {repositories.loading && (
          <>
            <RepositoryItem key="1" skeleton />
            <Divider key="el" />
            <RepositoryItem key="2" skeleton />
            <Divider key="sep" />
            <RepositoryItem key="3" skeleton />
          </>
        )}
      </>
    ),
    [repositories.loading],
  );

  const renderItem: ListRenderItem<RepositoryInfo> = useCallback(
    ({ item }) => (
      <RepositoryItem repository={item} onPress={() => navigation.navigate('StargazersPage', { repository: item })} />
    ),
    [],
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={!searchExecuted ? repositories.data?.items : []}
      keyExtractor={(item, index) => `${item.full_name + index}`}
      ListHeaderComponent={HeaderList}
      ListHeaderComponentStyle={styles.headerList}
      maxToRenderPerBatch={config.defaultTotalItemsPerPage}
      initialNumToRender={config.defaultTotalItemsPerPage}
      renderItem={renderItem}
      windowSize={5}
      ListFooterComponent={ListFooterComponent}
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={EmptyListComponent}
      onMomentumScrollBegin={() => (listEndReached.current = false)}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.01}
    />
  );
};

export const RepositoriesPageNavOptions: StackNavigationOptions = {
  title: 'Repositories',
  ...COMMON_NAV_OPTIONS,
};
