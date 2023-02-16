import { renderHook, act } from '@testing-library/react-hooks';
import { AxiosResponse } from 'axios';

import { Stargazer } from '../../models/Stargazer';
import GithubServices from '../../services/GithubServices';
import { useStargazersApi } from '../useStargazersApi';

jest.mock('axios');
jest.mock('../../services/GithubServices');

const mockedGithubServices = GithubServices as jest.Mocked<typeof GithubServices>;

describe('useStargazersApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const stargazers: Stargazer[] = [
    {
      user: { login: 'test' },
      starred_at: new Date()
    },
    {
      user: { login: 'test2' },
      starred_at: new Date()
    }
  ];

  it('should update data with returned stargazers when request is successful', async () => {
    mockedGithubServices.getRepoStargazers.mockResolvedValueOnce({ data: stargazers } as AxiosResponse);

    const { result, waitForNextUpdate } = renderHook(() => useStargazersApi());

    act(() => {
      result.current.request({ userRepo: 'test', repoName: 'test-repo', page: 1, totalItems: 10 });
    });

    expect(result.current.loading).toBeTruthy();
    expect(result.current.data).toBeUndefined();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toEqual(stargazers);
  });

  it('should append data with returned stargazers when page number is greater than 1', async () => {
    const stargazersToAppend: Stargazer[] = [
      {
        user: { login: 'test3' },
        starred_at: new Date()
      },
      {
        user: { login: 'test4' },
        starred_at: new Date()
      }
    ];
    mockedGithubServices.getRepoStargazers.mockResolvedValueOnce({ data: stargazers } as AxiosResponse);
    mockedGithubServices.getRepoStargazers.mockResolvedValueOnce({ data: stargazersToAppend } as AxiosResponse);

    const { result, waitForNextUpdate } = renderHook(() => useStargazersApi());

    act(() => {
      result.current.request({ userRepo: 'test', repoName: 'test-repo', page: 1, totalItems: 10 });
    });

    expect(result.current.loading).toBeTruthy();
    expect(result.current.data).toBeUndefined();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toEqual(stargazers);

    const page2 = 2;
    const totalItems = 10;

    await act(async () => {
      result.current.request({ userRepo: 'test', repoName: 'test', page: page2, totalItems });
    })
    expect(result.current.loading).toBeFalsy();
    expect(result.current.data).toEqual([...stargazers, ...stargazersToAppend]);
  });

  it('should update error with the error message when request fails', async () => {
    const error = 'An error occurred.';
    mockedGithubServices.getRepoStargazers.mockRejectedValueOnce({ message: error });

    const { result, waitForNextUpdate } = renderHook(() => useStargazersApi());

    act(() => {
      result.current.request({ userRepo: 'test', repoName: 'test-repo', page: 1, totalItems: 10 });
    });

    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toEqual(error);
  });

});