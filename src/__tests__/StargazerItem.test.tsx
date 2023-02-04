import React from 'react';
import moment from 'moment';
import { Skeleton } from 'native-base';

import StargazerItem from '../components/StargazerItem';
import { Stargazer } from '../models/Stargazer';
import { render } from '../utils/testUtils';

const stargazer: Stargazer = {
  user: {
    login: 'testuser',
    avatar_url: 'https://avatar-url.com',
  },
  starred_at: new Date('2022-02-01'),
};

describe('StargazerItem', () => {
  it('should render stargazer information correctly', () => {
    const { getByTestId } = render(<StargazerItem stargazer={stargazer} />);

    expect(getByTestId('user-name').children.at(0)).toBe(stargazer.user.login);
    expect(getByTestId('starred-at-text')).toBeTruthy();
  });

  it('should render skeleton when skeleton is true', () => {
    const { container } = render(<StargazerItem skeleton />);

    expect(container.findAllByType(Skeleton).length).toBeGreaterThan(0);
  });
});
