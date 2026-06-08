import { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Card from '../components/ui/Card';
import { APPOINTMENTS_UPCOMING, APPOINTMENTS_COMPLETED } from '../data/mockData';

// Group appointments by their 'date' label
function groupByDate(appointments) {
  return appointments.reduce((acc, apt) => {
    const key = `${apt.date}__${apt.dateLabel}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(apt);
    return acc;
  }, {});
}

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingGroups = groupByDate(APPOINTMENTS_UPCOMING);
  const completedGroups = groupByDate(APPOINTMENTS_COMPLETED);

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
            {/* Tab Toggle */}
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
            <Button variant="primary" icon="add" className="hidden md:flex">
              New Appointment
            </Button>
          </div>
        </div>

        {/* ── Upcoming ── */}
        {activeTab === 'upcoming' && (
          <div className="animate-fade-in space-y-xl">
            {Object.entries(upcomingGroups).map(([key, apts]) => {
              const [date, dateLabel] = key.split('__');
              return (
                <DateGroup key={key} date={date} dateLabel={dateLabel}>
                  {apts.map((apt) => (
                    <UpcomingCard key={apt.id} apt={apt} />
                  ))}
                </DateGroup>
              );
            })}
          </div>
        )}

        {/* ── Completed ── */}
        {activeTab === 'completed' && (
          <div className="animate-fade-in space-y-xl">
            {Object.entries(completedGroups).map(([key, apts]) => {
              const [date, dateLabel] = key.split('__');
              return (
                <DateGroup key={key} date={date} dateLabel={dateLabel} muted>
                  {apts.map((apt) => (
                    <CompletedCard key={apt.id} apt={apt} />
                  ))}
                </DateGroup>
              );
            })}

            {/* Archive notice */}
            <div className="text-center py-xl">
              <span className="material-symbols-outlined text-[48px] text-surface-variant mb-md block">
                inventory_2
              </span>
              <p className="text-body-md text-secondary">
                Older completed appointments are archived.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FAB – mobile */}
      <button className="md:hidden fixed bottom-24 right-md w-14 h-14 bg-primary text-on-primary rounded-xl shadow-lg flex items-center justify-center hover:bg-on-primary-fixed-variant transition-colors z-40">
        <span className="material-symbols-outlined text-[24px]">add</span>
      </button>
    </AppLayout>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function DateGroup({ date, dateLabel, muted = false, children }) {
  return (
    <div className={muted ? 'opacity-80' : ''}>
      <div className="flex items-center gap-md mb-md">
        <h2 className="text-headline-md text-on-surface">{date}</h2>
        <span className="text-label-sm text-secondary bg-surface-container-high px-sm py-xs rounded-full">
          {dateLabel}
        </span>
        <div className="flex-grow h-px bg-outline-variant/30" />
      </div>
      <div className="flex flex-col gap-sm">{children}</div>
    </div>
  );
}

function UpcomingCard({ apt }) {
  return (
    <Card
      hover
      className="group flex flex-col md:flex-row items-start md:items-center p-md"
    >
      {/* Time */}
      <div className="w-full md:w-32 flex flex-row md:flex-col items-center md:items-start gap-xs mb-md md:mb-0 md:pr-md md:border-r border-outline-variant/50">
        <span className="text-headline-md text-on-surface">{apt.time}</span>
        <span className="text-label-sm text-secondary">{apt.period}</span>
        <div className="ml-auto md:ml-0 md:mt-xs">
          <Badge variant={apt.typeVariant}>{apt.type}</Badge>
        </div>
      </div>

      {/* Patient info */}
      <div className="flex-grow flex items-center gap-md px-0 md:px-lg w-full">
        <Avatar name={apt.patient.name} size={12} />
        <div>
          <h3 className="text-headline-md text-on-surface">{apt.patient.name}</h3>
          <div className="flex items-center gap-xs text-body-sm text-secondary mt-xs">
            <span className="material-symbols-outlined text-[14px]">{apt.detailIcon}</span>
            <span>{apt.detail}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full md:w-auto flex items-center justify-end gap-sm mt-md md:mt-0 pt-md md:pt-0 border-t border-outline-variant/30 md:border-t-0">
        <Button variant="secondary" size="sm">Reschedule</Button>
        <Button variant="ghost" size="sm" className="text-primary">Mark Complete</Button>
      </div>
    </Card>
  );
}

function CompletedCard({ apt }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center bg-surface-container border border-outline-variant/50 rounded-xl p-md">
      <div className="w-full md:w-32 flex flex-row md:flex-col items-center md:items-start gap-xs mb-md md:mb-0 md:pr-md md:border-r border-outline-variant/30">
        <span className="text-headline-md text-secondary">{apt.time}</span>
        <span className="text-label-sm text-secondary">{apt.period}</span>
        <div className="ml-auto md:ml-0 md:mt-xs flex items-center gap-xs text-primary">
          <span className="material-symbols-outlined text-[14px]">check_circle</span>
          <span className="text-label-sm">Done</span>
        </div>
      </div>
      <div className="flex-grow flex items-center gap-md px-0 md:px-lg w-full">
        <Avatar name={apt.patient.name} size={12} className="opacity-70" />
        <div>
          <h3 className="text-headline-md text-secondary">{apt.patient.name}</h3>
          <p className="text-body-sm text-secondary mt-xs">{apt.detail}</p>
        </div>
      </div>
      <div className="w-full md:w-auto flex items-center justify-end mt-md md:mt-0 pt-md md:pt-0">
        <Button variant="ghost" size="sm" className="text-secondary">View Notes</Button>
      </div>
    </div>
  );
}
