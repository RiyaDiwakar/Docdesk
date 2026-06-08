import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/patients', label: 'Patients', icon: 'group' },
  { to: '/appointments', label: 'Calendar', icon: 'calendar_month' },
  { to: '/settings', label: 'Settings', icon: 'settings' },
];

export default function BottomNavBar() {
  const { pathname } = useLocation();

  return (
    <nav className="md:hidden bg-surface fixed bottom-0 w-full z-50 border-t border-outline-variant flex justify-around items-center h-20 px-md">
      {NAV_LINKS.map(({ to, label, icon }) => {
        const isActive = pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center justify-center gap-1 w-16 active:scale-95 transition-transform duration-150 ${
              isActive ? 'text-primary font-bold' : 'text-secondary hover:text-primary-container'
            }`}
          >
            {isActive ? (
              <div className="bg-primary/10 rounded-full px-3 py-1 flex items-center justify-center">
                <span className="material-symbols-outlined icon-fill text-[24px]">{icon}</span>
              </div>
            ) : (
              <span className="material-symbols-outlined text-[24px]">{icon}</span>
            )}
            <span className="text-[10px] font-medium leading-none">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
