/**
 * Select — styled native select with label.
 */
export default function Select({ label, id, options = [], placeholder, error, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-sm ${className}`}>
      {label && (
        <label htmlFor={id} className="text-label-md text-on-surface-variant font-medium">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full bg-surface-container-lowest border rounded-DEFAULT px-md py-[10px]
          text-body-md text-on-surface appearance-none
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim
          transition-all duration-200
          ${error ? 'border-error' : 'border-outline-variant'}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(({ value, label: optLabel }) => (
          <option key={value} value={value}>
            {optLabel}
          </option>
        ))}
      </select>
      {error && <span className="text-body-sm text-error">{error}</span>}
    </div>
  );
}
