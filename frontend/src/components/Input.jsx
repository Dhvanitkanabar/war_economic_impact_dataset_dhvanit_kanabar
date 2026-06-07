import React from 'react';

const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const baseInputStyles = 'w-full px-4 py-2 bg-background border rounded-md text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  
  const stateStyles = error 
    ? 'border-error focus:ring-error/50 focus:border-error' 
    : 'border-neutral-800 hover:border-neutral-700 focus:ring-primary-500/50 focus:border-primary-500';

  const combinedInputClassName = `${baseInputStyles} ${stateStyles}`;

  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-neutral-300">
          {label} {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={combinedInputClassName}
        {...props}
      />
      {error && (
        <p className="text-xs text-error mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
