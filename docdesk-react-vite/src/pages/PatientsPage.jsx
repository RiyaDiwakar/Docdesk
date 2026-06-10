import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const PER_PAGE = 10;

  useEffect(() => {
    fetchPatients();
  }, [query, page]);

  async function fetchPatients() {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('authToken');
      const params = new URLSearchParams({
        search: query,
        page,
        limit: PER_PAGE,
      });

      const res = await fetch(`http://localhost:5000/api/patients?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to fetch patients');
        return;
      }

      setPatients(data.data);
      setTotal(data.total);
      setTotalPages(data.pages);
    } catch (err) {
      setError('Server connection failed. Check backend is running.');
    } finally {
      setLoading(false);
    }
  }

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
              {loading ? 'Loading...' : `${total} patients in your directory.`}
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
                placeholder="Search by name or phone…"
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

        {/* ── Error ── */}
        {error && (
          <div className="bg-error-container border border-error/30 rounded-lg p-md mb-lg">
            <p className="text-body-sm text-on-error-container flex items-center gap-sm">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </p>
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="flex items-center justify-center py-xl">
            <div className="flex flex-col items-center gap-md">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-body-md text-on-surface-variant">Loading patients…</p>
            </div>
          </div>
        )}

        {/* ── Table ── */}
        {!loading && (
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex-grow shadow-sm">

            {/* Desktop Header */}
            <div className="hidden sm:grid grid-cols-12 gap-md px-lg py-sm bg-surface-container-low border-b border-outline-variant text-label-sm text-on-surface-variant uppercase tracking-wider">
              <div className="col-span-4">Patient</div>
              <div className="col-span-3">Phone</div>
              <div className="col-span-2">Gender</div>
              <div className="col-span-3 text-right">Action</div>
            </div>

            {/* Rows */}
            <div className="flex flex-col divide-y divide-outline-variant">
              {patients.length === 0 ? (
                <EmptyState />
              ) : (
                patients.map((patient) => (
                  <PatientRow key={patient._id} patient={patient} />
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="px-md sm:px-lg py-sm border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between">
              <p className="text-body-sm text-on-surface-variant">
                Showing {patients.length} of {total} patients
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
        )}
      </div>
    </AppLayout>
  );
}

function PatientRow({ patient }) {
  return (
    <div className="group flex flex-col sm:grid sm:grid-cols-12 gap-y-sm sm:gap-md px-md sm:px-lg py-md sm:items-center hover:bg-surface transition-colors relative">
      <Link to={`/patients/${patient._id}`} className="absolute inset-0 z-10 sm:hidden" />

      {/* Name + Avatar */}
      <div className="col-span-4 flex items-center gap-md">
        <Avatar name={patient.name} size={10} />
        <div>
          <p className="text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">
            {patient.name}
          </p>
          <p className="text-body-sm text-on-surface-variant">
            {patient.gender} • {patient.bloodType || 'Unknown'}
          </p>
        </div>
      </div>

      {/* Phone */}
      <div className="col-span-3 flex items-center text-body-md text-on-surface">
        {patient.phone}
      </div>

      {/* Gender */}
      <div className="col-span-2 flex items-center text-body-md text-on-surface">
        {patient.gender}
      </div>

      {/* Action */}
      <div className="col-span-3 flex items-center justify-end z-20">
        <Link
          to={`/patients/${patient._id}`}
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
      <p className="text-body-md text-on-surface-variant max-w-[300px] mb-lg">
        Add your first patient to get started!
      </p>
      <Link to="/patients/add">
        <Button variant="primary" icon="add">Add Patient</Button>
      </Link>
    </div>
  );
}