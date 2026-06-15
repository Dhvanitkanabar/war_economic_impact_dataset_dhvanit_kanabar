import React from 'react';
import { useField } from 'formik';

const FormTextarea = ({ label, required, ...props }) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={props.id || props.name} className="flex items-center gap-1 text-xs font-semibold text-ink-300 uppercase tracking-widest">
          {label}
          {required && <span className="text-accent-500 text-base leading-none">*</span>}
        </label>
      )}

      <textarea
        {...field}
        {...props}
        className={`
          w-full bg-card border text-ink-100 text-sm
          placeholder:text-ink-600
          transition-all duration-200
          focus:outline-none
          disabled:opacity-40 disabled:cursor-not-allowed
          px-4 py-3 min-h-[100px]
          ${isError
            ? 'border-crimson-500 focus:border-crimson-400 focus:ring-2 focus:ring-crimson-500/20 rounded-2xl'
            : 'border-border focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 rounded-2xl hover:border-ink-700'
          }
        `}
      />

      {isError && (
        <p className="flex items-center gap-1.5 text-xs text-crimson-400">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default FormTextarea;
