/** @format */
import { memo, forwardRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { inputStyle } from './style';

type Props = {
  label: string;
  type?: string;
  value?: string;
  onChange?: (value: string, type: string) => void;
  error: string;
};
const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, type = 'text', value = '', onChange = () => { }, error }, ref) => {
    // console.log('render ' + label);
    const [currentValue, setCurrentValue] = useState('')
    return (
      <TextField
        label={label}
        defaultValue={currentValue}
        onChange={(event) => setCurrentValue(event.target.value)}
        error={!!error}
        helperText={error}
        type={type}
        style={inputStyle}
        inputRef={ref}
      />
    );
  }
);

export default memo(Input); // PureComponent