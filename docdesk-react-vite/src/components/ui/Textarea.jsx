/**
 * Textarea — form textarea with label and optional helper text.
 */
export default function Textarea({ label, id, helper, error, rows = 3, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-sm ${className}`}>
      {label && (
        <label htmlFor={id} className="text-label-md text-on-surface-variant font-medium">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`w-full bg-surface-container-lowest border rounded-DEFAULT px-md py-md
          text-body-md text-on-surface placeholder:text-outline resize-y
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim
          transition-all duration-200
          ${error ? 'border-error focus:ring-error/30' : 'border-outline-variant'}`}
        {...props}
      />
      {(helper || error) && (
        <span className={`text-body-sm ${error ? 'text-error' : 'text-outline'}`}>
          {error || helper}
        </span>
      )}
    </div>
  );
}
