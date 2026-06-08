import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const GENDER_OPTIONS = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
];

const EMPTY_FORM = {
  fullName: '',
  age: '',
  gender: '',
  phone: '',
  allergies: '',
  problems: '',
  history: '',
  appointmentDate: '',
  notes: '',
};

export default function AddPatientPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate() {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.age) errs.age = 'Age is required';
    else if (form.age < 0 || form.age > 150) errs.age = 'Enter a valid age';
    if (!form.gender) errs.gender = 'Please select a gender';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      navigate('/patients');
    }, 800);
  }

  return (
    <AppLayout>
      {/* ── Top App Bar (contextual) ── */}
      <header className="bg-surface fixed top-16 w-full border-b border-outline-variant z-40">
        <div className="flex justify-between items-center px-lg h-14 w-full max-w-container-max mx-auto">
          <Link
            to="/patients"
            className="flex items-center gap-sm text-primary hover:bg-surface-variant/50 p-2 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-headline-md font-bold text-primary">Add Patient</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Extra top-padding to clear the contextual sub-header */}
      <div className="pt-14 px-md md:px-lg max-w-3xl mx-auto mb-xl">
        <form onSubmit={handleSubmit} noValidate className="space-y-lg pt-lg">

          {/* ── Personal Information ── */}
          <FormSection icon="person" title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <Input
                label="Full Name"
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Jane Doe"
                value={form.fullName}
                onChange={handleChange}
                error={errors.fullName}
                className="md:col-span-2"
              />
              <Input
                label="Age"
                id="age"
                name="age"
                type="number"
                placeholder="34"
                min={0}
                max={150}
                value={form.age}
                onChange={handleChange}
                error={errors.age}
              />
              <Select
                label="Gender"
                id="gender"
                name="gender"
                placeholder="Select gender"
                options={GENDER_OPTIONS}
                value={form.gender}
                onChange={handleChange}
                error={errors.gender}
              />
              <Input
                label="Phone Number"
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
                className="md:col-span-2"
              />
            </div>
          </FormSection>

          {/* ── Medical Information ── */}
          <FormSection icon="medical_information" title="Medical Information">
            <div className="flex flex-col gap-gutter">
              <Textarea
                label="Allergies"
                id="allergies"
                name="allergies"
                placeholder="List any known allergies…"
                rows={2}
                value={form.allergies}
                onChange={handleChange}
              />
              <Textarea
                label="Current Problems"
                id="problems"
                name="problems"
                placeholder="Describe current symptoms or reasons for visit…"
                rows={3}
                value={form.problems}
                onChange={handleChange}
              />
              <Textarea
                label="Medical History"
                id="history"
                name="history"
                placeholder="Relevant past medical history…"
                rows={3}
                value={form.history}
                onChange={handleChange}
              />
            </div>
          </FormSection>

          {/* ── Appointment Information ── */}
          <FormSection icon="calendar_today" title="Appointment Information">
            <div className="flex flex-col gap-gutter">
              <Input
                label="Next Appointment Date"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
                value={form.appointmentDate}
                onChange={handleChange}
                className="md:w-1/2"
              />
              <Textarea
                label="Notes"
                id="notes"
                name="notes"
                placeholder="Additional administrative or scheduling notes…"
                rows={2}
                value={form.notes}
                onChange={handleChange}
              />
            </div>
          </FormSection>

          {/* ── Actions ── */}
          <div className="flex justify-end pt-md pb-xl gap-sm">
            <Link to="/patients">
              <Button variant="secondary" type="button">Cancel</Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              icon="save"
              disabled={saving}
            >
              {saving ? 'Saving…' : 'Save Patient'}
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
