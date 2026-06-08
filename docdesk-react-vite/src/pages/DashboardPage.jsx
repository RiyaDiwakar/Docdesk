import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import {
  DASHBOARD_STATS,
  RECENT_PATIENTS,
  UPCOMING_APPOINTMENTS_DASH,
} from '../data/mockData';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="max-w-container-max mx-auto px-md md:px-lg py-lg md:py-xl space-y-xl">
        {/* ── Greeting ── */}
        <section>
          <h1 className="text-display text-on-background">Good Morning, Doctor</h1>
          <p className="text-body-md text-on-surface-variant mt-xs">
            Here is your overview for today.
          </p>
        </section>

        {/* ── Stat Cards ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <Card className="p-lg hover:bg-surface-bright transition-colors duration-200">
            <div className="flex items-center justify-between mb-md">
              <h2 className="text-label-sm text-secondary uppercase tracking-wider">Total Patients</h2>
              <span className="material-symbols-outlined text-outline">group</span>
            </div>
            <div className="text-display text-on-background">{DASHBOARD_STATS.totalPatients}</div>
          </Card>

          <Card className="p-lg hover:border-primary transition-colors duration-200">
            <div className="flex items-center justify-between mb-md">
              <h2 className="text-label-sm text-secondary uppercase tracking-wider">
                Today's Appointments
              </h2>
              <span className="material-symbols-outlined text-primary">calendar_today</span>
            </div>
            <div className="flex items-baseline gap-sm">
              <div className="text-display text-primary">{DASHBOARD_STATS.todayAppointments}</div>
              <span className="text-body-sm text-on-surface-variant">scheduled</span>
            </div>
          </Card>
        </section>

        {/* ── Lists ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          {/* Recent Patients */}
          <Card className="overflow-hidden flex flex-col">
            <div className="px-md py-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="text-headline-md text-on-surface">Recent Patients</h3>
              <Link to="/patients" className="text-label-sm text-primary hover:text-primary-container transition-colors uppercase tracking-wide">
                View All
              </Link>
            </div>
            <ul className="divide-y divide-outline-variant">
              {RECENT_PATIENTS.map(({ name, initials, lastVisit, id }) => (
                <li key={id}>
                  <Link
                    to={`/patients/${id}`}
                    className="px-md py-sm hover:bg-surface-bright transition-colors duration-150 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-md">
                      <Avatar name={name} size={10} />
                      <div>
                        <div className="text-body-md font-semibold text-on-background group-hover:text-primary transition-colors">
                          {name}
                        </div>
                        <div className="text-body-sm text-on-surface-variant">
                          Last Visit: {lastVisit}
                        </div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                      chevron_right
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          {/* Upcoming Appointments */}
          <Card className="overflow-hidden flex flex-col">
            <div className="px-md py-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="text-headline-md text-on-surface">Upcoming Appointments</h3>
              <Link to="/appointments" className="text-label-sm text-primary hover:text-primary-container transition-colors uppercase tracking-wide">
                Calendar
              </Link>
            </div>
            <div className="flex-1 p-md space-y-sm">
              {UPCOMING_APPOINTMENTS_DASH.map(({ id, time, period, patient, type, highlight }) => (
                <Link
                  key={id}
                  to="/appointments"
                  className="bg-surface border border-outline-variant rounded-lg p-sm flex items-center gap-md hover:border-primary transition-colors cursor-pointer group block"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0 ${
                      highlight
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : 'bg-surface-variant text-on-surface-variant'
                    }`}
                  >
                    <span className="text-label-sm leading-none">{time}</span>
                    <span className="text-label-sm leading-none">{period}</span>
                  </div>
                  <div>
                    <div className="text-body-md font-semibold text-on-background group-hover:text-primary transition-colors">
                      {patient}
                    </div>
                    <div className="text-body-sm text-on-surface-variant flex items-center gap-xs mt-xs">
                      <span
                        className="material-symbols-outlined icon-fill text-[10px]"
                        style={{ fontSize: 10 }}
                      >
                        fiber_manual_record
                      </span>
                      {type}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </AppLayout>
  );
}
