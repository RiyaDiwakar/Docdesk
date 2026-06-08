/**
 * Avatar — shows initials or an image in a circle.
 */
const COLOR_RING = [
  'bg-secondary-container text-on-secondary-container',
  'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  'bg-primary-fixed text-on-primary-fixed-variant',
  'bg-surface-container-high text-on-surface',
];

function getColor(name = '') {
  const index = (name.charCodeAt(0) || 0) % COLOR_RING.length;
  return COLOR_RING[index];
}

function getInitials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export default function Avatar({ name = '', src, size = 10, className = '' }) {
  const sizeClass = `w-${size} h-${size}`;
  const color = getColor(name);

  return (
    <div
      className={`${sizeClass} rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border border-outline-variant/50 ${color} ${className}`}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-label-md font-bold leading-none">{getInitials(name)}</span>
      )}
    </div>
  );
}
