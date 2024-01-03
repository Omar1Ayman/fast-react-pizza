import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, disabled, className, onClick, to }) => {
  if (to)
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  return (
    <>
      <button onClick={onClick} disabled={disabled} className={className}>
        {children}
      </button>
    </>
  );
};

export default Button;
