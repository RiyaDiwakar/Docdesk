import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import { PATIENTS } from '../data/mockData';

export default function PatientsPage() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const filtered = useMemo(
    () =>
      PATIENTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.id.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleSearch(e) {
    setQuery(e.target.value);
    setPage(1);
  }

  return (
    <AppLayout>
      <div className="pt-lg pb-xl max-w-container-max mx-auto px-md md:px-lg min-h-screen flex flex-col">
        {/* ── Page Header ── */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-lg">
          <div>
            <h1 className="text-display text-on-surface mb-xs">Patients</h1>
            <p className="text-body-md text-on-surface-variant">
              Manage your patient directory and records.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-md w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-grow sm:min-w-[300px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search by name or ID…"
                value={query}
                onChange={handleSearch}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-[40px] pr-md py-[10px] text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim transition-all shadow-sm"
              />
            </div>
            <Link to="/patients/add">
              <Button variant="primary" icon="add" className="whitespace-nowrap w-full sm:w-auto">
                Add Patient
              </Button>
            </Link>
          </div>
        </section>

        {/* ── Table ── */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex-grow shadow-sm">
          {/* Desktop header */}
          <div className="hidden sm:grid grid-cols-12 gap-md px-lg py-sm bg-surface-container-low border-b border-outline-variant text-label-sm text-on-surface-variant uppercase tracking-wider">
            <div className="col-span-4 lg:col-span-3">Patient</div>
            <div className="col-span-2 hidden lg:block">ID</div>
            <div className="col-span-2">Age</div>
            <div className="col-span-3">Last Visit</div>
            <div className="col-span-3 lg:col-span-2 text-right">Action</div>
          </div>

          {/* Rows */}
          <div className="flex flex-col divide-y divide-outline-variant">
            {paginated.length === 0 ? (
              <EmptyState />
            ) : (
              paginated.map((patient) => (
                <PatientRow key={patient.id} patient={patient} />
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="px-md sm:px-lg py-sm border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between">
            <p className="text-body-sm text-on-surface-variant">
              Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–
              {Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} entries
            </p>
            <div className="flex items-center gap-xs">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-xs text-outline hover:text-on-surface disabled:opacity-40 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`h-6 w-6 flex items-center justify-center rounded text-label-sm transition-colors ${
                    page === i + 1
                      ? 'bg-primary text-on-primary font-bold'
                      : 'text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-xs text-outline hover:text-on-surface disabled:opacity-40 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

function PatientRow({ patient }) {
  return (
    <div className="group flex flex-col sm:grid sm:grid-cols-12 gap-y-sm sm:gap-md px-md sm:px-lg py-md sm:items-center hover:bg-surface transition-colors relative">
      {/* Mobile tap target */}
      <Link to={`/patients/${patient.id}`} className="absolute inset-0 z-10 sm:hidden" />

      {/* Name + avatar */}
      <div className="col-span-4 lg:col-span-3 flex items-center gap-md">
        <Avatar name={patient.name} size={10} />
        <div>
          <p className="text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">
            {patient.name}
          </p>
          <p className="text-body-sm text-on-surface-variant sm:hidden">{patient.id}</p>
        </div>
      </div>

      {/* ID (desktop) */}
      <div className="col-span-2 hidden lg:flex items-center text-body-sm text-on-surface-variant">
        {patient.id}
      </div>

      {/* Age */}
      <div className="col-span-2 flex items-center justify-between sm:justify-start">
        <span className="text-label-sm text-on-surface-variant sm:hidden">Age:</span>
        <span className="text-body-md text-on-surface">{patient.age} yrs</span>
      </div>

      {/* Last Visit */}
      <div className="col-span-3 flex items-center justify-between sm:justify-start">
        <span className="text-label-sm text-on-surface-variant sm:hidden">Last Visit:</span>
        <span className="text-body-md text-on-surface">{patient.lastVisit}</span>
      </div>

      {/* Action */}
      <div className="col-span-3 lg:col-span-2 flex items-center justify-end z-20">
        <Link
          to={`/patients/${patient.id}`}
          className="hidden sm:inline-flex text-label-md text-primary hover:text-primary-container items-center gap-xs transition-colors"
        >
          View Profile
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
        <span className="material-symbols-outlined text-outline sm:hidden absolute right-md top-1/2 -translate-y-1/2">
          chevron_right
        </span>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-xl px-md text-center">
      <div className="h-16 w-16 bg-surface-container rounded-full flex items-center justify-center mb-md">
        <span className="material-symbols-outlined text-outline text-[32px]">group_off</span>
      </div>
      <h3 className="text-headline-md text-on-surface mb-xs">No patients found</h3>
      <p className="text-body-md text-on-surface-variant max-w-[300px]">
        We couldn't find any patients matching your search criteria.
      </p>
    </div>
  );
}
