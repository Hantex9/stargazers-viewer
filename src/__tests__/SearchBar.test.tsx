import React from 'react';

import { shallow } from 'enzyme';
import { SearchBar } from '../components/SearchBar';

describe('SearchBar', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<SearchBar />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render an Input component', () => {
    const wrapper = shallow(<SearchBar />);

    expect(wrapper.find('Input').length).toEqual(1);
  });
});
