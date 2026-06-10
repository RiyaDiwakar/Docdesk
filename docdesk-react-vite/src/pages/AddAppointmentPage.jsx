import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';

const TYPE_OPTIONS = [
  { value: 'Consultation', label: 'Consultation' },
  { value: 'Follow-up', label: 'Follow-up' },
  { value: 'Test Results', label: 'Test Results' },
  { value: 'Procedure', label: 'Procedure' },
];

const EMPTY_FORM = {
  patientId: '',
  date: '',
  time: '',
  type: 'Consultation',
  notes: '',
  location: '',
  isVirtual: false,
};

export default function AddAppointmentPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [patients, setPatients] = useState([]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    async function fetchPatients() {
      try {
        const token = localStorage.getItem('authToken');
        const res = await fetch('http://localhost:5000/api/patients?limit=100', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPatients(data.data || []);
      } catch (err) {
        console.error('Failed to fetch patients');
      }
    }
    fetchPatients();
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (apiError) setApiError('');
  }

  function validate() {
    const errs = {};
    if (!form.patientId) errs.patientId = 'Please select a patient';
    if (!form.date) errs.date = 'Date is required';
    if (!form.time) errs.time = 'Time is required';
    if (!form.type) errs.type = 'Type is required';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSaving(true);
    setApiError('');

    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          patientId: form.patientId,
          date: form.date,
          time: form.time,
          type: form.type,
          notes: form.notes || undefined,
          location: form.location || 'Clinic',
          isVirtual: form.isVirtual,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || 'Failed to add appointment');
        setSaving(false);
        return;
      }

      navigate('/appointments');
    } catch (err) {
      setApiError('Server connection failed. Check backend is running.');
      setSaving(false);
    }
  }

  const patientOptions = patients.map((p) => ({
    value: p._id,
    label: p.name,
  }));

  return (
    <AppLayout>
      {/* ── Contextual Header ── */}
      <header className="bg-surface fixed top-16 w-full border-b border-outline-variant z-40">
        <div className="flex justify-between items-center px-lg h-14 w-full max-w-container-max mx-auto">
          <Link
            to="/appointments"
            className="flex items-center gap-sm text-primary hover:bg-surface-variant/50 p-2 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-headline-md font-bold text-primary">Add Appointment</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="pt-14 px-md md:px-lg max-w-3xl mx-auto mb-xl">
        <form onSubmit={handleSubmit} noValidate className="space-y-lg pt-lg">

          {/* API Error */}
          {apiError && (
            <div className="bg-error-container border border-error/30 rounded-lg p-md">
              <p className="text-body-sm text-on-error-container flex items-center gap-sm">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {apiError}
              </p>
            </div>
          )}

          {/* ── Patient & Schedule ── */}
          <FormSection icon="person" title="Patient & Schedule">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">

              <Select
                label="Select Patient *"
                id="patientId"
                name="patientId"
                placeholder="Choose a patient"
                options={patientOptions}
                value={form.patientId}
                onChange={handleChange}
                error={errors.patientId}
                className="md:col-span-2"
                disabled={saving}
              />

              <Input
                label="Date *"
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                error={errors.date}
                disabled={saving}
              />

              <Input
                label="Time *"
                id="time"
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                error={errors.time}
                disabled={saving}
              />

              <Select
                label="Appointment Type *"
                id="type"
                name="type"
                options={TYPE_OPTIONS}
                value={form.type}
                onChange={handleChange}
                error={errors.type}
                disabled={saving}
              />

              <Input
                label="Location"
                id="location"
                name="location"
                type="text"
                placeholder="Room 3, Main Clinic"
                value={form.location}
                onChange={handleChange}
                disabled={saving}
              />
            </div>
          </FormSection>

          {/* ── Additional Info ── */}
          <FormSection icon="notes" title="Additional Info">
            <div className="flex flex-col gap-gutter">
              <Textarea
                label="Notes"
                id="notes"
                name="notes"
                placeholder="Any notes about this appointment..."
                rows={3}
                value={form.notes}
                onChange={handleChange}
                disabled={saving}
              />

              {/* Virtual Toggle */}
              <div className="flex items-center gap-md p-md bg-surface-container rounded-lg border border-outline-variant">
                <div className="flex flex-col flex-1">
                  <span className="text-body-md text-on-surface font-medium">
                    Virtual Appointment
                  </span>
                  <span className="text-body-sm text-on-surface-variant">
                    Is this a telehealth/video call appointment?
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isVirtual"
                    checked={form.isVirtual}
                    onChange={handleChange}
                    className="sr-only peer"
                    disabled={saving}
                  />
                  <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                </label>
              </div>
            </div>
          </FormSection>

          {/* ── Actions ── */}
          <div className="flex justify-end pt-md pb-xl gap-sm">
            <Link to="/appointments">
              <Button variant="secondary" type="button" disabled={saving}>
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              icon={saving ? undefined : 'event_available'}
              disabled={saving}
            >
              {saving ? 'Saving…' : 'Schedule Appointment'}
            </Button>
          </div>

        </form>
      </div>
    </AppLayout>
  );
}

function FormSection({ icon, title, children }) {
  return (
    <section className="bg-surface-container-lowest border border-surface-variant rounded-lg p-lg">
      <div className="flex items-center gap-sm mb-md pb-sm border-b border-surface-variant">
        <span className="material-symbols-outlined text-secondary">{icon}</span>
        <h2 className="text-headline-md text-on-surface">{title}</h2>
      </div>
      {children}
    </section>
  );
}