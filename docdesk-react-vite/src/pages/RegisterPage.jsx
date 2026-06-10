import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialty: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (apiError) setApiError('');
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    if (!form.specialty.trim()) errs.specialty = 'Specialty is required';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setApiError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          specialty: form.specialty,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      // ✅ Success! Token save kar
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // ✅ Dashboard mein redirect
      navigate('/dashboard');
    } catch (err) {
      setApiError('Server connection failed. Check backend is running.');
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface min-h-screen flex items-center justify-center text-on-surface px-md py-xl">
      <main className="w-full max-w-md">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-xl shadow-sm">

          {/* Brand mark */}
          <div className="flex flex-col items-center mb-lg">
            <span className="material-symbols-outlined icon-fill text-primary text-[44px] mb-sm">
              clinical_notes
            </span>
            <h1 className="text-headline-lg text-on-surface">Create Account</h1>
            <p className="text-body-sm text-on-surface-variant mt-xs text-center">
              Join DocDesk and manage your practice efficiently
            </p>
          </div>

          {/* API Error */}
          {apiError && (
            <div className="bg-error-container border border-error/30 rounded-lg p-md mb-lg">
              <p className="text-body-sm text-on-error-container flex items-center gap-sm">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {apiError}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-gutter">

            {/* Full Name */}
            <Input
              label="Full Name"
              id="name"
              name="name"
              type="text"
              placeholder="Dr. John Smith"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              disabled={loading}
              autoComplete="name"
            />

            {/* Email */}
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="doctor@clinic.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              disabled={loading}
              autoComplete="email"
            />

            {/* Specialty */}
            <Input
              label="Specialty"
              id="specialty"
              name="specialty"
              type="text"
              placeholder="General Practice, Cardiology..."
              value={form.specialty}
              onChange={handleChange}
              error={errors.specialty}
              disabled={loading}
            />

            {/* Password */}
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              disabled={loading}
              autoComplete="new-password"
            />

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              disabled={loading}
              autoComplete="new-password"
            />

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-lg"
              disabled={loading}
              iconEnd={loading ? undefined : 'arrow_forward'}
            >
              {loading ? 'Creating Account…' : 'Create Account'}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-body-sm text-on-surface-variant mt-lg">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <div className="text-center mt-md">
          <Link
            to="/"
            className="text-body-sm text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-xs"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}