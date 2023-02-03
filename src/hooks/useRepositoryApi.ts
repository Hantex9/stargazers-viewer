import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import GithubServices from '../services/GithubServices';
import { RepositoryResponse } from '../models/RepositoryResponse';

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
          if (page && page > 1) {
            setData({
              ...result.data,
              items: [...(data?.items || []), ...result.data.items],
            });
          } else {
            setData(result.data);
          }
        }
      } catch (err) {
        if (mounted.current && err) {
          setError((err as any).message || 'Unexpected Error!');
        }
        console.log(err);
        throw err;
      } finally {
        if (mounted.current) {
          setLoading(false);
        }
      }
    },
    [data, loading, error],
  );

  return {
    data,
    error,
    loading,
    request,
  };
}

export default useRepositoryApi;
