import { Link, useLocation, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/patients', label: 'Patients', icon: 'group' },
  { to: '/appointments', label: 'Calendar', icon: 'calendar_month' },
  { to: '/settings', label: 'Settings', icon: 'settings' },
];

export default function TopBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <header className="glass-header fixed top-0 w-full z-50 border-b border-outline-variant">
      <div className="flex justify-between items-center px-lg h-16 w-full max-w-container-max mx-auto">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-sm text-primary">
          <span className="material-symbols-outlined icon-fill text-[28px]">clinical_notes</span>
          <span className="text-headline-md font-bold tracking-tight">DocDesk</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-md">
          {NAV_LINKS.map(({ to, label, icon }) => {
            const isActive = pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-xs px-md py-sm rounded-lg text-label-md font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-primary bg-primary/5 font-semibold'
                    : 'text-secondary hover:bg-surface-variant/50'
                }`}
              >
                <span className={`material-symbols-outlined text-[18px] ${isActive ? 'icon-fill' : ''}`}>
                  {icon}
                </span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Avatar + Logout */}
        <div className="flex items-center gap-sm">
          {/* Doctor Name (Desktop only) */}
          <span className="hidden md:block text-label-md text-on-surface-variant">
            {JSON.parse(localStorage.getItem('user') || '{}')?.name || 'Doctor'}
          </span>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-label-md font-bold cursor-pointer hover:opacity-80 transition-opacity">
            {JSON.parse(localStorage.getItem('user') || '{}')?.name?.split(' ').map(w => w[0]).join('').slice(0,2) || 'DR'}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-xs text-secondary hover:text-error transition-colors px-sm py-sm rounded-lg hover:bg-error-container group"
            title="Logout"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-error">logout</span>
            <span className="text-label-md hidden md:block">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}