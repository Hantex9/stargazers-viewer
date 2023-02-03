import React, { useRef, useState } from 'react';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';

import { AppNavigatorStackParams } from '../../navigation/AppNavigator';

import { COMMON_NAV_OPTIONS } from '../../constants/commonStyle';
import useRepositoryApi from '../../hooks/useRepositoryApi';
import { RepositoriesList } from './components/RepositoriesList';

type Props = {
  navigation: StackNavigationProp<AppNavigatorStackParams, 'RepositoriesPage'>;
};

export const RepositoriesPage = ({ navigation }: Props) => {
  const [text, setText] = useState<string>();
  const [searchExecuted, setSearchExecuted] = useState<boolean>(false);
  const currentPage = useRef<number>(1);

  const repositories = useRepositoryApi();

  const searchRepositories = async (searchedText: string | undefined, page: number) => {
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
    searchRepositories(text, currentPage.current + 1);
  };

  const onSearchRepository = (searchedText: string) => {
    if (!searchedText) {
      return;
    }
    setSearchExecuted(true);
    searchRepositories(searchedText, 1);
    setText(searchedText);
  };

  return (
    <RepositoriesList
      data={!searchExecuted ? repositories.data?.items : []}
      totalElements={repositories.data?.total_count}
      onSearch={onSearchRepository}
      onLoadMore={loadMoreData}
      onSelectRepository={item => navigation.navigate('StargazersPage', { repository: item })}
      loading={repositories?.loading}
      error={repositories?.error}
      searchedText={text}
    />
  );
};

export const RepositoriesPageNavOptions: StackNavigationOptions = {
  title: 'Repositories',
  ...COMMON_NAV_OPTIONS,
};
