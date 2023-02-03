import React, { useCallback, useMemo, useRef } from 'react';
import { ListRenderItem, StyleSheet } from 'react-native';
import { Divider, FlatList } from 'native-base';

import colors from '../../../constants/colors';
import EmptyContent from '../../../components/EmptyContent';
import config from '../../../constants/config';
import StargazerItem from '../../../components/StargazerItem';
import { Stargazer } from '../../../models/Stargazer';
import { RepositoryInfo } from '../../../models/RepositoryResponse';
import StargazersListHeader from './StargazersListHeader';
import { generatePlaceholderArray } from '../../../utils/generalFunctions';

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

type StargazersListProps = {
  loading?: boolean;
  data?: Stargazer[];
  repository?: RepositoryInfo;
  error?: string;
  onLoadMore?: () => void;
};

export const StargazersList: React.FunctionComponent<StargazersListProps> = ({
  data,
  repository,
  loading,
  error,
  onLoadMore,
}) => {
  const listEndReached = useRef<boolean>(false);

  const loadMoreData = () => {
    if (!listEndReached.current) {
      onLoadMore?.();
      listEndReached.current = true;
    }
  };

  const EmptyListComponent = useMemo(
    () => (
      <>
        {!loading && !error && (
          <EmptyContent
            px={2}
            height={150}
            key="empty-content"
            source={require('../../../../assets/lotties/ghost.json')}
            text="No one has this repository in his favorites :("
          />
        )}
        {!loading && error && (!data || data.length === 0) && (
          <EmptyContent
            px={2}
            height={200}
            source={require('../../../../assets/lotties/error.json')}
            key="error-content"
            text={`There is an error: ${error}`}
          />
        )}
      </>
    ),
    [loading],
  );

  const ListFooterComponent = useMemo(
    () => (
      <>
        {generatePlaceholderArray(5).map((el, index) => (
          <React.Fragment key={`footer-skeleton-${index}`}>
            <StargazerItem key={`skeleton-${index}`} skeleton />
            <Divider key={`divider-${index}`} />
          </React.Fragment>
        ))}
      </>
    ),
    [loading],
  );

  const renderItem: ListRenderItem<Stargazer> = useCallback(
    ({ item }) => <StargazerItem stargazer={item} />,
    [],
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={data}
      keyExtractor={item => `${item.user.login}`}
      ListHeaderComponent={
        data && data.length > 0 && repository ? (
          <StargazersListHeader
            name={repository?.full_name}
            counter={repository?.stargazers_count}
          />
        ) : null
      }
      ListHeaderComponentStyle={styles.headerList}
      maxToRenderPerBatch={config.defaultTotalItemsPerPage}
      initialNumToRender={config.defaultTotalItemsPerPage}
      renderItem={renderItem}
      ListFooterComponent={loading ? ListFooterComponent : null}
      ItemSeparatorComponent={Divider}
      ListEmptyComponent={EmptyListComponent}
      onMomentumScrollBegin={() => {
        // Method used to avoid to invoke too many times the "onEndReached" function
        listEndReached.current = false;
      }}
      onEndReached={loadMoreData}
      windowSize={5}
      onEndReachedThreshold={0.01}
    />
  );
};
