import React, { useRef, useMemo, useCallback } from 'react';
import { Divider } from 'native-base';
import { ListRenderItem, FlatList, StyleSheet } from 'react-native';

import EmptyContent from '../../../components/EmptyContent';
import RepositoryItem from '../../../components/RepositoryItem';
import { TotalCounterView } from '../../../components/TotalCounterView';
import WelcomeContent from '../../../components/WelcomeContent';
import colors from '../../../constants/colors';
import config from '../../../constants/config';
import { RepositoryInfo } from '../../../models/RepositoryResponse';
import { SearchBar } from '../../../components/SearchBar';
import { generatePlaceholderArray } from '../../../utils/generalFunctions';

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
    paddingBottom: 80,
  },
});

type RespositoriesListProps = {
  onSearch: (searchedText: string) => void | undefined;
  totalElements?: number;
  data?: RepositoryInfo[];
  loading?: boolean;
  error?: string;
  searchedText?: string;
  onSelectRepository?: (item: RepositoryInfo) => void | undefined;
  onLoadMore?: () => void | undefined;
};

// List component with the Repositories
export const RepositoriesList: React.FunctionComponent<RespositoriesListProps> = ({
  searchedText,
  loading,
  error,
  data,
  onSearch,
  onSelectRepository,
  onLoadMore,
  totalElements,
  ...rest
}) => {
  const listEndReached = useRef<boolean>(false);

  // Load more data when it reaches the end of the list
  const loadMoreData = () => {
    if (
      !loading &&
      !listEndReached.current &&
      totalElements !== undefined &&
      data?.length !== undefined &&
      totalElements > data?.length
    ) {
      onLoadMore?.();
      listEndReached.current = true;
    }
  };

  // Header of the list in a memo component in order to avoid useless re-renders
  const HeaderList = useMemo(
    () => (
      <>
        <SearchBar
          key="search-bar"
          onSubmitEditing={evt => onSearch(evt.nativeEvent.text)}
          placeholder="Search repositories..."
        />
        {totalElements && <TotalCounterView key="total-counter" pt={3} total={totalElements} />}
      </>
    ),
    [totalElements],
  );

  const EmptyListComponent = useMemo(
    () => (
      <>
        {searchedText && !loading && !error && (
          <EmptyContent key="empty-content" text={`No results for repository '${searchedText}'`} />
        )}
        {!searchedText && !loading && (
          <WelcomeContent
            key="welcome-content"
            title="Hello!"
            text="You can start this demo by searching a repository"
          />
        )}
        {searchedText && !loading && error && (
          <EmptyContent
            px={2}
            height={150}
            source={require('../../../../assets/lotties/error.json')}
            key="error-content"
            text={`There is an error: ${error}`}
          />
        )}
      </>
    ),
    [searchedText, loading],
  );

  // Footer of the component showed when there is something loading with the pagination
  const ListFooterComponent = useMemo(
    () => (
      <>
        {generatePlaceholderArray(5).map((el, index) => (
          <React.Fragment key={`skeleton-container-${index}`}>
            <RepositoryItem key={`skeleton-repo-${index}`} skeleton />
            <Divider key={`divider-repo-${index}`} />
          </React.Fragment>
        ))}
      </>
    ),
    [],
  );

  const renderItem: ListRenderItem<RepositoryInfo> = useCallback(
    ({ item }) => <RepositoryItem repository={item} onPress={() => onSelectRepository?.(item)} />,
    [],
  );

  // Method used to avoid to invoke too many times the "onEndReached" function
  const handleOnMomentumScrollBegin = () => {
    listEndReached.current = false;
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
      keyExtractor={(item, index) => `${item.full_name + index}`}
      ListHeaderComponent={HeaderList}
      ListHeaderComponentStyle={styles.headerList}
      maxToRenderPerBatch={config.defaultTotalItemsPerPage}
      initialNumToRender={config.defaultTotalItemsPerPage}
      renderItem={renderItem}
      windowSize={5}
      ListFooterComponent={loading ? ListFooterComponent : null}
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={EmptyListComponent}
      onMomentumScrollBegin={handleOnMomentumScrollBegin}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.01}
      {...rest}
    />
  );
};
