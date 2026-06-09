import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  icon,
  ...props
}) => {
  const base = `
    inline-flex items-center justify-center gap-2 font-semibold
    transition-all duration-200 select-none
    disabled:opacity-40 disabled:cursor-not-allowed
    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark
  `;

  const variants = {
    primary: `
      clip-corner-sm bg-accent-500 text-white
      hover:bg-accent-400 hover:shadow-glow-accent
      active:scale-95
    `,
    secondary: `
      bg-card border border-border text-ink-200
      hover:border-accent-600 hover:text-white hover:bg-ink-900
      active:scale-95
    `,
    ghost: `
      bg-transparent text-ink-400
      hover:text-white hover:bg-ink-900/60
      active:scale-95
    `,
    danger: `
      clip-corner-sm bg-crimson-600 text-white
      hover:bg-crimson-500 hover:shadow-glow-crimson
      active:scale-95
    `,
    outline: `
      border border-accent-600 text-accent-400 bg-transparent
      hover:bg-accent-600/10 hover:text-accent-300
      active:scale-95
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
    xl: 'px-9 py-4 text-base',
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
