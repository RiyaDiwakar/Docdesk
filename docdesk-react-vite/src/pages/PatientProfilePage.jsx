import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const STATUS_VARIANT = {
  Chronic: 'warning',
  Resolved: 'neutral',
  Ongoing: 'secondary',
  Active: 'primary',
};

export default function PatientProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPatient();
  }, [id]);

  async function fetchPatient() {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`http://localhost:5000/api/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Patient not found');
        return;
      }
      setPatient(data);
    } catch (err) {
      setError('Server connection failed.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${patient.name}? This cannot be undone.`
    );
    if (!confirmed) return;

    setDeleting(true);
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`http://localhost:5000/api/patients/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to delete patient');
        setDeleting(false);
        return;
      }

      navigate('/patients');
    } catch (err) {
      alert('Server connection failed.');
      setDeleting(false);
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-md">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-body-md text-on-surface-variant">Loading patient...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error || !patient) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-md">
          <span className="material-symbols-outlined text-[64px] text-outline">person_off</span>
          <h2 className="text-headline-lg text-on-surface">Patient not found</h2>
          <p className="text-body-md text-on-surface-variant">{error}</p>
          <Button variant="secondary" onClick={() => navigate('/patients')}>
            Back to Patients
          </Button>
        </div>
      </AppLayout>
    );
  }

  const initials = patient.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

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
            <Button
              variant="danger"
              size="sm"
              icon="delete"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? 'Deleting…' : 'Delete'}
            </Button>
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
                  {initials}
                </div>
                <div className="flex flex-col">
                  <h1 className="text-headline-md text-on-surface">{patient.name}</h1>
                  <span className="text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant mt-xs w-fit">
                    {patient.gender}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-sm mt-sm">
                {[
                  { label: 'Date of Birth', value: formatDate(patient.dateOfBirth) },
                  { label: 'Blood Type', value: patient.bloodType || 'Unknown' },
                  { label: 'Phone', value: patient.phone },
                  { label: 'Email', value: patient.email || 'N/A' },
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
              {!patient.allergies || patient.allergies.length === 0 ? (
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
              </div>
              {!patient.medicalProblems || patient.medicalProblems.length === 0 ? (
                <p className="text-body-sm text-outline py-sm">No medical problems recorded.</p>
              ) : (
                <div className="flex flex-col">
                  {patient.medicalProblems.map((prob, i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-start py-sm ${
                        i < patient.medicalProblems.length - 1 ? 'border-b border-surface-container' : ''
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-body-md text-on-surface font-medium">{prob.name}</span>
                        <span className="text-body-sm text-secondary">
                          Diagnosed: {formatDate(prob.diagnosed)}
                        </span>
                      </div>
                      <Badge variant={STATUS_VARIANT[prob.status] || 'neutral'}>
                        {prob.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* ── Right Column ── */}
          <div className="lg:col-span-8 flex flex-col gap-gutter">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">

              {/* Prescriptions */}
              <Card className="flex flex-col h-full">
                <div className="p-md border-b border-surface-container-high flex justify-between items-center bg-surface/50 rounded-t-xl">
                  <h2 className="text-label-md text-on-surface uppercase tracking-wider flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px] text-primary">prescriptions</span>
                    Prescriptions
                  </h2>
                </div>
                <div className="flex flex-col p-md gap-sm">
                  {!patient.prescriptions || patient.prescriptions.length === 0 ? (
                    <p className="text-body-sm text-outline">No prescriptions.</p>
                  ) : (
                    patient.prescriptions.map((rx, i) => (
                      <div key={i} className={`flex flex-col pb-sm ${i < patient.prescriptions.length - 1 ? 'border-b border-surface-container' : ''}`}>
                        <div className="flex justify-between items-start">
                          <span className="text-body-md text-on-surface font-medium">{rx.name}</span>
                          <Badge variant={rx.status === 'Active' ? 'primary' : 'neutral'}>{rx.status}</Badge>
                        </div>
                        <span className="text-body-sm text-secondary mt-1">{rx.dosage}</span>
                      </div>
                    ))
                  )}
                </div>
              </Card>

              {/* Notes */}
              <Card className="flex flex-col h-full">
                <div className="p-md border-b border-surface-container-high flex justify-between items-center bg-surface/50 rounded-t-xl">
                  <h2 className="text-label-md text-on-surface uppercase tracking-wider flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px] text-secondary">subject</span>
                    Clinical Notes
                  </h2>
                </div>
                <div className="flex flex-col p-md gap-md">
                  {!patient.notes || patient.notes.length === 0 ? (
                    <p className="text-body-sm text-outline">No notes yet.</p>
                  ) : (
                    patient.notes.map((note, i) => (
                      <div key={i} className="flex flex-col bg-surface hover:bg-surface-container-low transition-colors rounded p-sm border border-outline-variant/30 cursor-pointer">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-label-md text-on-surface">{note.title}</span>
                          <span className="text-label-sm text-secondary">{formatDate(note.createdAt)}</span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant line-clamp-2">{note.body}</p>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}