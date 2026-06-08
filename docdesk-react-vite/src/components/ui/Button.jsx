/**
 * Button — standardised button used across the app.
 *
 * variant: 'primary' | 'secondary' | 'ghost' | 'danger'
 * size:    'sm' | 'md' | 'lg'
 */
const VARIANTS = {
  primary:
    'bg-primary text-on-primary hover:bg-on-primary-fixed-variant shadow-sm',
  secondary:
    'bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container-high',
  ghost:
    'text-primary hover:bg-primary/5',
  danger:
    'bg-error-container text-on-error-container hover:bg-error hover:text-on-error border border-error/20',
};

const SIZES = {
  sm: 'px-md py-[6px] text-label-md rounded',
  md: 'px-lg py-[10px] text-label-md rounded-DEFAULT',
  lg: 'px-xl py-[14px] text-label-md rounded-DEFAULT',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconEnd,
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
      {children}
      {iconEnd && <span className="material-symbols-outlined text-[18px]">{iconEnd}</span>}
    </button>
  );
}
