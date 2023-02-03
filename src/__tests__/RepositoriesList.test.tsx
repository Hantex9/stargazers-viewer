import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { RepositoriesList } from '../screens/RepositoriesPage/components/RepositoriesList';
import { RepositoryInfo } from '../models/RepositoryResponse';
import { render } from '../utils/testUtils';

describe('RepositoriesList', () => {
  const mockOnSearch = jest.fn();
  const mockOnSelectRepository = jest.fn();
  const mockOnLoadMore = jest.fn();
  const data: RepositoryInfo[] = [
    {
      id: 1,
      name: 'Repository 1',
      full_name: 'repository1',
      owner: { login: 'test1', avatar_url: 'test1.it' },
      stargazers_count: 10,
      updated_at: new Date(),
    },
    {
      id: 2,
      name: 'Repository 2',
      full_name: 'repository2',
      owner: { login: 'test2', avatar_url: 'test2.it' },
      stargazers_count: 20,
      updated_at: new Date(),
    },
  ];

  it('should render correctly', () => {
    const { getByTestId } = render(
      <RepositoriesList
        data={data}
        onSearch={mockOnSearch}
        onSelectRepository={mockOnSelectRepository}
        onLoadMore={mockOnLoadMore}
        totalElements={2}
        searchedText=""
        loading={false}
        error=""
      />,
    );

    expect(getByTestId('search-bar-view')).toBeTruthy();
    expect(getByTestId('total-counter-view')).toBeTruthy();
    expect(getByTestId('repository1')).toBeTruthy();
    expect(getByTestId('repository2')).toBeTruthy();
  });

  it('should call onSearch when searching', () => {
    const { getByTestId } = render(
      <RepositoriesList
        data={data}
        onSearch={mockOnSearch}
        onSelectRepository={mockOnSelectRepository}
        onLoadMore={mockOnLoadMore}
        totalElements={2}
        searchedText=""
        loading={false}
        error=""
      />,
    );

    const searchBar = getByTestId('search-bar-view');
    fireEvent.changeText(searchBar, 'Search');
    fireEvent(searchBar, 'submitEditing');
    expect(mockOnSearch).toHaveBeenCalledWith('Search');
  });

  it('should call onSelectRepository when selecting a repository', () => {
    const { getByTestId } = render(
      <RepositoriesList
        data={data}
        onSearch={mockOnSearch}
        onSelectRepository={mockOnSelectRepository}
        onLoadMore={mockOnLoadMore}
        totalElements={2}
        searchedText=""
        loading={false}
        error=""
      />,
    );

    const repositoryItem = getByTestId('repository1');
    fireEvent.press(repositoryItem);
    expect(mockOnSelectRepository).toHaveBeenCalledWith(data[0]);
  });

  it('should display a loading footer when there is something loading', () => {
    const { getByTestId } = render(
      <RepositoriesList
        data={data}
        onSearch={mockOnSearch}
        onSelectRepository={mockOnSelectRepository}
        onLoadMore={mockOnLoadMore}
        totalElements={2}
        searchedText=""
        loading
        error=""
      />,
    );

    const skeleton = getByTestId('skeleton-item');
    expect(skeleton).toBeDefined();
  });
});
