import { shallow } from 'enzyme';
import React from 'react';
import RepositoryItem from '../components/RepositoryItem';
import { RepositoryInfo } from '../models/RepositoryResponse';

describe('<RepositoryItem />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<RepositoryItem />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render skeleton when skeleton is true', () => {
    const wrapper = shallow(<RepositoryItem skeleton />);

    expect(wrapper.find('Skeleton').length).toBe(2);
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

    const wrapper = shallow(<RepositoryItem repository={repository} />);

    expect(wrapper.find('Text').length).toBe(3);
    expect(wrapper.find('Icon').length).toBe(2);

    expect(wrapper.find('[testID="repository-name"]').at(0).props().children).toBe('Test');
    expect(wrapper.find('[testID="repository-description"]').at(0).props().children).toBe(
      'Test Description',
    );
    expect(wrapper.find('[testID="repository-updated-at-text"]').at(2).props().children).toBe(
      'Updated on Aug 27, 2020',
    );
  });

  it('should call onPress function when TouchableContent is pressed', () => {
    const onPressMockFn = jest.fn();

    const wrapper = shallow(<RepositoryItem onPress={onPressMockFn} />);

    wrapper.find('TouchableContent').simulate('press');

    expect(onPressMockFn).toHaveBeenCalled();
  });
});
