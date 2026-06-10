import { useState, useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Toggle from '../components/ui/Toggle';
import Card from '../components/ui/Card';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: '',
    specialty: '',
    licenseNumber: '',
    clinicName: '',
    clinicAddress: '',
    contactNumber: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [apiError, setApiError] = useState('');

  // ── Fetch Profile ──
  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem('authToken');
        const res = await fetch('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setApiError(data.error || 'Failed to load profile');
          return;
        }
        setProfile({
          name: data.name || '',
          specialty: data.specialty || '',
          licenseNumber: data.licenseNumber || '',
          clinicName: data.clinicName || '',
          clinicAddress: data.clinicAddress || '',
          contactNumber: data.contactNumber || '',
        });
      } catch (err) {
        setApiError('Server connection failed.');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    if (apiError) setApiError('');
  }

  async function handleSave() {
    setSaving(true);
    setApiError('');
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || 'Failed to update profile');
        return;
      }

      // ✅ Update localStorage user
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({
        ...user,
        name: profile.name,
        specialty: profile.specialty,
      }));

      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    } catch (err) {
      setApiError('Server connection failed.');
    } finally {
      setSaving(false);
    }
  }

  // ── Get Initials ──
  const initials = profile.name
    ? profile.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : 'DR';

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-md">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-body-md text-on-surface-variant">Loading settings...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="pt-lg pb-[104px] md:pb-xl px-md md:px-lg w-full max-w-3xl mx-auto flex flex-col gap-xl">

        {/* ── Page Title ── */}
        <div className="flex flex-col gap-xs">
          <h1 className="text-display text-on-surface">Settings</h1>
          <p className="text-body-md text-on-surface-variant">
            Manage your clinical profile and account preferences.
          </p>
        </div>

        {/* ── API Error ── */}
        {apiError && (
          <div className="bg-error-container border border-error/30 rounded-lg p-md">
            <p className="text-body-sm text-on-error-container flex items-center gap-sm">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {apiError}
            </p>
          </div>
        )}

        {/* ── Doctor Profile ── */}
        <Card className="overflow-hidden">
          <SectionHeader title="Doctor Profile" />
          <div className="p-lg flex flex-col md:flex-row gap-lg items-start">

            {/* Avatar */}
            <div className="flex flex-col items-center gap-md flex-shrink-0 w-full md:w-auto">
              <div className="w-32 h-32 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed text-[40px] font-bold">
                {initials}
              </div>
            </div>

            {/* Fields */}
            <div className="flex flex-col w-full gap-gutter">
              <Input
                label="Full Name"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleChange}
                disabled={saving}
              />
              <Input
                label="Specialty"
                name="specialty"
                type="text"
                value={profile.specialty}
                onChange={handleChange}
                disabled={saving}
              />
              <Input
                label="Medical License Number"
                name="licenseNumber"
                type="text"
                value={profile.licenseNumber}
                onChange={handleChange}
                disabled={saving}
                helper="Contact support to update your license number."
              />
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={saving}
                  icon={profileSaved ? 'check' : 'save'}
                >
                  {saving ? 'Saving…' : profileSaved ? 'Saved!' : 'Save Profile'}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* ── Clinic Information ── */}
        <Card className="overflow-hidden">
          <SectionHeader title="Clinic Information" />
          <div className="p-lg flex flex-col gap-gutter">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <Input
                label="Clinic Name"
                name="clinicName"
                type="text"
                value={profile.clinicName}
                onChange={handleChange}
                disabled={saving}
              />
              <Input
                label="Contact Number"
                name="contactNumber"
                type="tel"
                value={profile.contactNumber}
                onChange={handleChange}
                disabled={saving}
              />
            </div>
            <Input
              label="Clinic Address"
              name="clinicAddress"
              type="text"
              value={profile.clinicAddress}
              onChange={handleChange}
              disabled={saving}
            />
            <div className="flex justify-end">
              <Button
                variant="secondary"
                onClick={handleSave}
                disabled={saving}
                icon={profileSaved ? 'check' : undefined}
              >
                {saving ? 'Saving…' : profileSaved ? 'Updated!' : 'Update Clinic Details'}
              </Button>
            </div>
          </div>
        </Card>

        {/* ── Account Settings ── */}
        <Card className="overflow-hidden">
          <SectionHeader title="Account Settings" />
          <div className="p-lg flex flex-col gap-xl border-b border-outline-variant">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
              <div className="flex flex-col gap-xs">
                <h3 className="text-body-lg font-semibold text-on-surface">Email Address</h3>
                <p className="text-body-sm text-on-surface-variant">
                  Current email:{' '}
                  <span className="text-label-md text-on-surface">
                    {JSON.parse(localStorage.getItem('user') || '{}')?.email || 'N/A'}
                  </span>
                </p>
              </div>
              <Button variant="secondary" size="sm">Change Email</Button>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
              <div className="flex flex-col gap-xs">
                <h3 className="text-body-lg font-semibold text-on-surface">Password</h3>
                <p className="text-body-sm text-on-surface-variant">
                  Update your account password.
                </p>
              </div>
              <Button variant="secondary" size="sm">Update Password</Button>
            </div>
          </div>

          {/* Notifications */}
          <div className="p-lg flex flex-col gap-md">
            <h3 className="text-body-lg font-semibold text-on-surface">Notifications</h3>
            <Toggle
              checked={true}
              label="Patient Appointment Reminders"
              description="Receive alerts when a patient books or cancels."
            />
            <Toggle
              checked={true}
              label="Daily Schedule Summary"
              description="An email sent every morning at 7:00 AM."
            />
            <Toggle
              checked={false}
              label="System Updates & News"
              description="Occasional emails about new features."
            />
          </div>
        </Card>

        {/* ── Danger Zone ── */}
        <Card className="overflow-hidden border-error/30">
          <SectionHeader
            title="Danger Zone"
            className="border-error/20 bg-error-container/20"
          />
          <div className="p-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
            <div className="flex flex-col gap-xs">
              <h3 className="text-body-lg font-semibold text-on-surface">Delete Account</h3>
              <p className="text-body-sm text-on-surface-variant">
                Permanently remove your account. This cannot be undone.
              </p>
            </div>
            <Button variant="danger" size="sm">Delete Account</Button>
          </div>
        </Card>

      </div>
    </AppLayout>
  );
}

function SectionHeader({ title, className = '' }) {
  return (
    <div className={`border-b border-outline-variant px-lg py-md bg-surface/50 ${className}`}>
      <h2 className="text-headline-md text-on-surface">{title}</h2>
    </div>
  );
}