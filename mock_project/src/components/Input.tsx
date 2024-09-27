import { memo, forwardRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { inputStyles } from './style';

type Props = {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  error?: string;
};
const Input = forwardRef<HTMLInputElement, Props>(
  (
    { label, type = 'text', value = '', error = '', placeholder },
    ref
  ) => {
    return (
      <TextField
        label={label}
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