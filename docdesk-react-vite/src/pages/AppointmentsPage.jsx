import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Card from '../components/ui/Card';
import { useToast } from '../hooks/useToast';

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    fetchAppointments();
  }, [activeTab]);

  async function fetchAppointments() {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('authToken');
      const status = activeTab === 'upcoming' ? 'Scheduled' : 'Completed';
      const res = await fetch(
        `http://localhost:5000/api/appointments?status=${status}&limit=20`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to fetch appointments');
        return;
      }
      setAppointments(data.data || []);
    } catch (err) {
      setError('Server connection failed.');
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusUpdate(id, status) {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(
        `http://localhost:5000/api/appointments/${id}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (res.ok) {
        showToast('Appointment marked as complete!', 'success');
        fetchAppointments();
      }
    } catch (err) {
      showToast('Failed to update appointment.', 'error');
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Cancel this appointment?');
    if (!confirmed) return;
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        showToast('Appointment cancelled.', 'info');
        fetchAppointments();
      }
    } catch (err) {
      showToast('Failed to cancel appointment.', 'error');
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

  const grouped = appointments.reduce((acc, apt) => {
    const key = formatDate(apt.date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(apt);
    return acc;
  }, {});

  return (
    <AppLayout>
      <div className="w-full max-w-container-max mx-auto px-md md:px-lg pt-lg pb-lg">

        {/* ── Page Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-xl">
          <div>
            <h1 className="text-display text-on-surface mb-xs">Appointments</h1>
            <p className="text-body-md text-secondary">
              Manage your daily schedule and patient encounters.
            </p>
          </div>
          <div className="flex items-center gap-md">
            <div className="flex bg-surface-container-low p-xs rounded-lg border border-outline-variant/50">
              {['upcoming', 'completed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-md py-sm rounded text-label-md capitalize transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-surface-container-lowest shadow-sm text-primary font-semibold'
                      : 'text-secondary hover:text-on-surface'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <Link to="/appointments/add">
              <Button variant="primary" icon="add" className="hidden md:flex">
                New Appointment
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="bg-error-container border border-error/30 rounded-lg p-md mb-lg">
            <p className="text-body-sm text-on-error-container flex items-center gap-sm">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </p>
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="flex items-center justify-center py-xl">
            <div className="flex flex-col items-center gap-md">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-body-md text-on-surface-variant">Loading appointments…</p>
            </div>
          </div>
        )}

        {/* ── Empty State ── */}
        {!loading && appointments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-xl gap-md text-center">
            <span className="material-symbols-outlined text-[64px] text-outline">
              calendar_today
            </span>
            <h3 className="text-headline-md text-on-surface">
              No {activeTab} appointments
            </h3>
            <p className="text-body-md text-on-surface-variant">
              {activeTab === 'upcoming'
                ? 'Schedule your first appointment!'
                : 'No completed appointments yet.'}
            </p>
            {activeTab === 'upcoming' && (
              <Link to="/appointments/add">
                <Button variant="primary" icon="add">New Appointment</Button>
              </Link>
            )}
          </div>
        )}

        {/* ── Appointments List ── */}
        {!loading && appointments.length > 0 && (
          <div className="space-y-xl">
            {Object.entries(grouped).map(([date, apts]) => (
              <div key={date}>
                <div className="flex items-center gap-md mb-md">
                  <h2 className="text-headline-md text-on-surface">{date}</h2>
                  <span className="text-label-sm text-secondary bg-surface-container-high px-sm py-xs rounded-full">
                    {apts.length} appointment{apts.length > 1 ? 's' : ''}
                  </span>
                  <div className="flex-grow h-px bg-outline-variant/30" />
                </div>
                <div className="flex flex-col gap-sm">
                  {apts.map((apt) => (
                    <Card
                      key={apt._id}
                      className="flex flex-col md:flex-row items-start md:items-center p-md gap-md"
                    >
                      {/* Time */}
                      <div className="w-full md:w-32 flex flex-row md:flex-col items-center md:items-start gap-xs md:pr-md md:border-r border-outline-variant/50">
                        <span className="text-headline-md text-on-surface">
                          {formatTime(apt.time).split(' ')[0]}
                        </span>
                        <span className="text-label-sm text-secondary">
                          {formatTime(apt.time).split(' ')[1]}
                        </span>
                        <div className="ml-auto md:ml-0 md:mt-xs">
                          <Badge
                            variant={
                              apt.type === 'Consultation' ? 'warning'
                              : apt.type === 'Follow-up' ? 'secondary'
                              : 'neutral'
                            }
                          >
                            {apt.type}
                          </Badge>
                        </div>
                      </div>

                      {/* Patient Info */}
                      <div className="flex-grow flex items-center gap-md px-0 md:px-lg w-full">
                        <Avatar name={apt.patientId?.name || 'Patient'} size={12} />
                        <div>
                          <h3 className="text-headline-md text-on-surface">
                            {apt.patientId?.name || 'Unknown Patient'}
                          </h3>
                          <div className="flex items-center gap-xs text-body-sm text-secondary mt-xs">
                            <span className="material-symbols-outlined text-[14px]">
                              {apt.isVirtual ? 'videocam' : 'location_on'}
                            </span>
                            <span>{apt.location || 'Clinic'}</span>
                            {apt.notes && (
                              <>
                                <span>•</span>
                                <span className="line-clamp-1">{apt.notes}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      {activeTab === 'upcoming' && (
                        <div className="w-full md:w-auto flex items-center justify-end gap-sm mt-md md:mt-0 pt-md md:pt-0 border-t border-outline-variant/30 md:border-t-0">
                          <Button variant="secondary" size="sm" onClick={() => handleDelete(apt._id)}>
                            Cancel
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary"
                            onClick={() => handleStatusUpdate(apt._id, 'Completed')}
                          >
                            Mark Complete
                          </Button>
                        </div>
                      )}

                      {activeTab === 'completed' && (
                        <div className="w-full md:w-auto flex items-center justify-end gap-xs mt-md md:mt-0">
                          <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                          <span className="text-label-sm text-primary">Done</span>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAB Mobile */}
      <Link
        to="/appointments/add"
        className="md:hidden fixed bottom-24 right-md w-14 h-14 bg-primary text-on-primary rounded-xl shadow-lg flex items-center justify-center hover:bg-on-primary-fixed-variant transition-colors z-40"
      >
        <span className="material-symbols-outlined text-[24px]">add</span>
      </Link>

      <ToastContainer />
    </AppLayout>
  );
}