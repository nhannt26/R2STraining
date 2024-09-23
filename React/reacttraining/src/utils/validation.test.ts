import { validateForm } from "./validation";

describe('validateForm', () => {
  test('should return an empty object when both username and password are valid', () => {
    const errors = validateForm('validUsername', 'validPassword123');
    expect(errors).toEqual({});
  });

  test('should return an error for missing username', () => {
    const errors = validateForm('', 'validPassword123');
    expect(errors).toEqual({ username: 'Username is required', password: '' });
  });

  test('should return an error for missing password', () => {
    const errors = validateForm('validUsername', '');
    expect(errors).toEqual({ username: '', password: 'Password is required' });
  });

  test('should return an error for password with less than 8 characters', () => {
    const errors = validateForm('validUsername', 'shortPassword');
    expect(errors).toEqual({ username: '', password: 'Password is at least 8 letters' });
  });
});