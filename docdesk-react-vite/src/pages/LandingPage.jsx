import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="bg-surface text-on-surface font-sans min-h-screen flex flex-col antialiased">
      {/* ── Header ── */}
      <header className="w-full max-w-container-max mx-auto px-lg py-md flex justify-between items-center z-50 relative">
        <div className="flex items-center gap-sm text-primary">
          <span className="material-symbols-outlined icon-fill text-[28px]">clinical_notes</span>
          <span className="text-headline-md font-bold tracking-tight">DocDesk</span>
        </div>
        <nav className="flex items-center gap-md">
          <Link
            to="/login"
            className="hidden md:block text-label-md text-secondary hover:text-on-surface transition-colors px-md py-sm"
          >
            Doctor Login
          </Link>
         <Link
            to="/register"
         className="bg-primary text-on-primary..."
>
  Get Started
  </Link>
        </nav>
      </header>

      <main className="flex-grow">
        {/* ── Hero ── */}
        <section className="w-full max-w-container-max mx-auto px-lg pt-xl pb-[80px] lg:pt-[80px] lg:pb-[120px] flex flex-col lg:flex-row items-center gap-xl lg:gap-[80px]">
          <div className="flex-1 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-xs bg-primary-fixed text-on-primary-fixed-variant px-md py-xs rounded-full text-label-sm mb-lg">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Now taking new practices
            </div>
            <h1 className="text-[48px] leading-[56px] lg:text-[64px] lg:leading-[72px] font-bold text-on-surface tracking-tight mb-md max-w-2xl">
              Patient Management,{' '}
              <br />
              <span className="text-primary">Simplified.</span>
            </h1>
            <p className="text-body-lg text-on-surface-variant mb-xl max-w-xl">
              DocDesk helps doctors manage patients, appointments, and medical records in one organized
              workspace. Designed for calm efficiency and clinical rigor.
            </p>
            <div className="flex flex-col sm:flex-row gap-md w-full sm:w-auto">
              <Link
                to="/login"
                className="bg-primary text-on-primary text-label-md px-xl py-[14px] rounded-full hover:bg-on-primary-fixed-variant transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-sm"
              >
                Get Started
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <Link
                to="/login"
                className="bg-surface-container-lowest text-on-surface border border-outline-variant text-label-md px-xl py-[14px] rounded-full hover:bg-surface-container transition-all flex items-center justify-center"
              >
                Doctor Login
              </Link>
            </div>
          </div>

          {/* Hero illustration placeholder */}
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-surface-container-low border border-outline-variant shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative flex items-center justify-center">
              {/* Decorative mock UI */}
              <div className="w-full h-full p-lg flex flex-col gap-sm">
                <div className="flex items-center gap-sm p-md bg-surface-container-lowest rounded-xl border border-outline-variant">
                  <div className="w-8 h-8 rounded-full bg-primary-container/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[18px]">person</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-3 w-24 bg-surface-container-high rounded mb-1" />
                    <div className="h-2 w-16 bg-surface-variant rounded opacity-60" />
                  </div>
                  <div className="h-6 w-16 bg-primary-fixed rounded-full" />
                </div>
                <div className="flex items-center gap-sm p-md bg-surface-container-lowest rounded-xl border border-outline-variant opacity-70">
                  <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-[18px]">person</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-3 w-28 bg-surface-variant rounded mb-1" />
                    <div className="h-2 w-20 bg-surface-dim rounded opacity-50" />
                  </div>
                  <div className="h-6 w-16 bg-surface-variant rounded-full" />
                </div>
                <div className="flex items-center gap-sm p-md bg-surface-container-lowest rounded-xl border border-outline-variant opacity-50">
                  <div className="w-8 h-8 rounded-full bg-surface-variant" />
                  <div className="flex-1">
                    <div className="h-3 w-20 bg-surface-variant rounded mb-1" />
                    <div className="h-2 w-14 bg-surface-dim rounded opacity-50" />
                  </div>
                  <div className="h-6 w-16 bg-surface-variant rounded-full" />
                </div>
              </div>
              {/* Floating card */}
              <div className="absolute bottom-lg left-lg right-lg lg:right-auto lg:w-[300px] bg-surface-container-lowest/80 backdrop-blur-md border border-white/40 p-md rounded-xl shadow-lg">
                <div className="flex items-center gap-md">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">event_available</span>
                  </div>
                  <div>
                    <p className="text-label-md text-on-surface">Next Appointment</p>
                    <p className="text-body-sm text-on-surface-variant">Today, 2:30 PM • Sarah J.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="bg-surface-container-low py-[100px] border-y border-outline-variant/30">
          <div className="max-w-container-max mx-auto px-lg">
            <div className="text-center mb-xl max-w-2xl mx-auto">
              <h2 className="text-headline-lg text-on-surface mb-sm">
                Everything you need, nothing you don't.
              </h2>
              <p className="text-body-lg text-on-surface-variant">
                A workspace engineered to reduce cognitive load so you can focus on patient care.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {FEATURES.map(({ icon, iconBg, title, body }) => (
                <div
                  key={title}
                  className="bg-surface-container-lowest rounded-2xl p-xl border border-outline-variant hover:border-primary-container transition-colors duration-300 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-lg group-hover:scale-110 transition-transform`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{icon}</span>
                  </div>
                  <h3 className="text-headline-md text-on-surface mb-sm">{title}</h3>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Workflow ── */}
        <section className="w-full max-w-container-max mx-auto px-lg py-[100px]">
          <div className="flex flex-col lg:flex-row items-center gap-xl">
            {/* Mock list */}
            <div className="flex-1 order-2 lg:order-1">
              <div className="w-full bg-surface-container rounded-2xl border border-outline-variant p-lg flex flex-col gap-sm shadow-sm">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-full bg-surface-container-lowest rounded-lg p-md border border-outline-variant flex justify-between items-center"
                    style={{ opacity: i === 1 ? 1 : 0.6 }}
                  >
                    <div className="flex items-center gap-md">
                      <div className="w-8 h-8 rounded-full bg-surface-variant" />
                      <div>
                        <div className="h-3 w-24 bg-surface-variant rounded mb-1" />
                        <div className="h-2 w-16 bg-surface-dim rounded opacity-50" />
                      </div>
                    </div>
                    <div
                      className={`h-6 w-16 rounded-full ${
                        i === 1 ? 'bg-primary-fixed' : 'bg-surface-variant'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2 lg:pl-xl">
              <h2 className="text-headline-lg text-on-surface mb-md">
                A workflow that adapts to you.
              </h2>
              <p className="text-body-lg text-on-surface-variant mb-xl">
                DocDesk's interface uses a 4px baseline grid and minimal contrast to ensure your
                schedule and notes are perfectly legible at a glance.
              </p>
              <ul className="space-y-md">
                {WORKFLOW_POINTS.map(({ title, body }) => (
                  <li key={title} className="flex items-start gap-sm">
                    <span className="material-symbols-outlined text-primary mt-xs">check_circle</span>
                    <div>
                      <strong className="text-label-md text-on-surface block">{title}</strong>
                      <span className="text-body-sm text-on-surface-variant">{body}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Testimonial ── */}
        <section className="bg-primary text-on-primary py-[80px] px-lg">
          <div className="max-w-3xl mx-auto text-center">
            <span className="material-symbols-outlined text-[48px] opacity-50 mb-md block">
              format_quote
            </span>
            <p className="text-headline-md leading-relaxed mb-lg font-medium">
              "DocDesk completely changed how I run my independent practice. The interface is
              incredibly clean, and it feels more like a premium productivity tool than clunky
              medical software."
            </p>
            <div className="text-label-md opacity-90 tracking-wide uppercase">
              — Dr. Emily Chen, General Practitioner
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-outline-variant/50 bg-surface py-xl px-lg mt-auto">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="flex items-center gap-sm text-primary opacity-80">
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
            © 2024 DocDesk Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

const FEATURES = [
  {
    icon: 'air',
    iconBg: 'bg-primary-fixed text-on-primary-fixed-variant',
    title: 'Absolute Simplicity',
    body: 'No cluttered menus or hidden settings. Our fixed-fluid hybrid layout ensures your most critical tools are always exactly where you expect them.',
  },
  {
    icon: 'folder_special',
    iconBg: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    title: 'Organized Records',
    body: 'Instantly access patient histories with our high-performance CRM lists. Clean typography and subtle tonal layering make reading effortless.',
  },
  {
    icon: 'bolt',
    iconBg: 'bg-secondary-fixed text-on-secondary-fixed-variant',
    title: 'Lightning Speed',
    body: 'Built for rapid data entry. Focused inputs with clear active states mean less time clicking and more time consulting.',
  },
];

const WORKFLOW_POINTS = [
  {
    title: 'Smart Scheduling',
    body: 'Drag and drop functionality with conflict resolution.',
  },
  {
    title: 'Quick Clinical Notes',
    body: 'Template-driven charting that auto-saves as you type.',
  },
];
