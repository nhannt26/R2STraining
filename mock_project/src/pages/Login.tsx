/** @format */
import { useState, useCallback, useRef } from 'react';
// import { useFormStatus } from 'react-dom'; // TODO: Double check useFormStatus
import { Input, Button } from '../components';
import { validateForm } from './../utils/validation';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN } from '../store/action';
import { Navigate, useNavigate } from 'react-router-dom';
import { boxStyle } from './style';

const Login = () => {
  const [username, setUsername] = useState(''); // controlled component
  const [password, setPassword] = useState(''); // asynchronous  (batch update)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);
  console.log('auth ', auth);
  const [errorMsgs, setErrorMsg] = useState({
    username: '',
    password: '',
  });
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({
    username: null,
    password: null,
  }); // uncontrolled component

  const handleSubmit = useCallback((event: { preventDefault: any }) => {
    console.log('submit ', inputRefs);
    event.preventDefault();

    if (inputRefs.current.username && inputRefs.current.password) {
      const username = inputRefs.current.username.value;
      const password = inputRefs.current.password.value;
      console.log('username ', username);
      console.log('password ', password);
      const errorMsgs = validateForm(username, password);
      setErrorMsg(errorMsgs);

      if (!errorMsgs.username && !errorMsgs.password) {
        // dispatch Action
        dispatch({
          type: LOGIN,
          username,
          password,
        });
      }
    }
  }, []); // [] didmount

  const handleChangeData = useCallback(
    (value: string, type?: string) => {
      if (type === 'password') {
        setPassword(value);
      } else {
        setUsername(value);
      }
    },
    [setPassword]
  );

  if (auth.isLoggedIn) {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <div className='app'>
      <Box component='form' onSubmit={handleSubmit} style={boxStyle}>
        <Input
          label='Username'
          value={username}
          onChange={handleChangeData} // create new arrow function
          ref={(element) => (inputRefs.current.username = element)}
          error={errorMsgs.username}
          // ref={usernameRef}
        />
        <Input
          label='Password'
          type='password'
          value={password}
          onChange={handleChangeData}
          // ref={passwordRef}
          ref={(element) => (inputRefs.current.password = element)}
          error={errorMsgs.password}
        />
        <Button label={'Login'} />
      </Box>
    </div>
  );
};

export default Login;
