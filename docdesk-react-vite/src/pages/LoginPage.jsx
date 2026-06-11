import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
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
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
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
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      // ✅ Success! Token save kar
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // ✅ Dashboard ko navigate kar
      navigate('/dashboard');
    } catch (error) {
      setApiError(error.message || 'Server connection failed');
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface min-h-screen flex items-center justify-center text-on-surface px-md">
      <main className="w-full max-w-md">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-xl shadow-sm">
          {/* Brand mark */}
          <div className="flex flex-col items-center mb-lg">
            <span className="material-symbols-outlined icon-fill text-primary text-[44px] mb-sm">
              clinical_notes
            </span>
            <h1 className="text-headline-lg text-on-surface">DocDesk</h1>
            <p className="text-body-sm text-on-surface-variant mt-xs">
              Sign in to your clinical workspace
            </p>
          </div>

          {/* API Error */}
          {apiError && (
            <div className="bg-error-container border border-error rounded-lg p-md mb-lg">
              <p className="text-body-sm text-on-error-container">{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-gutter">
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="doctor@clinic.com"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
              disabled={loading}
            />

            <div className="flex flex-col gap-sm">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-label-md text-on-surface-variant font-medium">
                  Password
                </label>
                <a href="#" className="text-label-md text-primary hover:text-primary-container transition-colors">
                  Forgot Password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                autoComplete="current-password"
                className={`w-full bg-surface-container-lowest border rounded-DEFAULT px-md py-[10px]
                  text-body-md text-on-surface placeholder:text-outline
                  focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim
                  transition-all duration-200 disabled:opacity-50
                  ${errors.password ? 'border-error' : 'border-outline-variant'}`}
              />
              {errors.password && (
                <span className="text-body-sm text-error">{errors.password}</span>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-lg"
              disabled={loading}
              iconEnd={loading ? undefined : 'login'}
            >
              {loading ? 'Signing in…' : 'Login'}
            </Button>
          </form>

          
       <p className="text-center text-body-sm text-on-surface-variant mt-lg">
  New to DocDesk?{' '}
  <Link to="/register" className="text-primary hover:underline font-medium">
    Create Account
  </Link>
</p>

          {/* Test Credentials */}
          <div className="mt-lg pt-lg border-t border-outline-variant">
            <p className="text-label-sm text-on-surface-variant mb-md">
              ℹ️ Test Credentials:
            </p>
            <code className="text-body-sm text-primary bg-surface-container rounded p-sm block">
              Email: doctor@clinic.com
              <br />
              Password: password123
            </code>
          </div>
        </div>
      </main>
    </div>
  );
}