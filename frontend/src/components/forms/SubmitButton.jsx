import React from 'react';
import Button from '../Button';

const SubmitButton = ({ children, isLoading, loadingText, className = '', ...props }) => {
  return (
    <Button
      type="submit"
      variant="primary"
      disabled={isLoading}
      className={className}
      {...props}
    >
      {isLoading ? loadingText || 'Submitting...' : children}
    </Button>
  );
};

export default SubmitButton;
