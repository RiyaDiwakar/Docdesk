// ─── Patients ───────────────────────────────────────────────────────────────
export const PATIENTS = [
  {
    id: 'PT-8472',
    name: 'Eleanor Rigby',
    age: 64,
    dob: '12/04/1959',
    gender: 'Female',
    bloodType: 'O+',
    phone: '+1 (555) 019-8372',
    email: 'e.rigby@example.com',
    tag: 'VIP',
    lastVisit: 'Oct 12, 2023',
    allergies: ['Penicillin', 'Latex', 'Peanuts'],
    problems: [
      { name: 'Hypertension', diagnosed: 'Oct 2018', status: 'Chronic' },
      { name: 'Type 2 Diabetes', diagnosed: 'Mar 2020', status: 'Chronic' },
      { name: 'Acute Bronchitis', diagnosed: 'Jan 2024', status: 'Resolved' },
    ],
    prescriptions: [
      {
        id: 'RX-001',
        name: 'Lisinopril',
        dosage: '10mg tablet, take 1 daily by mouth',
        status: 'Active',
        refills: 2,
        lastFilled: '10/12/23',
      },
      {
        id: 'RX-002',
        name: 'Metformin',
        dosage: '500mg tablet, take 2 daily with meals',
        status: 'Active',
        refills: 0,
        lastFilled: '09/05/23',
      },
    ],
    notes: [
      {
        id: 'N-001',
        title: 'Follow-up Visit',
        date: 'Oct 12, 2023',
        body: 'Patient reports feeling well. Blood pressure is stable at 120/80. Instructed to continue current medication regimen.',
      },
      {
        id: 'N-002',
        title: 'Telehealth Consult',
        date: 'Sep 05, 2023',
        body: 'Discussed recent lab results. A1C slightly elevated. Advised dietary modifications and increased physical activity.',
      },
    ],
    nextAppointment: {
      date: 'Nov 14',
      month: 'Nov',
      day: '14',
      title: 'Routine Checkup & Bloodwork',
      time: '10:00 AM - 10:30 AM',
      doctor: 'Dr. Sarah Jenkins',
    },
  },
  {
    id: 'P-10042',
    name: 'Jane Smith',
    age: 28,
    dob: '03/15/1995',
    gender: 'Female',
    bloodType: 'A+',
    phone: '+1 (555) 123-4567',
    email: 'j.smith@example.com',
    tag: null,
    lastVisit: 'Oct 12, 2023',
    allergies: ['Sulfa drugs'],
    problems: [{ name: 'Seasonal Allergies', diagnosed: 'May 2015', status: 'Chronic' }],
    prescriptions: [
      { id: 'RX-003', name: 'Cetirizine', dosage: '10mg, once daily', status: 'Active', refills: 3, lastFilled: '10/01/23' },
    ],
    notes: [
      { id: 'N-003', title: 'Annual Physical', date: 'Oct 12, 2023', body: 'All vitals normal. Updated vaccinations.' },
    ],
    nextAppointment: null,
  },
  {
    id: 'P-08911',
    name: 'Marcus Rodriguez',
    age: 45,
    dob: '07/22/1978',
    gender: 'Male',
    bloodType: 'B-',
    phone: '+1 (555) 987-6543',
    email: 'm.rodriguez@example.com',
    tag: null,
    lastVisit: 'Sep 28, 2023',
    allergies: [],
    problems: [
      { name: 'Hypertension', diagnosed: 'Jun 2019', status: 'Chronic' },
      { name: 'Lower Back Pain', diagnosed: 'Feb 2023', status: 'Ongoing' },
    ],
    prescriptions: [
      { id: 'RX-004', name: 'Amlodipine', dosage: '5mg, once daily', status: 'Active', refills: 1, lastFilled: '09/15/23' },
    ],
    notes: [
      { id: 'N-004', title: 'Follow-up', date: 'Sep 28, 2023', body: 'BP slightly elevated at 138/90. Adjusted medication.' },
    ],
    nextAppointment: { date: 'Oct 25', month: 'Oct', day: '25', title: 'BP Check', time: '02:00 PM', doctor: 'Dr. Sarah Jenkins' },
  },
  {
    id: 'P-11029',
    name: 'Elena Loring',
    age: 32,
    dob: '11/08/1991',
    gender: 'Female',
    bloodType: 'AB+',
    phone: '+1 (555) 246-8135',
    email: 'e.loring@example.com',
    tag: null,
    lastVisit: 'Aug 15, 2023',
    allergies: ['Aspirin'],
    problems: [{ name: 'Migraines', diagnosed: 'Apr 2017', status: 'Chronic' }],
    prescriptions: [
      { id: 'RX-005', name: 'Sumatriptan', dosage: '50mg as needed for migraine', status: 'Active', refills: 2, lastFilled: '08/10/23' },
    ],
    notes: [
      { id: 'N-005', title: 'Migraine Review', date: 'Aug 15, 2023', body: 'Patient reports 2-3 episodes per month. Triggers include stress and dehydration.' },
    ],
    nextAppointment: null,
  },
];

// ─── Appointments ────────────────────────────────────────────────────────────
export const APPOINTMENTS_UPCOMING = [
  {
    id: 'APT-001',
    date: 'Today',
    dateLabel: 'Oct 24',
    time: '09:00',
    period: 'AM',
    type: 'Consultation',
    typeVariant: 'warning',
    patient: { name: 'Sarah Jenkins', initials: 'SJ' },
    detail: 'Telehealth Initial Consult',
    detailIcon: 'videocam',
  },
  {
    id: 'APT-002',
    date: 'Today',
    dateLabel: 'Oct 24',
    time: '11:30',
    period: 'AM',
    type: 'Follow-up',
    typeVariant: 'secondary',
    patient: { name: 'Michael Rodriguez', initials: 'MR' },
    detail: 'Room 3, Main Clinic',
    detailIcon: 'location_on',
  },
  {
    id: 'APT-003',
    date: 'Tomorrow',
    dateLabel: 'Oct 25',
    time: '02:15',
    period: 'PM',
    type: 'Consultation',
    typeVariant: 'warning',
    patient: { name: 'David Chen', initials: 'DC' },
    detail: 'Lab Results Review',
    detailIcon: 'assignment',
  },
];

export const APPOINTMENTS_COMPLETED = [
  {
    id: 'APT-004',
    date: 'Yesterday',
    dateLabel: 'Oct 23',
    time: '10:00',
    period: 'AM',
    type: 'Done',
    patient: { name: 'Alice Wong', initials: 'AW' },
    detail: 'Annual Physical',
  },
];

// ─── Dashboard Stats ─────────────────────────────────────────────────────────
export const DASHBOARD_STATS = {
  totalPatients: 142,
  todayAppointments: 8,
};

export const RECENT_PATIENTS = [
  { name: 'Jane Smith', initials: 'JS', lastVisit: 'Oct 12', id: 'P-10042' },
  { name: 'Michael Ross', initials: 'MR', lastVisit: 'Oct 10', id: 'P-08911' },
  { name: 'Emma Larson', initials: 'EL', lastVisit: 'Oct 05', id: 'P-11029' },
];

export const UPCOMING_APPOINTMENTS_DASH = [
  { id: 'APT-D1', time: '09:00', period: 'AM', patient: 'David Chen', type: 'Follow-up', highlight: true },
  { id: 'APT-D2', time: '10:30', period: 'AM', patient: 'Sarah Jenkins', type: 'Consultation', highlight: false },
  { id: 'APT-D3', time: '01:15', period: 'PM', patient: 'Robert Garcia', type: 'Test Results', highlight: false },
];
