import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  className = '',
  headerAction
}) => {
  return (
    <div className={`bg-surface border border-neutral-800 rounded-xl shadow-lg hover:border-neutral-700 transition-colors overflow-hidden ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="px-6 py-4 border-b border-neutral-800 flex justify-between items-center gap-4">
          <div>
            {title && <h3 className="text-lg font-semibold text-neutral-100">{title}</h3>}
            {subtitle && <p className="text-sm text-neutral-400 mt-1">{subtitle}</p>}
          </div>
          {headerAction && (
            <div className="flex-shrink-0">
              {headerAction}
            </div>
          )}
        </div>
      )}
      <div className="p-6 text-neutral-300">
        {children}
      </div>
    </div>
  );
};

export default Card;
