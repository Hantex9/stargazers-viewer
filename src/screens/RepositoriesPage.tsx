import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Divider, FlatList } from 'native-base';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';

import colors from '../constants/colors';
import { AppNavigatorStackParams } from '../navigation/AppNavigator';
import RepositoryItem from '../components/RepositoryItem';

import { COMMON_NAV_OPTIONS } from '../constants/commonStyle';
import { SearchBar } from '../components/SearchBar';
import useRepositoryApi from '../hooks/useRepositoryApi';
import config from '../constants/config';
import EmptyContent from '../components/EmptyContent';
import WelcomeContent from '../components/WelcomeContent';

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

type Props = {
  navigation: StackNavigationProp<AppNavigatorStackParams, 'RepositoriesPage'>;
};

export const RepositoriesPage = ({ navigation }: Props) => {
  const [text, setText] = useState<string>();
  const [searchExecuted, setSearchExecuted] = useState<boolean>(false);
  const currentPage = useRef<number>(1);

  const repositories = useRepositoryApi();

  const searchRepositories = async (
    searchedText: string | undefined,
    page: number = currentPage.current,
  ) => {
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
      repositories.data?.total_count !== undefined &&
      repositories.data?.items &&
      repositories.data?.total_count > repositories.data?.items.length
    ) {
      searchRepositories(text, currentPage.current + 1);
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
        {text && !repositories.loading && (
          <EmptyContent
            key="empty-content"
            text={`No results for repository '${text}'`}
          />
        )}
        {!text && (
          <WelcomeContent
            key="welcome-content"
            title="Hello!"
            text="You can start this demo by searching a repository"
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
      renderItem={({ item }) => (
        <RepositoryItem
          repository={item}
          // @ts-ignore
          // Disabling the next line because all the item.targets are valid - that data just
          // isn't getting picked up by TypeScript
          onPress={() => navigation.push('StargazersPage')}
        />
      )}
      ListFooterComponent={ListFooterComponent}
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={EmptyListComponent}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.01}
    />
  );
};

export const RepositoriesPageNavOptions: StackNavigationOptions = {
  title: 'Repositories',
  ...COMMON_NAV_OPTIONS,
};
