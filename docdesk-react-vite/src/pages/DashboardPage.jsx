import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalPatients: 0, todayAppointments: 0 });
  const [recentPatients, setRecentPatients] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch patients + appointments in parallel
      const [patientsRes, appointmentsRes] = await Promise.all([
        fetch('http://localhost:5000/api/patients?limit=5', { headers }),
        fetch('http://localhost:5000/api/appointments/upcoming', { headers }),
      ]);

      const patientsData = await patientsRes.json();
      const appointmentsData = await appointmentsRes.json();

      // Stats
      setStats({
        totalPatients: patientsData.total || 0,
        todayAppointments: appointmentsData.length || 0,
      });

      // Recent patients (latest 3)
      setRecentPatients(patientsData.data?.slice(0, 3) || []);

      // Upcoming appointments (latest 3)
      setUpcomingAppointments(
        Array.isArray(appointmentsData) ? appointmentsData.slice(0, 3) : []
      );
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  }

  function formatTime(timeStr) {
    if (!timeStr) return '';
    const [hour, min] = timeStr.split(':');
    const h = parseInt(hour);
    return `${h > 12 ? h - 12 : h}:${min} ${h >= 12 ? 'PM' : 'AM'}`;
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  return (
    <AppLayout>
      <div className="max-w-container-max mx-auto px-md md:px-lg py-lg md:py-xl space-y-xl">

        {/* ── Greeting ── */}
        <section>
          <h1 className="text-display text-on-background">
            Good {getGreeting()},{' '}
            {JSON.parse(localStorage.getItem('user') || '{}')?.name || 'Doctor'}
          </h1>
          <p className="text-body-md text-on-surface-variant mt-xs">
            Here is your overview for today.
          </p>
        </section>

        {/* ── Stat Cards ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <Card className="p-lg hover:bg-surface-bright transition-colors duration-200">
            <div className="flex items-center justify-between mb-md">
              <h2 className="text-label-sm text-secondary uppercase tracking-wider">
                Total Patients
              </h2>
              <span className="material-symbols-outlined text-outline">group</span>
            </div>
            <div className="text-display text-on-background">
              {loading ? (
                <div className="w-16 h-8 bg-surface-variant animate-pulse rounded" />
              ) : (
                stats.totalPatients
              )}
            </div>
          </Card>

          <Card className="p-lg hover:border-primary transition-colors duration-200">
            <div className="flex items-center justify-between mb-md">
              <h2 className="text-label-sm text-secondary uppercase tracking-wider">
                Upcoming Appointments
              </h2>
              <span className="material-symbols-outlined text-primary">calendar_today</span>
            </div>
            <div className="flex items-baseline gap-sm">
              <div className="text-display text-primary">
                {loading ? (
                  <div className="w-16 h-8 bg-surface-variant animate-pulse rounded" />
                ) : (
                  stats.todayAppointments
                )}
              </div>
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
              <Link
                to="/patients"
                className="text-label-sm text-primary hover:text-primary-container transition-colors uppercase tracking-wide"
              >
                View All
              </Link>
            </div>

            {loading ? (
              <LoadingSkeleton rows={3} />
            ) : recentPatients.length === 0 ? (
              <EmptyMessage
                icon="group"
                message="No patients yet"
                link="/patients/add"
                linkText="Add Patient"
              />
            ) : (
              <ul className="divide-y divide-outline-variant">
                {recentPatients.map((patient) => (
                  <li key={patient._id}>
                    <Link
                      to={`/patients/${patient._id}`}
                      className="px-md py-sm hover:bg-surface-bright transition-colors duration-150 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-md">
                        <Avatar name={patient.name} size={10} />
                        <div>
                          <div className="text-body-md font-semibold text-on-background group-hover:text-primary transition-colors">
                            {patient.name}
                          </div>
                          <div className="text-body-sm text-on-surface-variant">
                            {patient.gender} • {patient.bloodType || 'Unknown'}
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
            )}
          </Card>

          {/* Upcoming Appointments */}
          <Card className="overflow-hidden flex flex-col">
            <div className="px-md py-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="text-headline-md text-on-surface">Upcoming Appointments</h3>
              <Link
                to="/appointments"
                className="text-label-sm text-primary hover:text-primary-container transition-colors uppercase tracking-wide"
              >
                Calendar
              </Link>
            </div>

            {loading ? (
              <LoadingSkeleton rows={3} />
            ) : upcomingAppointments.length === 0 ? (
              <EmptyMessage
                icon="calendar_today"
                message="No upcoming appointments"
                link="/appointments"
                linkText="Schedule Now"
              />
            ) : (
              <div className="flex-1 p-md space-y-sm">
                {upcomingAppointments.map((apt, i) => (
                  <Link
                    key={apt._id}
                    to="/appointments"
                    className="bg-surface border border-outline-variant rounded-lg p-sm flex items-center gap-md hover:border-primary transition-colors cursor-pointer group block"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0 ${
                        i === 0
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      <span className="text-label-sm leading-none">{formatTime(apt.time).split(' ')[0]}</span>
                      <span className="text-label-sm leading-none">{formatTime(apt.time).split(' ')[1]}</span>
                    </div>
                    <div>
                      <div className="text-body-md font-semibold text-on-background group-hover:text-primary transition-colors">
                        {apt.patientId?.name || 'Patient'}
                      </div>
                      <div className="text-body-sm text-on-surface-variant flex items-center gap-xs mt-xs">
                        <span className="material-symbols-outlined text-[12px]">circle</span>
                        {apt.type} • {formatDate(apt.date)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </section>
      </div>
    </AppLayout>
  );
}

// ── Helper Components ──────────────────────────────────────────

function LoadingSkeleton({ rows = 3 }) {
  return (
    <div className="divide-y divide-outline-variant">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="px-md py-sm flex items-center gap-md animate-pulse">
          <div className="w-10 h-10 rounded-full bg-surface-variant flex-shrink-0" />
          <div className="flex-1 space-y-sm">
            <div className="h-3 bg-surface-variant rounded w-32" />
            <div className="h-2 bg-surface-dim rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyMessage({ icon, message, link, linkText }) {
  return (
    <div className="flex flex-col items-center justify-center py-xl gap-sm text-center">
      <span className="material-symbols-outlined text-[40px] text-outline">{icon}</span>
      <p className="text-body-md text-on-surface-variant">{message}</p>
      <Link
        to={link}
        className="text-label-md text-primary hover:underline"
      >
        {linkText}
      </Link>
    </div>
  );
}

// ── Greeting Helper ──────────────────────────────────────────
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
}