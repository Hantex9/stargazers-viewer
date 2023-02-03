import React from 'react';
import WelcomeContent from '../components/WelcomeContent';
import { render } from '../utils/testUtils';

const title = 'Welcome to our app';
const text = 'This is the best app ever!';

describe('WelcomeContent', () => {
  it('should render the component correctly', () => {
    const { getByTestId } = render(<WelcomeContent title={title} text={text} />);

    expect(getByTestId('welcome-content-container')).toBeTruthy();
  });

  it('should render the title and text correctly', () => {
    const { getByText } = render(<WelcomeContent title={title} text={text} />);

    expect(getByText(title)).toBeTruthy();
    expect(getByText(text)).toBeTruthy();
  });
});
