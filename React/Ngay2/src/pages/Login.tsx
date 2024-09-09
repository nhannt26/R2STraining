/** @format */
import { useState, useCallback, useRef, useEffect } from 'react';
import Input from '../components/Input';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { validateForm } from '../utils/validation';
import { LOGIN } from '../store/action';
import { Navigate, useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState(''); // controlled component
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state: any) => state.auth)
  console.log(auth);
  
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

  // useEffect(() => {
  //   if (auth.isLoggedIn) {
  //     navigate('/')
  //   }
  // })

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
        dispatch({
          type: LOGIN,
          username,
          password,
        })
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

if (auth.isLoggedIn) {
  return <Navigate to='/' replace={true}/>
}

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