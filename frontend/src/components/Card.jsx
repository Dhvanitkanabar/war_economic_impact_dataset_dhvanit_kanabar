import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  className = '',
  headerAction,
  accent = false,
  noPadding = false,
}) => {
  return (
    <div className={`bg-card border border-border rounded overflow-hidden shadow-card transition-all duration-300 hover:border-ink-700 ${accent ? 'border-l-2 border-l-accent-500' : ''} ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-border bg-ink-950/40">
          <div className="flex-1 min-w-0">
            {title && (
              <h3 className="text-sm font-semibold text-ink-100 uppercase tracking-wider">{title}</h3>
            )}
            {subtitle && (
              <p className="text-xs text-muted mt-1 leading-relaxed">{subtitle}</p>
            )}
          </div>
          {headerAction && (
            <div className="flex-shrink-0">{headerAction}</div>
          )}
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </div>
  );
};

export default Card;
