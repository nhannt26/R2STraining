import { forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import { inputStyles } from './style';

type Props = {
  label: string;
  placeholder?: string;
  type?: string;
  error?: string;
  value?: string;
};
const Input = forwardRef<HTMLInputElement, Props>(
  (
    { label, type = 'text', error = '', placeholder, value = "" },
    ref
  ) => {
    return (
      <TextField
        label={label}
        value={value}
        placeholder={placeholder}
        error={!!error}
        helperText={error}
        type={type}
        style={inputStyles}
        inputRef={ref}
      />
    );
  }
);

export default Input;