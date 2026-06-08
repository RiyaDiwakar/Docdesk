/**
 * Card — standard white surface card with border.
 */
export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`bg-surface-container-lowest border border-outline-variant rounded-xl
        ${hover ? 'hover:border-outline hover:bg-surface-bright transition-all duration-200 cursor-pointer' : ''}
        ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
