import React from 'react';

const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  hint,
  disabled = false,
  required = false,
  className = '',
  prefix,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="flex items-center gap-1 text-xs font-semibold text-ink-300 uppercase tracking-widest">
          {label}
          {required && <span className="text-accent-500 text-base leading-none">*</span>}
        </label>
      )}

      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500 text-sm flex-shrink-0">
            {prefix}
          </div>
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
          className={`
            w-full bg-card border text-ink-100 text-sm
            placeholder:text-ink-600
            transition-all duration-200
            focus:outline-none
            disabled:opacity-40 disabled:cursor-not-allowed
            ${prefix ? 'pl-9 pr-4' : 'px-4'} py-3
            ${error
              ? 'border-crimson-500 focus:border-crimson-400 focus:ring-2 focus:ring-crimson-500/20 rounded'
              : 'border-border focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 rounded hover:border-ink-700'
            }
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-crimson-400">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-ink-500">{hint}</p>
      )}
    </div>
  );
};

export default Input;
