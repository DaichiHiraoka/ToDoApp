import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  type = 'button', 
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
