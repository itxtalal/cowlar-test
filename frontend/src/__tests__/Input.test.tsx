import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../components/Input';
import '@testing-library/jest-dom';

describe('Input', () => {
  test('renders Input component', () => {
    render(
      <Input
        todo={''}
        error={''}
        isLoading={false}
        changeHandler={() => {
          console.log('changeHandler');
        }}
        title={'title'}
        errorPlaceholder={'errorPlaceholder'}
        placeholder={'placeholder'}
        id={'id'}
        type={'text'}
      />
    );
    const inputElement = screen.getByPlaceholderText(/placeholder/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('renders Input component with error', () => {
    render(
      <Input
        todo={''}
        error={'error'}
        isLoading={false}
        changeHandler={() => {
          console.log('changeHandler');
        }}
        title={'title'}
        errorPlaceholder={'errorPlaceholder'}
        placeholder={'placeholder'}
        id={'id'}
        type={'text'}
      />
    );
    const inputElement = screen.getByPlaceholderText(/errorPlaceholder/i);
    expect(inputElement).toBeInTheDocument();

    const errorElement = screen.getByText(/Oh, snapp!/i);
    expect(errorElement).toBeInTheDocument();

    const errorTextElement = screen.getByText(/error/i);
    expect(errorTextElement).toBeInTheDocument();
  });

  test('should call changeHandler function on input change', () => {
    const placeholder = 'Enter a todo';
    let value = '';

    const changeHandler = vi.fn((e) => {
      value = e.target.value;
    });

    render(
      <Input
        todo={value}
        error=""
        isLoading={false}
        title=""
        errorPlaceholder=""
        placeholder={placeholder}
        id="todo-input"
        type="text"
        changeHandler={changeHandler}
      />
    );

    const inputElement = screen.getByPlaceholderText(placeholder);
    fireEvent.change(inputElement, { target: { value: 'New Todo' } });

    expect(changeHandler).toHaveBeenCalledTimes(1);
  });

  test('should show error placeholder when error is present', () => {
    const placeholder = 'Enter a todo';
    const errorPlaceholder = 'Enter a todo';
    const error = 'Todo is required';

    render(
      <Input
        todo={''}
        error={error}
        isLoading={false}
        changeHandler={() => {
          console.log('changeHandler');
        }}
        title={'title'}
        errorPlaceholder={errorPlaceholder}
        placeholder={placeholder}
        id={'id'}
        type={'text'}
      />
    );

    const inputElement = screen.getByPlaceholderText(errorPlaceholder);
    expect(inputElement).toBeInTheDocument();
  });
});
