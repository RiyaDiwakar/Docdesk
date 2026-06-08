import TopBar from './TopBar';
import BottomNavBar from './BottomNavBar';

/**
 * AppLayout — wraps every authenticated page.
 * - Fixed TopBar on desktop
 * - Fixed BottomNavBar on mobile
 * - Adds correct top-padding so content doesn't hide under the header
 */
export default function AppLayout({ children }) {
  return (
    <div className="min-h-dvh bg-surface text-on-surface antialiased">
      <TopBar />
      {/* pt-16 = height of the fixed header */}
      <main className="pt-16 pb-24 md:pb-0">{children}</main>
      <BottomNavBar />
    </div>
  );
}
