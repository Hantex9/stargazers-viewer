import { renderHook, act } from '@testing-library/react-hooks';
import { useRepositoryApi } from '../useRepositoryApi';
import GithubServices from '../../services/GithubServices';
import { RepositoryResponse } from '../../models/RepositoryResponse';
import { AxiosResponse } from 'axios';

jest.mock('axios');
jest.mock('../../services/GithubServices');

describe('useRepositoryApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const responseData: RepositoryResponse = {
    total_count: 1,
    items: [
      {
        id: 1,
        full_name: 'test',
        owner: {
          login: 'test user',
          avatar_url: 'www.test.it'
        },
        description: 'test description',
        stargazers_count: 1,
        updated_at: new Date(),
        name: 'repository1',
      },
    ],
  };

  it('should fetch data successfully', async () => {
    const mockedFindRepositories = GithubServices.findRepositories as jest.MockedFunction<typeof GithubServices.findRepositories>;
    mockedFindRepositories.mockResolvedValueOnce({ data: responseData } as AxiosResponse);
    const { result, waitForNextUpdate } = renderHook(() => useRepositoryApi());

    act(() => {
      result.current.request({ text: 'searchText', page: 1, totalItems: 10 });
    });

    expect(result.current.loading).toBeTruthy();
    expect(mockedFindRepositories).toHaveBeenCalledWith('searchText', 1, 10);
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual(responseData);
  });

  it('should handle errors when fetching data', async () => {
    const errorMessage = 'Unexpected Error!';
    const mockedFindRepositories = GithubServices.findRepositories as jest.MockedFunction<typeof GithubServices.findRepositories>;
    mockedFindRepositories.mockRejectedValueOnce({ message: errorMessage });
    const { result, waitForNextUpdate } = renderHook(() => useRepositoryApi());

    act(() => {
      result.current.request({ text: 'searchText', page: 1, totalItems: 10 });
    });

    expect(result.current.loading).toBeTruthy();
    expect(mockedFindRepositories).toHaveBeenCalledWith('searchText', 1, 10);
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.data).toBeUndefined();
  });

  it('should append items to the existing data when pagination is requested', async () => {
    const responseDataPaginated: RepositoryResponse = {
      total_count: 2,
      items: [
        {
          id: 1,
          full_name: 'test',
          owner: {
            login: 'test user',
            avatar_url: 'www.test.it'
          },
          description: 'test description',
          stargazers_count: 1,
          updated_at: new Date(),
          name: 'repository1',
        },
        {
          id: 2,
          full_name: 'test2',
          owner: {
            login: 'test user2',
            avatar_url: 'www.test2.it'
          },
          description: 'test description 2',
          stargazers_count: 10,
          updated_at: new Date(),
          name: 'repository2',
        },
      ],
    };
    const mockedFindRepositories = GithubServices.findRepositories as jest.MockedFunction<typeof GithubServices.findRepositories>;
    mockedFindRepositories.mockResolvedValueOnce({ data: responseDataPaginated } as AxiosResponse);
    const { result, waitForNextUpdate } = renderHook(() => useRepositoryApi());

    act(() => {
      result.current.request({ text: 'searchText', page: 1, totalItems: 10 });
    });

    expect(result.current.loading).toBeTruthy();
    expect(mockedFindRepositories).toHaveBeenCalledWith('searchText', 1, 10);

    act(() => {
      result.current.request({ text: 'searchText', page: 2, totalItems: 10 });
    });

    expect(result.current.loading).toBeTruthy();
    expect(mockedFindRepositories).toHaveBeenCalledWith('searchText', 2, 10);
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toEqual(responseDataPaginated);
  });
});