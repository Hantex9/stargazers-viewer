import React from 'react';
import { FlatList } from 'native-base';

import { StargazersList } from '../screens/StargazersPage/components/StargazersList';
import { render } from '../utils/testUtils';
import { Stargazer } from '../models/Stargazer';
import { RepositoryInfo } from '../models/RepositoryResponse';

const stargazers: Stargazer[] = [
  {
    user: {
      avatar_url: 'test.it',
      login: 'user1',
    },
    starred_at: new Date(),
  },
  {
    user: {
      avatar_url: 'test.it',
      login: 'user2',
    },
    starred_at: new Date(),
  },
];

const repository: RepositoryInfo = {
  id: 1,
  name: 'test',
  owner: stargazers[0].user,
  description: 'test',
  updated_at: new Date(),
  full_name: 'repoName',
  stargazers_count: 123,
};

describe('StargazersList component', () => {
  it('should render the StargazersList component', () => {
    const { container } = render(<StargazersList data={stargazers} repository={repository} />);
    expect(container.findByType(FlatList)).toBeDefined();
  });

  it('should display the repository name and stargazers count', () => {
    const { getByText } = render(<StargazersList data={stargazers} repository={repository} />);
    expect(getByText(repository.full_name)).toBeDefined();
    expect(getByText(`${repository.stargazers_count}`)).toBeDefined();
  });

  it('should display the stargazers items', () => {
    const { getByText } = render(<StargazersList data={stargazers} repository={repository} />);
    stargazers.forEach(stargazer => {
      expect(getByText(stargazer.user.login)).toBeDefined();
    });
  });

  it('should show the loading component when the loading prop is true', () => {
    const { getAllByTestId } = render(
      <StargazersList data={stargazers} repository={repository} loading />,
    );
    expect(getAllByTestId('skeleton-item')).toBeDefined();
  });

  it('should show the error component when the error prop is provided and no data is passed', () => {
    const { getByTestId } = render(
      <StargazersList data={[]} repository={repository} error="Error" />,
    );
    expect(getByTestId('error-content')).toBeDefined();
  });
});
