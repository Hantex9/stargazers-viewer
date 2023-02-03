import { useCallback, useEffect, useRef, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import GithubServices, { RequestStargazer } from '../services/GithubServices';
import { Stargazer } from '../models/Stargazer';

interface ReturnedRepositoryHook {
  data?: Stargazer[];
  error?: any;
  loading: boolean;
  request: (request: RequestStargazer) => any;
}

function useStargazersApi(): ReturnedRepositoryHook {
  const [data, setData] = useState<Stargazer[]>();
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
    async ({ userRepo, repoName, page, totalItems }: RequestStargazer): Promise<AxiosResponse<Stargazer[], any> | null> => {
      if (!mounted.current) {
        return null;
      }
      setLoading(true);
      setError(null);
      try {
        const result = await GithubServices.getRepoStargazers({
          userRepo,
          repoName,
          page,
          totalItems,
        });
        if (mounted.current) {
          if (page && page > 1) {
            setData([...(data || []), ...result.data]);
          } else {
            setData(result.data)
          }
          setLoading(false);
        }
        return result;
      } catch (err) {
        if (mounted.current) {
          setError((err as any)?.message || 'Unexpected Error!');
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

export default useStargazersApi;
