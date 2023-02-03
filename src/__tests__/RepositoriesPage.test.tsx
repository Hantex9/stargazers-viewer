import React from 'react';
import { fireEvent } from '@testing-library/react-native';

import {
  RepositoriesPage,
  RepositoriesPageNavOptions,
} from '../screens/RepositoriesPage/RepositoriesPage';
import { COMMON_NAV_OPTIONS } from '../constants/commonStyle';
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

  it('should have the correct navigation options', () => {
    expect(RepositoriesPageNavOptions).toEqual({ title: 'Repositories', ...COMMON_NAV_OPTIONS });
  });

  it('should call the onSearch method when search is executed', () => {
    const { getByPlaceholderText } = render(<RepositoriesPage navigation={navigation} />);

    const searchInput = getByPlaceholderText('Search Repository');
    fireEvent.changeText(searchInput, 'test');
    fireEvent.press(searchInput);

    const { text, searchExecuted } =
      getByPlaceholderText('Search Repository')?.parent?.parent?.state;

    expect(text).toBe('test');
    expect(searchExecuted).toBeTruthy();
  });

  it('should call the loadMoreData method when more data is loaded', () => {
    const { getByTestId } = render(<RepositoriesPage navigation={navigation} />);

    const loadMoreButton = getByTestId('load-more-button');
    fireEvent.press(loadMoreButton);

    const { currentPage } = (getByTestId('repositories-list').parent as any).state;

    expect(currentPage).toBeTruthy();
  });

  it('should call the navigate method when a repository is selected', () => {
    const { getByTestId } = render(<RepositoriesPage navigation={navigation} />);

    const repository = { id: 1 };
    fireEvent.press(getByTestId('repository-item-1'));

    expect(navigation.navigate).toHaveBeenCalledWith('RepositoryDetail', repository);
  });
});

// import React from 'react';
// import { shallow } from 'enzyme';

// import {
//   RepositoriesPage,
//   RepositoriesPageNavOptions,
// } from '../screens/RepositoriesPage/RepositoriesPage';
// import { RepositoriesList } from '../screens/RepositoriesPage/components/RepositoriesList';
// import { COMMON_NAV_OPTIONS } from '../constants/commonStyle';

// describe('RepositoriesPage', () => {
//   let wrapper: any;

//   beforeEach(() => {
//     const navigation: any = { navigate: jest.fn() };

//     wrapper = shallow(<RepositoriesPage navigation={navigation} />);
//   });

//   it('should render correctly', () => {
//     expect(wrapper).toMatchSnapshot();
//   });

//   it('should render RepositoriesList component', () => {
//     expect(wrapper.find(RepositoriesList)).toHaveLength(1);
//   });

//   it('should have the correct navigation options', () => {
//     expect(RepositoriesPageNavOptions).toEqual({ title: 'Repositories', ...COMMON_NAV_OPTIONS });
//   });

//   it('should call the onSearch method when search is executed', () => {
//     const instance = wrapper.instance();

//     instance.onSearchRepository('test');

//     expect(instance.state.text).toBe('test');
//     expect(instance.state.searchExecuted).toBeTruthy();
//   });

//   it('should call the loadMoreData method when more data is loaded', () => {
//     const instance = wrapper.instance();

//     instance.loadMoreData();

//     expect(instance.currentPage).toBeTruthy();
//   });

//   it('should call the navigate method when a repository is selected', () => {
//     const instance = wrapper.instance();

//     instance.props.navigation.navigate = jest.fn();

//     instance.onSelectRepository({});

//     expect(instance.props.navigation.navigate).toHaveBeenCalled();
//   });
// });
