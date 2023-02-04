import React from 'react';
import { fireEvent } from '@testing-library/react-native';

import { RepositoriesPage } from '../screens/RepositoriesPage/RepositoriesPage';
import { render } from '../utils/testUtils';

jest.mock('../hooks/useRepositoryApi', () => ({
  useRepositoryApi: () => ({
    data: [],
    error: '',
    loading: false,
    request: jest.fn(),
  }),
}));

describe('RepositoriesPage', () => {
  let navigation: any;

  beforeEach(() => {
    navigation = { navigate: jest.fn() };
  });

  it('should render RepositoriesList component', () => {
    const { getByTestId } = render(<RepositoriesPage navigation={navigation} />);

    expect(getByTestId('repositories-list-view')).toBeTruthy();
  });
});
