import { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Toggle from '../components/ui/Toggle';
import Card from '../components/ui/Card';

const INITIAL_PROFILE = {
  name: 'Dr. Sarah Jenkins',
  specialty: 'General Practice & Family Medicine',
  license: 'MED-88392-CA',
};

const INITIAL_CLINIC = {
  clinicName: 'Jenkins Family Care',
  contactNumber: '(555) 123-4567',
  address: '1200 Medical Plaza Drive, Suite 300',
  city: 'San Francisco',
  state: 'CA 94103',
};

export default function SettingsPage() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [clinic, setClinic] = useState(INITIAL_CLINIC);
  const [profileSaved, setProfileSaved] = useState(false);
  const [clinicSaved, setClinicSaved] = useState(false);

  function handleProfileChange(e) {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
    setProfileSaved(false);
  }

  function handleClinicChange(e) {
    const { name, value } = e.target;
    setClinic((prev) => ({ ...prev, [name]: value }));
    setClinicSaved(false);
  }

  function saveProfile() {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  }

  function saveClinic() {
    setClinicSaved(true);
    setTimeout(() => setClinicSaved(false), 2500);
  }

  return (
    <AppLayout>
      <div className="pt-lg pb-[104px] md:pb-xl px-md md:px-lg w-full max-w-3xl mx-auto flex flex-col gap-xl">

        {/* ── Page title ── */}
        <div className="flex flex-col gap-xs">
          <h1 className="text-display text-on-surface">Settings</h1>
          <p className="text-body-md text-on-surface-variant">
            Manage your clinical profile, practice details, and account preferences.
          </p>
        </div>

        {/* ── Doctor Profile ── */}
        <Card className="overflow-hidden">
          <SectionHeader title="Doctor Profile" />
          <div className="p-lg flex flex-col md:flex-row gap-lg items-start">
            {/* Avatar column */}
            <div className="flex flex-col items-center gap-md flex-shrink-0 w-full md:w-auto">
              <div className="w-32 h-32 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed text-[40px] font-bold relative group cursor-pointer border-2 border-primary-fixed-dim">
                DR
                <div className="absolute inset-0 rounded-full bg-inverse-surface/50 hidden group-hover:flex items-center justify-center transition-all">
                  <span className="material-symbols-outlined text-on-primary">photo_camera</span>
                </div>
              </div>
              <button className="text-label-sm text-primary uppercase tracking-widest hover:text-primary-container transition-colors">
                Change Photo
              </button>
            </div>

            {/* Fields */}
            <div className="flex flex-col w-full gap-gutter">
              <Input
                label="Full Name"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleProfileChange}
              />
              <Input
                label="Specialty"
                name="specialty"
                type="text"
                value={profile.specialty}
                onChange={handleProfileChange}
              />
              <Input
                label="Medical License Number"
                name="license"
                type="text"
                value={profile.license}
                disabled
                helper="Contact support to update your license number."
              />
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={saveProfile}
                  icon={profileSaved ? 'check' : undefined}
                >
                  {profileSaved ? 'Saved!' : 'Save Profile'}
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
                value={clinic.clinicName}
                onChange={handleClinicChange}
              />
              <Input
                label="Contact Number"
                name="contactNumber"
                type="tel"
                value={clinic.contactNumber}
                onChange={handleClinicChange}
              />
            </div>
            <div className="flex flex-col gap-sm">
              <Input
                label="Primary Address"
                name="address"
                type="text"
                value={clinic.address}
                onChange={handleClinicChange}
              />
              <div className="grid grid-cols-2 gap-gutter mt-sm">
                <Input
                  name="city"
                  type="text"
                  placeholder="City"
                  value={clinic.city}
                  onChange={handleClinicChange}
                />
                <Input
                  name="state"
                  type="text"
                  placeholder="State / ZIP"
                  value={clinic.state}
                  onChange={handleClinicChange}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                variant="secondary"
                onClick={saveClinic}
                icon={clinicSaved ? 'check' : undefined}
              >
                {clinicSaved ? 'Updated!' : 'Update Clinic Details'}
              </Button>
            </div>
          </div>
        </Card>

        {/* ── Account Settings ── */}
        <Card className="overflow-hidden">
          <SectionHeader title="Account Settings" />

          {/* Email + Password rows */}
          <div className="p-lg flex flex-col gap-xl border-b border-outline-variant">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
              <div className="flex flex-col gap-xs">
                <h3 className="text-body-lg font-semibold text-on-surface">Email Address</h3>
                <p className="text-body-sm text-on-surface-variant">
                  Your current login email is{' '}
                  <span className="text-label-md text-on-surface">s.jenkins@docdesk.app</span>
                </p>
              </div>
              <Button variant="secondary" size="sm" className="whitespace-nowrap">
                Change Email
              </Button>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
              <div className="flex flex-col gap-xs">
                <h3 className="text-body-lg font-semibold text-on-surface">Password</h3>
                <p className="text-body-sm text-on-surface-variant">Last changed 3 months ago.</p>
              </div>
              <Button variant="secondary" size="sm" className="whitespace-nowrap">
                Update Password
              </Button>
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
          <SectionHeader title="Danger Zone" className="border-error/20 bg-error-container/20" />
          <div className="p-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
            <div className="flex flex-col gap-xs">
              <h3 className="text-body-lg font-semibold text-on-surface">Delete Account</h3>
              <p className="text-body-sm text-on-surface-variant">
                Permanently remove your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <Button variant="danger" size="sm" className="whitespace-nowrap">
              Delete Account
            </Button>
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
