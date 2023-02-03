// Unit Test code
import React from 'react';
import { TotalCounterView } from '../components/TotalCounterView';
import { normalizeStarCounter } from '../utils/generalFunctions';
import { render } from '../utils/testUtils';

describe('TotalCounterView', () => {
  it('should render the total amount of results', () => {
    const total = 10;

    const { getByText } = render(<TotalCounterView total={total} />);

    expect(getByText(normalizeStarCounter(total).toString())).toBeTruthy();
  });

  it('should render - if no total is passed', () => {
    const { getByText } = render(<TotalCounterView />);

    expect(getByText('-')).toBeTruthy();
  });
});
