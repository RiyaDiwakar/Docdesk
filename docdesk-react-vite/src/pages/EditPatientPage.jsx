import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { useToast } from '../hooks/useToast';

const GENDER_OPTIONS = [
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
  { value: 'Non-binary', label: 'Non-binary' },
  { value: 'Prefer not to say', label: 'Prefer not to say' },
];

const BLOOD_TYPE_OPTIONS = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
];

export default function EditPatientPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    bloodType: '',
    allergies: '',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const { showToast, ToastContainer } = useToast();

  useEffect(() => {
    async function fetchPatient() {
      try {
        const token = localStorage.getItem('authToken');
        const res = await fetch(`http://localhost:5000/api/patients/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setApiError(data.error || 'Patient not found');
          return;
        }
        const dob = data.dateOfBirth
          ? new Date(data.dateOfBirth).toISOString().split('T')[0]
          : '';
        setForm({
          name: data.name || '',
          phone: data.phone || '',
          email: data.email || '',
          dateOfBirth: dob,
          gender: data.gender || '',
          bloodType: data.bloodType || '',
          allergies: data.allergies?.join(', ') || '',
        });
      } catch (err) {
        setApiError('Server connection failed.');
      } finally {
        setLoading(false);
      }
    }
    fetchPatient();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (apiError) setApiError('');
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (!form.dateOfBirth) errs.dateOfBirth = 'Date of birth is required';
    if (!form.gender) errs.gender = 'Please select a gender';
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
      const res = await fetch(`http://localhost:5000/api/patients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || undefined,
          dateOfBirth: form.dateOfBirth,
          gender: form.gender,
          bloodType: form.bloodType || undefined,
          allergies: form.allergies
            ? form.allergies.split(',').map((a) => a.trim()).filter(Boolean)
            : [],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setApiError(data.error || 'Failed to update patient');
        showToast(data.error || 'Failed to update patient', 'error');
        setSaving(false);
        return;
      }
      showToast('Patient updated successfully!', 'success');
      setTimeout(() => navigate(`/patients/${id}`), 1000);
    } catch (err) {
      setApiError('Server connection failed.');
      showToast('Server connection failed.', 'error');
      setSaving(false);
    }
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

  return (
    <AppLayout>
      <header className="bg-surface fixed top-16 w-full border-b border-outline-variant z-40">
        <div className="flex justify-between items-center px-lg h-14 w-full max-w-container-max mx-auto">
          <Link
            to={`/patients/${id}`}
            className="flex items-center gap-sm text-primary hover:bg-surface-variant/50 p-2 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-headline-md font-bold text-primary">Edit Patient</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="pt-14 px-md md:px-lg max-w-3xl mx-auto mb-xl">
        <form onSubmit={handleSubmit} noValidate className="space-y-lg pt-lg">

          {apiError && (
            <div className="bg-error-container border border-error/30 rounded-lg p-md">
              <p className="text-body-sm text-on-error-container flex items-center gap-sm">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {apiError}
              </p>
            </div>
          )}

          <FormSection icon="person" title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <Input
                label="Full Name *"
                id="name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
                className="md:col-span-2"
                disabled={saving}
              />
              <Input
                label="Phone Number *"
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={handleChange}
                error={errors.phone}
                disabled={saving}
              />
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="patient@example.com"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                disabled={saving}
              />
              <Input
                label="Date of Birth *"
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={handleChange}
                error={errors.dateOfBirth}
                disabled={saving}
              />
              <Select
                label="Gender *"
                id="gender"
                name="gender"
                placeholder="Select gender"
                options={GENDER_OPTIONS}
                value={form.gender}
                onChange={handleChange}
                error={errors.gender}
                disabled={saving}
              />
              <Select
                label="Blood Type"
                id="bloodType"
                name="bloodType"
                placeholder="Select blood type"
                options={BLOOD_TYPE_OPTIONS}
                value={form.bloodType}
                onChange={handleChange}
                disabled={saving}
              />
            </div>
          </FormSection>

          <FormSection icon="medical_information" title="Medical Information">
            <Textarea
              label="Allergies"
              id="allergies"
              name="allergies"
              placeholder="Penicillin, Latex, Peanuts (comma separated)"
              rows={2}
              value={form.allergies}
              onChange={handleChange}
              disabled={saving}
              helper="Separate multiple allergies with commas"
            />
          </FormSection>

          <div className="flex justify-end pt-md pb-xl gap-sm">
            <Link to={`/patients/${id}`}>
              <Button variant="secondary" type="button" disabled={saving}>
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              icon={saving ? undefined : 'save'}
              disabled={saving}
            >
              {saving ? 'Saving…' : 'Update Patient'}
            </Button>
          </div>

        </form>
      </div>

      <ToastContainer />
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