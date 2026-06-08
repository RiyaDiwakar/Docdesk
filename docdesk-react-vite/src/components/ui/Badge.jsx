/**
 * Badge — small status chip used throughout the app.
 *
 * variant: 'primary' | 'secondary' | 'warning' | 'error' | 'success' | 'neutral'
 */
const VARIANTS = {
  primary: 'bg-primary-fixed/60 text-on-primary-fixed-variant',
  secondary: 'bg-secondary-container text-on-secondary-container',
  warning: 'bg-tertiary-fixed text-on-tertiary-fixed',
  error: 'bg-error-container text-on-error-container',
  success: 'bg-primary-fixed/40 text-primary',
  neutral: 'bg-surface-container-highest text-on-surface-variant',
};

export default function Badge({ children, variant = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
