import { useEffect, useState } from 'react';

/**
 * Toast variants:
 * success = green
 * error   = red
 * warning = yellow
 * info    = blue
 */
const VARIANTS = {
  success: {
    bg: 'bg-primary-fixed',
    text: 'text-on-primary-fixed',
    icon: 'check_circle',
    iconColor: 'text-primary',
  },
  error: {
    bg: 'bg-error-container',
    text: 'text-on-error-container',
    icon: 'cancel',
    iconColor: 'text-error',
  },
  warning: {
    bg: 'bg-tertiary-fixed',
    text: 'text-on-tertiary-fixed',
    icon: 'warning',
    iconColor: 'text-tertiary-container',
  },
  info: {
    bg: 'bg-surface-container-high',
    text: 'text-on-surface',
    icon: 'info',
    iconColor: 'text-primary',
  },
};

export function Toast({ message, type = 'success', onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setTimeout(() => setVisible(true), 10);

    // Auto close after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const variant = VARIANTS[type] || VARIANTS.success;

  return (
    <div
      className={`flex items-center gap-md px-lg py-md rounded-xl shadow-lg border border-outline-variant/20
        transition-all duration-300 min-w-[300px] max-w-[400px]
        ${variant.bg} ${variant.text}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <span className={`material-symbols-outlined icon-fill text-[22px] ${variant.iconColor}`}>
        {variant.icon}
      </span>
      <span className="text-body-md font-medium flex-1">{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        className="opacity-60 hover:opacity-100 transition-opacity"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
}