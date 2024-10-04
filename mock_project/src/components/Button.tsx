import ButtonMU from '@mui/material/Button';
import React from 'react';

type Props = {
  label: string;
  onClick?: () => unknown;
  type?: 'submit' | 'button';
  startIcon?: React.ReactNode,
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
  variant?: "text" | "contained" | "outlined"
};
const Button = ({ label, type = 'submit', onClick = () => {}, startIcon, color, variant }: Props) => (
  <ButtonMU
    variant={variant}
    disableElevation
    type={type}
    onClick={onClick}
    startIcon={startIcon}
    color={color}
    style={{ marginTop: '20px' }}
  >
    {label}
  </ButtonMU>
);

export default Button;
