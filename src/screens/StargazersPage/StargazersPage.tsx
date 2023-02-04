import React, { useEffect, useRef, useState } from 'react';
import { StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';

import { COMMON_NAV_OPTIONS } from '../../constants/commonStyle';
import { AppNavigatorStackParams } from '../../navigation/AppNavigator';
import { useStargazersApi } from '../../hooks/useStargazersApi';
import { StargazersList } from './components/StargazersList';

interface Props extends StackScreenProps<AppNavigatorStackParams, 'StargazersPage'> {}

export const StargazersPage = ({ route }: Props) => {
  const repository = route.params?.repository;
  const [endReached, setEndReached] = useState<boolean>(false);
  const currentPage = useRef<number>(1);

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
    if (!stargazers.loading && !endReached) {
      fetchStargazers(currentPage.current + 1);
    }
  };

  return (
    <StargazersList
      repository={repository}
      data={stargazers.data}
      loading={stargazers.loading}
      error={stargazers.error}
      onLoadMore={loadMoreData}
    />
  );
};

export const StargazersPageNavOptions: StackNavigationOptions = {
  title: 'Stargazers List',
  headerBackTitleVisible: false,
  ...COMMON_NAV_OPTIONS,
};
