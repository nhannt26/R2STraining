/** @format */
import { memo, forwardRef } from 'react';
import '../components/input.css'

type Props = {
  label: string;
  type?: string;
  value?: string;
  onChange?: (value: string, type: string) => void;
  // onSubmit: (username: string, password: string) => void;
  error: string;
};
const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, type = 'text', value = '', onChange = () => { }, error }, ref) => {
    // console.log('render ', label);
    return (
      <div>
        <label htmlFor={label}>{label}</label>
        <input
          ref={ref}
          id={label}
          type={type}
          defaultValue={''} // ref - uncontrolled component
        // value={value} // controlled component
        // onChange={(event) => onChange(event.target.value, type)}
        />
        {error && <p>{error}</p>}
      </div>
    );
  }
);

export default memo(Input); // PureComponent