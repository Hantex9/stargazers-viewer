import React from 'react';
import EmptyContent from '../components/EmptyContent';
import { render } from '../utils/testUtils';

describe('EmptyContent', () => {
  it('should render the component correctly', () => {
    const { getByTestId } = render(<EmptyContent />);
    expect(getByTestId('empty-content')).toBeTruthy();
  });

  it('should render the text correctly', () => {
    const text = 'No data found';

    const { getByText } = render(<EmptyContent text={text} />);

    expect(getByText(text)).toBeTruthy();
  });

  it('should render the lottie animation correctly', () => {
    const source = require('../../assets/lotties/no-data.json');

    const { getByTestId } = render(<EmptyContent source={source} />);

    expect(getByTestId('lottie-animation')).toBeTruthy();
  });

  it('should change the height of the lottie animation correctly', () => {
    const height = 500;

    const { getByTestId } = render(<EmptyContent height={height} />);

    expect(getByTestId('lottie-animation').props.style.height).toEqual(height);
  });
});
