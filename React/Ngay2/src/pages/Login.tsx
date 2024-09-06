/** @format */
import { useState, useCallback, useRef } from 'react';
import Input from '../components/Input';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { validateForm } from '../utils/validation';

const Login = () => {
  const [username, setUsername] = useState(''); // controlled component
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const [errorMsg, setErrorMsg] = useState({
    username: '',
    password: '',
  })
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
      console.log('username ', username);
      console.log('password ', password);
      const errorMsg = validateForm(username, password)
      setErrorMsg(errorMsg)

      if (!errorMsg.username && !errorMsg.password) {

      }
    }
  }, []);

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
    <div className='app'>
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
          error={errorMsg.username}
        />
        <Input
          label='Password'
          type='password'
          value={password}
          onChange={handleChangeData}
          // ref={passwordRef}
          ref={(element) => (inputRefs.current.password = element)}
          error={errorMsg.password}
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
    </div>
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