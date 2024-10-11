import ButtonMU from '@mui/material/Button';
import React from 'react';

type Props = {
  children?: React.ReactNode,
  label: string;
  onClick?: () => unknown;
  type?: 'submit' | 'button' | 'reset';
  startIcon?: React.ReactNode,
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
  variant?: "text" | "contained" | "outlined"
  disabled?: boolean
  style?: React.CSSProperties
};

const Button = ({ label, type = 'submit', onClick = () => {}, startIcon, color, variant, disabled, style}: Props) => (
  <ButtonMU
    variant={variant}
    disableElevation
    type={type}
    onClick={onClick}
    startIcon={startIcon}
    color={color}
    disabled={disabled}
    style={style}
  >
    {label}
  </ButtonMU>
);

export default Button;
