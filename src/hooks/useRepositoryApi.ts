import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import GithubServices from '../services/GithubServices';
import { RepositoryResponse } from '../models/RepositoryResponse';

const DEBOUNCE_DURATION = 300;

interface RequestRepository {
  text?: string | undefined;
  page?: number;
  totalItems?: number;
}

interface ReturnedRepositoryHook {
  data?: RepositoryResponse;
  error?: any;
  loading: boolean;
  request: (request: RequestRepository) => any;
}

function useRepositoryApi(): ReturnedRepositoryHook {
  const [data, setData] = useState<RepositoryResponse>();
  const [error, setError] = useState<string | null>('');
  const [loading, setLoading] = useState<boolean>(false);
  const mounted = useRef<boolean>(true);

  useEffect(
    () => () => {
      mounted.current = false;
      axios.CancelToken.source().cancel('axios request cancelled');
    },
    [],
  );

  const request = useCallback(
    async ({ text, page, totalItems }: RequestRepository) => {
      if (!mounted.current) {
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const result = await GithubServices.findRepositories(
          text,
          page,
          totalItems,
        );
        if (mounted.current) {
          setData({
            ...result.data,
            items: [...(data?.items || []), ...result.data.items],
          });
        }
      } catch (err) {
        if (mounted.current && err instanceof Error) {
          setError(err?.message || 'Unexpected Error!');
        }
        console.log(err);
        throw err;
      } finally {
        if (mounted.current) {
          setLoading(false);
        }
      }
    },
    [data],
  );

  return {
    data,
    error,
    loading,
    request,
  };
}

export default useRepositoryApi;
