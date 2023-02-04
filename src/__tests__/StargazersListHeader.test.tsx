import React from 'react';
import StargazersListHeader from '../screens/StargazersPage/components/StargazersListHeader';
import { render } from '../utils/testUtils';

describe('StargazersListHeader', () => {
  it('should display the repo name', () => {
    const name = 'my-repo';
    const { getByText } = render(<StargazersListHeader name={name} />);
    expect(getByText(name)).toBeTruthy();
  });

  it('should display the star counter if provided', () => {
    const name = 'my-repo';
    const counter = 100;
    const { getByText } = render(<StargazersListHeader name={name} counter={counter} />);
    expect(getByText(`${counter}`)).toBeTruthy();
  });

  it('should not display the star counter if not provided', () => {
    const name = 'my-repo';
    const { queryByText } = render(<StargazersListHeader name={name} />);
    expect(queryByText(/\d+/)).toBeFalsy();
  });
});
