import React from 'react';

import { StargazersPage } from '../screens/StargazersPage/StargazersPage';
import { render } from '../utils/testUtils';

const mockRequestFn = jest.fn();

jest.mock('../hooks/useStargazersApi', () => ({
  useStargazersApi: () => ({
    data: [],
    error: '',
    loading: false,
    request: mockRequestFn,
  }),
}));

const repositoryMock = {
  id: 1,
  name: 'Repository 1',
  full_name: 'repository1',
  owner: { login: 'test1', avatar_url: 'test1.it' },
  stargazers_count: 10,
  updated_at: new Date(),
};

describe('StargazersPage', () => {
  let route: any;
  let navigation: any;

  beforeEach(() => {
    route = {
      params: {
        repository: repositoryMock,
      },
    };
    navigation = { navigate: jest.fn() };
  });

  it('should render StargazersList component and make http request at startup', () => {
    const { getByTestId } = render(<StargazersPage navigation={navigation} route={route} />);

    expect(getByTestId('stargazers-list')).toBeTruthy();
    expect(mockRequestFn).toHaveBeenCalled();
  });
});
