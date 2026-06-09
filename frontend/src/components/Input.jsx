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
  const baseInputStyles = 'w-full px-4 py-3 bg-white/5 border rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md shadow-inner';
  
  const stateStyles = error 
    ? 'border-red-500/50 focus:ring-red-500/30 focus:border-red-500 bg-red-500/5' 
    : 'border-white/10 hover:border-white/20 focus:ring-primary-500/30 focus:border-primary-500/50 focus:bg-white/10';

  const combinedInputClassName = `${baseInputStyles} ${stateStyles}`;

  return (
    <div className={`flex flex-col space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-neutral-300 ml-1">
          {label} {required && <span className="text-primary-400 ml-1">*</span>}
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
        <p className="text-xs text-red-400 mt-1.5 ml-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
