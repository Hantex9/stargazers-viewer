import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import RepositoryItem from '../components/RepositoryItem';
import { RepositoryInfo } from '../models/RepositoryResponse';
import { render } from '../utils/testUtils';

describe('RepositoryItem', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<RepositoryItem />);

    expect(getByTestId('repository-item')).toBeTruthy();
  });

  it('should render skeleton when skeleton is true', () => {
    const { queryAllByTestId } = render(<RepositoryItem skeleton />);

    expect(queryAllByTestId('skeleton-repository').length).toBeGreaterThan(0);
  });

  it('should render repository info when repository is passed', () => {
    const repository: RepositoryInfo = {
      id: 1,
      name: 'test',
      owner: {
        login: 'test',
        avatar_url: 'test.it',
      },
      full_name: 'Test',
      description: 'Test Description',
      stargazers_count: 10,
      updated_at: new Date('2020-08-27T07:30:21Z'),
    };

    const { queryAllByTestId } = render(<RepositoryItem repository={repository} />);

    expect(queryAllByTestId('repository-name').length).toBe(1);
    expect(queryAllByTestId('repository-description').length).toBe(1);
    expect(queryAllByTestId('repository-updated-at-text').length).toBe(1);
  });

  it('should call onPress function when TouchableContent is pressed', () => {
    const onPressMockFn = jest.fn();

    const { getByTestId } = render(<RepositoryItem onPress={onPressMockFn} />);

    fireEvent.press(getByTestId('repository-item'));

    expect(onPressMockFn).toHaveBeenCalled();
  });
});
