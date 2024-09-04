/** @format */
import { useState, useCallback, useRef } from 'react';
import Input from '../components/Input';
import { Box, Button } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState(''); // controlled component
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({
    username: null,
    password: null,
  });
  // uncontrolled component
  // const usernameRef = useRef<HTMLInputElement>(null); 
  // const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((event: { preventDefault: any }) => {
      event.preventDefault();
      if (inputRefs.current.username && inputRefs.current.password) {
        const username = inputRefs.current.username.value;
        const password = inputRefs.current.password.value;

        let isValid = true;

        if (!username) {
          setUsernameError('Username is required')
          isValid = false
        } else {
          setUsernameError('')
        }

        if (!password) {
          setPasswordError('Password is required');
          isValid = false
        } else if (password.length < 8) {
          setPasswordError('Password must be at least 8 characters long');
          isValid = false
        } else {
          setPasswordError('')
        }

        if (isValid) {
          console.log('username value ', username);
          console.log('password value ', password);
        }

        // validate
      }
      // console.log('inputRefs ', inputRefs);
    },
    []
  );

  const handleChangeData = useCallback(
    (value: string, type: string) => {
      if (type === 'password') {
        setPassword(value);
      } else {
        setUsername(value);
      }
    },
    [setPassword]
  );

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      style={{
        margin: 'auto',
        border: '1px solid #c3c3c3',
        borderRadius: '5px',
        background: 'white',
        width: '400px',
        padding: '20px',

      }}
    >
      <Input
        label='Username'
        value={username}
        onChange={handleChangeData} // create new arrow function
        ref={(element) => (inputRefs.current.username = element)}
        error={usernameError}
      />
      <Input
        label='Password'
        type='password'
        value={password}
        onChange={handleChangeData}
        // ref={passwordRef}
        ref={(element) => (inputRefs.current.password = element)}
        error={passwordError}
      />
      <Button
        variant='contained'
        disableElevation
        type='submit'
        style={{ marginTop: '20px' }}>
        Login
      </Button>
      {/* <button type='submit'>Login</button> */}
    </Box>
  );
};

export default Login;

// challenge 10:
/**
 * Complete the login form
 * applied useRef form
 * validate form:
 * 1. username is required
 * 2. password is required + length >= 8
 * Display the errors on the form if any
 */