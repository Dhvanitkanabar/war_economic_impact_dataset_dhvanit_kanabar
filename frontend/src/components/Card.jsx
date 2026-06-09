import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  className = '',
  headerAction
}) => {
  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl hover:border-white/20 transition-all duration-300 overflow-hidden ${className}`}>
      {(title || subtitle || headerAction) && (
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center gap-4 bg-white/[0.02]">
          <div>
            {title && <h3 className="text-xl font-display font-semibold text-white tracking-wide">{title}</h3>}
            {subtitle && <p className="text-sm text-neutral-400 mt-1.5">{subtitle}</p>}
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
