import { shallow } from 'enzyme';
import React from 'react';
import StargazerItem from '../components/StargazerItem';
import { Stargazer } from '../models/Stargazer';

describe('StargazerItem', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<StargazerItem />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders skeleton when skeleton is true', () => {
    const wrapper = shallow(<StargazerItem skeleton />);

    expect(wrapper.find('Skeleton').length).toBeGreaterThan(0);
  });

  it('renders avatar when stargazer is passed', () => {
    const mockStargazer: Stargazer = {
      user: { login: 'test_user', avatar_url: 'test_avatar' },
      starred_at: new Date(),
    };

    const wrapper = shallow(<StargazerItem stargazer={mockStargazer} />);

    expect(wrapper.find('Avatar').length).toBe(1);
  });

  it('renders starred at text when stargazer is passed', () => {
    const mockStargazer: Stargazer = {
      user: { login: 'test_user', avatar_url: 'test_avatar' },
      starred_at: new Date(),
    };

    const wrapper = shallow(<StargazerItem stargazer={mockStargazer} />);

    expect(wrapper.find('[testID="ustarred-at-text"]').length).toBe(1);
  });

  it('renders correct text name when stargazers is passed', () => {
    const mockStargazer = {
      user: { login: 'test_user', avatar_url: 'test_avatar' },
      starred_at: new Date(),
    };

    const wrapper = shallow(<StargazerItem stargazer={mockStargazer} />);
    expect(wrapper.find('[testID="user-name"]').at(0).children).toBe('test_user');
  });
});
