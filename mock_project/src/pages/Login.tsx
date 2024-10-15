/** @format */
import { useState, useCallback, useRef, useMemo } from 'react';
// import { useFormStatus } from 'react-dom'; // TODO: Double check useFormStatus
import { Input, Button } from '../components';
import { validateForm } from './../utils/validation';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { boxStyle, loginBtnStyle } from './style';
import { login as handleLogin } from '../store/reducer/authReducers'
import { AppDispatch } from '../store/store';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: any) => state.auth);
  // console.log('auth ', auth);
  const [errorMsgs, setErrorMsg] = useState({
    email: '',
    password: '',
  });
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({
    email: null,
    password: null,
  }); // uncontrolled component

  const handleSubmit = useCallback((event: { preventDefault: any }) => {
    // console.log('submit ', inputRefs);
    event.preventDefault();

    if (inputRefs.current.email && inputRefs.current.password) {
      const email = inputRefs.current.email.value;
      const password = inputRefs.current.password.value;
      // console.log('email ', email);
      // console.log('password ', password);
      const errorMsgs = validateForm(email, password);
      setErrorMsg(errorMsgs);

      if (!errorMsgs.email && !errorMsgs.password) {
        dispatch(handleLogin({ email, password }))
      }
    }
  }, [dispatch]); // [] didmount

  const passErrMsg = useMemo(() => {
    if (errorMsgs.password) return errorMsgs.password
    if (inputRefs.current.email && inputRefs.current.password) {
      const email = inputRefs.current.email.value;
      const password = inputRefs.current.password.value;
      return email && password && !auth.isLoggedIn ? 'Email or password is incorrect' : ''
    }
  }, [auth.isLoggedIn, errorMsgs.password])

  if (auth.isLoggedIn) {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <div className='app'>
      <Box component='form' onSubmit={handleSubmit} style={boxStyle}>
        <Input
          label='Email'
          type='email'
          ref={(element) => (inputRefs.current.email = element)}
          error={errorMsgs.email}
        />
        <Input
          label='Password'
          type='password'
          ref={(element) => (inputRefs.current.password = element)}
          error={passErrMsg}
        />
        <Button style={loginBtnStyle} label={'Login'} variant='contained' color='primary' />
      </Box>
    </div>
  );
};

export default Login;
