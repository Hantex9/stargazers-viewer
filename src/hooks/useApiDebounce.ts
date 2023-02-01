import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

const DEBOUNCE_DURATION = 400;

interface ReturnedDataDebounce<TResponse> {
  data: TResponse;
  error: any | null;
  loading: boolean;
  request: any;
  requestPaginated: any;
}

interface RequestPaginated<TRequest> {
  itemDataKey: keyof TRequest;
}

function useApiDebounce<T>(apiFunc: any): ReturnedDataDebounce<T> {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string | null>('');
  const [loading, setLoading] = useState<boolean>(true);
  const mounted = useRef<boolean>(true);

  useEffect(
    () => () => {
      mounted.current = false;
      axios.CancelToken.source().cancel('axios request cancelled');
    },
    [],
  );

  const request = useCallback(
    _.debounce(async ({ ...args }: any) => {
      if (!mounted.current) {
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunc({ ...args });
        if (mounted.current) {
          setData(result.data);
        }
      } catch (err) {
        if (mounted.current) {
          setError(err.response?.data?.message || 'Unexpected Error!');
        }
        throw err;
      } finally {
        if (mounted.current) {
          setLoading(false);
        }
      }
    }, DEBOUNCE_DURATION),
    [data],
  );

  const requestPaginated = useCallback(
    _.debounce(async ({ itemDataKey, ...args }: RequestPaginated<T>) => {
      if (!itemDataKey) {
        console.error("Devi inserire l'itemDataKey per le paginazioni");
        return;
      }
      if (!mounted.current) {
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunc({ ...args });
        if (mounted.current) {
          setData({
            ...result.data,
            [itemDataKey]: [
              ...(data && data[itemDataKey] ? data[itemDataKey] : []),
              ...result.data[itemDataKey],
            ],
          });
        }
      } catch (err) {
        if (mounted.current) {
          setError(err.response?.data?.message || 'Unexpected Error!');
        }
        console.log(err);
        throw err;
      } finally {
        if (mounted.current) {
          setLoading(false);
        }
      }
    }, DEBOUNCE_DURATION),
    [data],
  );

  return {
    data,
    error,
    loading,
    request,
    requestPaginated,
  };
};


export default useApiDebounce;