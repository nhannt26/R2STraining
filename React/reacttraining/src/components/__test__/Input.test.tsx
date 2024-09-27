/** @format */

import Input from '../Input';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Test Input Component', () => {
  test('Should render Input button with label', () => {
    render(<Input label='Username' />);
    const labelElements = screen.getAllByText('Username');
    expect(labelElements[0]).toBeInTheDocument();
    expect(labelElements).toHaveLength(2);
  }); // label
  test('Should render Input button with error', () => {
    render(<Input label='Username' error='Username is required' />);
    const errorElement = screen.getByText('Username is required');
    expect(errorElement).toBeInTheDocument();
  });
  test('Should call onChange when input change', () => {
    const handleChange = jest.fn();
    render(
      <Input
        label='Username'
        placeholder='Enter username'
        onChange={handleChange}
        value=''
        error='Username is required'
      />
    );
    const inputElement = screen.getByPlaceholderText('Enter username');
    fireEvent.change(inputElement, { target: { value: 'New username' } });
    expect(handleChange).toBeCalled();
  });

  // error
});

export {};
