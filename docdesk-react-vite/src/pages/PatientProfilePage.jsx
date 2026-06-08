import { useParams, Link, useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { PATIENTS } from '../data/mockData';

const STATUS_VARIANT = {
  Chronic: 'warning',
  Resolved: 'neutral',
  Ongoing: 'secondary',
  Active: 'primary',
};

export default function PatientProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = PATIENTS.find((p) => p.id === id);

  if (!patient) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-md">
          <span className="material-symbols-outlined text-[64px] text-outline">person_off</span>
          <h2 className="text-headline-lg text-on-surface">Patient not found</h2>
          <Button variant="secondary" onClick={() => navigate('/patients')}>
            Back to Patients
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-container-max mx-auto px-md md:px-lg py-lg md:py-xl flex flex-col gap-gutter">

        {/* ── Action Header ── */}
        <div className="flex items-center justify-between">
          <Link
            to="/patients"
            className="flex items-center gap-xs text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span className="text-label-md">Back to Patients</span>
          </Link>
          <div className="flex gap-sm">
            <Button variant="secondary" size="sm">Edit Profile</Button>
            <Button variant="primary" size="sm">Start Consultation</Button>
          </div>
        </div>

        {/* ── CRM Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

          {/* ── Left Column ── */}
          <div className="lg:col-span-4 flex flex-col gap-gutter">

            {/* Identity Card */}
            <Card className="p-lg flex flex-col gap-md">
              <div className="flex items-start gap-md">
                <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed text-headline-lg font-bold flex-shrink-0">
                  {patient.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </div>
                <div className="flex flex-col">
                  <h1 className="text-headline-md text-on-surface">{patient.name}</h1>
                  <div className="flex items-center gap-sm mt-xs flex-wrap">
                    <span className="text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">
                      ID: {patient.id}
                    </span>
                    {patient.tag && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-outline-variant" />
                        <Badge variant="warning">{patient.tag}</Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-sm mt-sm">
                {[
                  { label: 'Age', value: `${patient.age} yrs (DOB: ${patient.dob})` },
                  { label: 'Gender', value: patient.gender },
                  { label: 'Blood Type', value: patient.bloodType },
                  { label: 'Phone', value: patient.phone },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-label-sm text-secondary uppercase tracking-wider">{label}</span>
                    <span className="text-body-md text-on-surface">{value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Allergies */}
            <Card className="p-md flex flex-col gap-md">
              <div className="flex items-center justify-between border-b border-surface-container-high pb-sm">
                <h2 className="text-label-md text-on-surface uppercase tracking-wider flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[16px] text-error">coronavirus</span>
                  Allergies
                </h2>
              </div>
              {patient.allergies.length === 0 ? (
                <p className="text-body-sm text-outline">No known allergies</p>
              ) : (
                <div className="flex flex-wrap gap-xs">
                  {patient.allergies.map((a) => (
                    <span
                      key={a}
                      className="px-sm py-1 bg-error-container text-on-error-container rounded text-label-md border border-error/20"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              )}
            </Card>

            {/* Medical Problems */}
            <Card className="p-md flex flex-col">
              <div className="flex items-center justify-between border-b border-surface-container-high pb-sm mb-sm">
                <h2 className="text-label-md text-on-surface uppercase tracking-wider flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[16px] text-secondary">monitor_heart</span>
                  Medical Problems
                </h2>
                <button className="text-primary hover:text-primary-container">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
              <div className="flex flex-col">
                {patient.problems.map((prob, i) => (
                  <div
                    key={prob.name}
                    className={`flex justify-between items-start py-sm ${
                      i < patient.problems.length - 1 ? 'border-b border-surface-container' : ''
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-body-md text-on-surface font-medium">{prob.name}</span>
                      <span className="text-body-sm text-secondary">Diagnosed: {prob.diagnosed}</span>
                    </div>
                    <Badge variant={STATUS_VARIANT[prob.status] || 'neutral'}>{prob.status}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* ── Right Column ── */}
          <div className="lg:col-span-8 flex flex-col gap-gutter">

            {/* Upcoming Appointment Banner */}
            {patient.nextAppointment && (
              <div className="bg-primary-fixed/30 border border-primary-fixed-dim rounded-xl p-md flex flex-col md:flex-row items-start md:items-center justify-between gap-md relative overflow-hidden">
                <div className="absolute -right-4 -top-4 text-primary-fixed opacity-30 pointer-events-none">
                  <span className="material-symbols-outlined" style={{ fontSize: 120 }}>event</span>
                </div>
                <div className="flex items-center gap-md relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-lowest border border-outline-variant flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-label-sm text-secondary uppercase leading-none mb-1">
                      {patient.nextAppointment.month}
                    </span>
                    <span className="text-headline-md text-primary leading-none">
                      {patient.nextAppointment.day}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-label-sm text-primary uppercase tracking-wider mb-xs">
                      Upcoming Appointment
                    </span>
                    <span className="text-headline-md text-on-surface">
                      {patient.nextAppointment.title}
                    </span>
                    <div className="flex items-center gap-sm mt-xs text-on-surface-variant flex-wrap">
                      <span className="flex items-center gap-xs text-body-sm">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        {patient.nextAppointment.time}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant" />
                      <span className="flex items-center gap-xs text-body-sm">
                        <span className="material-symbols-outlined text-[16px]">person</span>
                        {patient.nextAppointment.doctor}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="relative z-10 w-full md:w-auto">
                  Reschedule
                </Button>
              </div>
            )}

            {/* Prescriptions + Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {/* Prescriptions */}
              <Card className="flex flex-col h-full">
                <div className="p-md border-b border-surface-container-high flex justify-between items-center bg-surface/50 rounded-t-xl">
                  <h2 className="text-label-md text-on-surface uppercase tracking-wider flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px] text-primary">prescriptions</span>
                    Prescriptions
                  </h2>
                  <button className="text-primary text-label-sm hover:underline">View All</button>
                </div>
                <div className="flex flex-col p-md gap-sm">
                  {patient.prescriptions.map((rx, i) => (
                    <div
                      key={rx.id}
                      className={`flex flex-col pb-sm ${
                        i < patient.prescriptions.length - 1 ? 'border-b border-surface-container' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-body-md text-on-surface font-medium">{rx.name}</span>
                        <Badge variant={rx.status === 'Active' ? 'primary' : 'neutral'}>
                          {rx.status}
                        </Badge>
                      </div>
                      <span className="text-body-sm text-secondary mt-1">{rx.dosage}</span>
                      <div className="flex items-center gap-sm mt-2">
                        <span className="text-label-sm text-outline">Refills: {rx.refills}</span>
                        <span className="text-label-sm text-outline">Last filled: {rx.lastFilled}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Notes */}
              <Card className="flex flex-col h-full">
                <div className="p-md border-b border-surface-container-high flex justify-between items-center bg-surface/50 rounded-t-xl">
                  <h2 className="text-label-md text-on-surface uppercase tracking-wider flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px] text-tertiary-container">subject</span>
                    Recent Notes
                  </h2>
                  <button className="text-primary text-label-sm hover:underline">New Note</button>
                </div>
                <div className="flex flex-col p-md gap-md relative">
                  {/* Timeline line */}
                  <div className="absolute left-[27px] top-md bottom-md w-px bg-surface-container-high z-0" />
                  {patient.notes.map((note) => (
                    <div key={note.id} className="flex gap-md relative z-10">
                      <div className="w-6 h-6 rounded-full bg-surface-container border-2 border-surface-container-lowest flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-outline" />
                      </div>
                      <div className="flex flex-col bg-surface hover:bg-surface-container-low transition-colors rounded p-sm border border-outline-variant/30 cursor-pointer w-full">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-label-md text-on-surface">{note.title}</span>
                          <span className="text-label-sm text-secondary">{note.date}</span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant line-clamp-2">{note.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
