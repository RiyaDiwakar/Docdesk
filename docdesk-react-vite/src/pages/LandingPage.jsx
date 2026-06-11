import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-surface text-on-surface font-sans min-h-screen flex flex-col antialiased overflow-x-hidden">

      {/* ── Navbar ── */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-header border-b border-outline-variant shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-lg h-16 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-sm text-primary">
            <span className="material-symbols-outlined icon-fill text-[28px]">clinical_notes</span>
            <span className="text-headline-md font-bold tracking-tight">DocDesk</span>
          </Link>
          <nav className="flex items-center gap-md">
            <Link
              to="/login"
              className="hidden md:block text-label-md text-secondary hover:text-on-surface transition-colors px-md py-sm"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-label-md bg-primary text-on-primary px-lg py-sm rounded-full hover:opacity-90 transition-all shadow-sm"
            >
              Get Started →
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">

        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        >
          {/* Background gradient blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-surface-container-low/50 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-lg py-xl flex flex-col lg:flex-row items-center gap-xl lg:gap-[80px]">

            {/* Left - Text */}
            <div className="flex-1 flex flex-col items-start text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-xs bg-primary/10 text-primary px-md py-xs rounded-full text-label-sm mb-lg border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Trusted by 500+ doctors in India
              </div>

              <h1 className="text-[52px] leading-[60px] lg:text-[68px] lg:leading-[76px] font-bold text-on-surface tracking-tight mb-md max-w-2xl">
                Patient Management,{' '}
                <span className="text-primary relative">
                  Simplified.
                  <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none">
                    <path d="M0 3 Q50 0 100 3 Q150 6 200 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
                  </svg>
                </span>
              </h1>

              <p className="text-body-lg text-on-surface-variant mb-xl max-w-xl leading-relaxed">
                DocDesk helps doctors manage patients, appointments, and medical
                records in one elegant workspace. Built for Indian healthcare.
              </p>

              <div className="flex flex-col sm:flex-row gap-md w-full sm:w-auto">
                <Link
                  to="/register"
                  className="bg-primary text-on-primary text-label-md px-xl py-[14px] rounded-full hover:opacity-90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-sm group"
                >
                  Start for Free
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  to="/login"
                  className="bg-surface-container-lowest text-on-surface border border-outline-variant text-label-md px-xl py-[14px] rounded-full hover:bg-surface-container transition-all flex items-center justify-center gap-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  Doctor Login
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-lg mt-xl pt-xl border-t border-outline-variant/30 w-full">
                {[
                  { icon: 'lock', label: 'HIPAA Compliant' },
                  { icon: 'cloud_done', label: 'Cloud Backup' },
                  { icon: 'devices', label: 'Works on All Devices' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-xs text-secondary text-body-sm">
                    <span className="material-symbols-outlined text-[16px] text-primary">{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Animated Dashboard Preview */}
            <div className="flex-1 w-full max-w-[500px] relative">
              <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl" />
              <div className="relative bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-xl overflow-hidden">

                {/* App Header */}
                <div className="flex items-center justify-between px-md py-sm border-b border-outline-variant bg-surface-container-low">
                  <div className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary text-[18px]">clinical_notes</span>
                    <span className="text-label-md font-bold text-primary">DocDesk</span>
                  </div>
                  <div className="flex gap-xs">
                    <div className="w-3 h-3 rounded-full bg-error/40" />
                    <div className="w-3 h-3 rounded-full bg-tertiary-fixed/60" />
                    <div className="w-3 h-3 rounded-full bg-primary/40" />
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-sm p-md">
                  {[
                    { label: 'Total Patients', value: '142', icon: 'group', color: 'text-primary' },
                    { label: 'Today\'s Appointments', value: '8', icon: 'calendar_today', color: 'text-secondary' },
                  ].map(({ label, value, icon, color }) => (
                    <div key={label} className="bg-surface-container rounded-xl p-sm border border-outline-variant/50">
                      <div className="flex justify-between items-start mb-xs">
                        <span className="text-label-sm text-secondary">{label}</span>
                        <span className={`material-symbols-outlined text-[16px] ${color}`}>{icon}</span>
                      </div>
                      <span className={`text-[28px] font-bold ${color}`}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Patient List Preview */}
                <div className="px-md pb-md flex flex-col gap-xs">
                  <span className="text-label-sm text-secondary uppercase tracking-wider mb-xs">Recent Patients</span>
                  {[
                    { name: 'Eleanor Rigby', detail: 'Hypertension • Oct 12', initials: 'ER' },
                    { name: 'Marcus Rodriguez', detail: 'Diabetes • Oct 10', initials: 'MR' },
                    { name: 'Jane Smith', detail: 'Allergies • Oct 08', initials: 'JS' },
                  ].map(({ name, detail, initials }, i) => (
                    <div
                      key={name}
                      className="flex items-center gap-sm p-sm rounded-lg hover:bg-surface-container transition-colors border border-transparent hover:border-outline-variant/30"
                      style={{
                        opacity: 1 - i * 0.2,
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-label-sm font-bold text-on-primary-fixed flex-shrink-0">
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-body-md text-on-surface font-medium truncate">{name}</p>
                        <p className="text-body-sm text-secondary truncate">{detail}</p>
                      </div>
                      <span className="material-symbols-outlined text-outline text-[16px]">chevron_right</span>
                    </div>
                  ))}
                </div>

                {/* Appointment Banner */}
                <div className="mx-md mb-md bg-primary/10 border border-primary/20 rounded-xl p-sm flex items-center gap-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[16px]">event_available</span>
                  </div>
                  <div>
                    <p className="text-label-sm text-primary font-medium">Next Appointment</p>
                    <p className="text-body-sm text-secondary">Today, 2:30 PM • Jane Smith</p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-sm shadow-lg flex items-center gap-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface font-medium">Patient Saved</p>
                  <p className="text-body-sm text-secondary">Just now</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <section className="border-y border-outline-variant bg-surface-container-low py-lg">
          <div className="max-w-[1200px] mx-auto px-lg grid grid-cols-2 md:grid-cols-4 gap-lg">
            {[
              { value: '500+', label: 'Doctors Using DocDesk' },
              { value: '50,000+', label: 'Patients Managed' },
              { value: '99.9%', label: 'Uptime Guaranteed' },
              { value: '4.9★', label: 'Average Rating' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <span className="text-[32px] font-bold text-primary leading-tight">{value}</span>
                <span className="text-body-sm text-secondary mt-xs">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section className="py-[100px] px-lg max-w-[1200px] mx-auto">
          <div className="text-center mb-[60px]">
            <span className="text-label-sm text-primary uppercase tracking-widest">Features</span>
            <h2 className="text-[40px] font-bold text-on-surface mt-sm mb-md leading-tight">
              Everything your practice needs
            </h2>
            <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
              Designed for Indian healthcare professionals. Clean, fast, and reliable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {FEATURES.map(({ icon, iconBg, title, body }, i) => (
              <div
                key={title}
                className="bg-surface-container-lowest rounded-2xl p-xl border border-outline-variant hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-lg group-hover:scale-110 transition-transform duration-300`}>
                  <span className="material-symbols-outlined text-[24px]">{icon}</span>
                </div>
                <h3 className="text-headline-md text-on-surface mb-sm">{title}</h3>
                <p className="text-body-md text-on-surface-variant leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="bg-surface-container-low py-[100px] px-lg border-y border-outline-variant">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-[60px]">
              <span className="text-label-sm text-primary uppercase tracking-widest">Process</span>
              <h2 className="text-[40px] font-bold text-on-surface mt-sm mb-md">
                Up and running in minutes
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-8 left-[calc(16.66%+16px)] right-[calc(16.66%+16px)] h-px bg-outline-variant" />
              {STEPS.map(({ step, title, body }, i) => (
                <div key={step} className="flex flex-col items-center text-center relative">
                  <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center text-headline-md font-bold mb-lg shadow-md relative z-10">
                    {step}
                  </div>
                  <h3 className="text-headline-md text-on-surface mb-sm">{title}</h3>
                  <p className="text-body-md text-on-surface-variant">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonial ── */}
        <section className="py-[100px] px-lg max-w-[1200px] mx-auto">
          <div className="bg-primary rounded-3xl p-xl md:p-[60px] text-on-primary relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <span className="material-symbols-outlined text-[48px] opacity-40 mb-md block">
                format_quote
              </span>
              <p className="text-[22px] leading-relaxed mb-lg font-medium opacity-95">
                "DocDesk has transformed how I manage my practice. The interface is incredibly 
                intuitive, and my team was up and running within an hour. Patient records, 
                appointments — everything in one place."
              </p>
              <div className="flex items-center justify-center gap-md">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-label-md font-bold">
                  EC
                </div>
                <div className="text-left">
                  <p className="text-label-md font-semibold">Dr. Emily Chen</p>
                  <p className="text-body-sm opacity-70">General Practitioner, Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-[80px] px-lg bg-surface-container-low border-t border-outline-variant">
          <div className="max-w-[1200px] mx-auto text-center">
            <h2 className="text-[40px] font-bold text-on-surface mb-md">
              Ready to modernize your practice?
            </h2>
            <p className="text-body-lg text-on-surface-variant mb-xl max-w-xl mx-auto">
              Join hundreds of doctors across India who trust DocDesk for their patient management.
            </p>
            <div className="flex flex-col sm:flex-row gap-md justify-center">
              <Link
                to="/register"
                className="bg-primary text-on-primary text-label-md px-xl py-[14px] rounded-full hover:opacity-90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-sm group"
              >
                Create Free Account
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
              <Link
                to="/login"
                className="bg-surface-container-lowest text-on-surface border border-outline-variant text-label-md px-xl py-[14px] rounded-full hover:bg-surface-container transition-all flex items-center justify-center"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-outline-variant bg-surface py-xl px-lg">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="flex items-center gap-sm text-primary">
            <span className="material-symbols-outlined text-[20px]">clinical_notes</span>
            <span className="text-label-md font-bold">DocDesk</span>
          </div>
          <div className="flex gap-lg text-label-sm text-on-surface-variant">
            {['Privacy Policy', 'Terms of Service', 'Contact Support'].map((link) => (
              <a key={link} href="#" className="hover:text-primary transition-colors">
                {link}
              </a>
            ))}
          </div>
          <div className="text-label-sm text-on-surface-variant opacity-60">
            © 2024 DocDesk. Made with ❤️ for Indian doctors.
          </div>
        </div>
      </footer>
    </div>
  );
}

const FEATURES = [
  {
    icon: 'person_add',
    iconBg: 'bg-primary/10 text-primary',
    title: 'Smart Patient CRM',
    body: 'Complete patient profiles with medical history, allergies, prescriptions, and clinical notes — all instantly accessible.',
  },
  {
    icon: 'calendar_month',
    iconBg: 'bg-secondary/10 text-secondary',
    title: 'Appointment Scheduling',
    body: 'Schedule and manage appointments with ease. Support for in-clinic and virtual consultations with status tracking.',
  },
  {
    icon: 'shield_lock',
    iconBg: 'bg-tertiary-container/30 text-tertiary-container',
    title: 'Secure & Private',
    body: 'Your patient data is encrypted and stored securely in the cloud. Access from any device, anytime, anywhere.',
  },
  {
    icon: 'analytics',
    iconBg: 'bg-primary/10 text-primary',
    title: 'Practice Analytics',
    body: 'Get insights into your practice with real-time stats — patient count, appointment frequency, and more.',
  },
  {
    icon: 'devices',
    iconBg: 'bg-secondary/10 text-secondary',
    title: 'Works Everywhere',
    body: 'Fully responsive design that works seamlessly on desktop, tablet, and mobile. No app download needed.',
  },
  {
    icon: 'bolt',
    iconBg: 'bg-tertiary-container/30 text-tertiary-container',
    title: 'Lightning Fast',
    body: 'Optimized for speed. Patient lookups, record updates, and appointment booking happen in milliseconds.',
  },
];

const STEPS = [
  {
    step: '1',
    title: 'Create Your Account',
    body: 'Sign up in under 2 minutes. No credit card required. Start your free practice today.',
  },
  {
    step: '2',
    title: 'Add Your Patients',
    body: 'Import existing records or add patients manually. Build your complete patient directory.',
  },
  {
    step: '3',
    title: 'Manage with Ease',
    body: 'Schedule appointments, add clinical notes, manage prescriptions — all from one dashboard.',
  },
];











