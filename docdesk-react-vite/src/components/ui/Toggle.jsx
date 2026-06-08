import { useState } from 'react';

/**
 * Toggle — iOS-style switch for boolean preferences.
 */
export default function Toggle({ checked: initialChecked = false, onChange, label, description }) {
  const [checked, setChecked] = useState(initialChecked);

  function handleToggle() {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  }

  return (
    <div className="flex items-center justify-between py-sm">
      {(label || description) && (
        <div className="flex flex-col gap-xs pr-lg">
          {label && <span className="text-body-md text-on-surface">{label}</span>}
          {description && <span className="text-body-sm text-on-surface-variant">{description}</span>}
        </div>
      )}
      <button
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        className={`relative inline-flex w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-fixed-dim flex-shrink-0 ${
          checked ? 'bg-primary-container' : 'bg-surface-variant'
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-surface-container-lowest rounded-full shadow transition-transform duration-200 ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
