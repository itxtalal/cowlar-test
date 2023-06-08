import { render, screen } from '@testing-library/react';
import Button from '../components/Button';
import '@testing-library/jest-dom';

describe('Button', () => {
  test('renders Button component', () => {
    render(
      <Button
        isLoading={false}
        text={'text'}
        loadingText={'loadingText'}
        disabled={false}
      />
    );
    const buttonElement = screen.getByText(/text/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders Button component with loading text', () => {
    render(
      <Button
        isLoading={true}
        text={'text'}
        loadingText={'loadingText'}
        disabled={false}
      />
    );
    const buttonElement = screen.getByText(/loadingText/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders Button component not disabled if not loading', () => {
    render(
      <Button
        isLoading={false}
        text={'text'}
        loadingText={'loadingText'}
        disabled={true}
      />
    );
    const buttonElement = screen.getByText(/text/i);
    expect(buttonElement).not.toBeDisabled();
  });

  test('renders Button component disabled if loading', () => {
    render(
      <Button
        isLoading={true}
        text={'text'}
        loadingText={'loadingText'}
        disabled={true}
      />
    );
    const buttonElement = screen.getByText(/loadingText/i);
    expect(buttonElement).toBeDisabled();
  });
});
