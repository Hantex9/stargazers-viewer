import React from 'react';
import { fireEvent } from '@testing-library/react-native';

import { SearchBar } from '../components/SearchBar';
import { render } from '../utils/testUtils';

describe('SearchBar', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<SearchBar />);

    expect(getByTestId('searchbar')).toBeTruthy();
  });

  it('should call onChangeText when the text changes', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(<SearchBar onChangeText={onChangeText} />);
    const input = getByTestId('searchbar');

    fireEvent.changeText(input, 'Test');

    expect(onChangeText).toHaveBeenCalledWith('Test');
  });
});
