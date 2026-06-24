# DocDesk — Patient Management Platform

A modern, full-featured patient management platform UI built with React. DocDesk gives clinicians a single dashboard to manage patients, appointments, consultations, prescriptions, analytics, and AI-powered clinical insights.


## Features

| Module | Description |
|---|---|
| **Login** | Clean authentication screen with password visibility toggle and a simulated sign-in flow |
| **Dashboard** | At-a-glance KPIs (total patients, today's appointments, wait time, satisfaction) plus recent patients and today's schedule |
| **Patients** | Searchable, filterable patient directory with status badges (Stable / Monitoring / Critical) |
| **Add Patient** | 3-step intake form — Personal Info → Medical History → Insurance & Emergency Contact |
| **Patient Profile** | Tabbed patient record — overview, vitals, medications, consultation history |
| **Appointments** | Schedule management with quick stats and status tracking (Confirmed / Pending) |
| **Consultations** | Live consultation workspace — vitals entry, chief complaint, diagnosis, clinical notes |
| **Prescriptions** | Prescription builder with drug-interaction checks and reusable templates |
| **Analytics** | Visual performance dashboard — patient growth charts, diagnosis breakdown, exportable reports |
|  **AI Insights** | Conversational AI assistant for clinical insights, risk flags, and quick prompts |

---

## Tech Stack

- **React 18** — functional components + hooks (`useState`)
- **No external UI library** — all styling is hand-crafted CSS-in-JS (no Tailwind/Bootstrap dependency)
- **No router** — lightweight in-app navigation via state (easy to swap for React Router later)
- **Fonts:** `DM Sans` (body) + `DM Serif Display` (headings/branding)
- **Icons:** Google Material Symbols (loaded via Google Fonts CDN)

> This is a frontend-only demo. All patient, appointment, and prescription data is mock data stored in component state — nothing persists on refresh, and there is no backend yet.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Create a new React app (if you haven't already)
npx create-react-app docdesk
cd docdesk

# 2. Replace src/App.js with the provided DocDesk.jsx content
# 3. Clear src/index.css (the app ships its own styles)

# 4. Start the dev server
npm start
```

The app will open at **http://localhost:3000**.

---

## Project Structure

```
docdesk/
├── public/
│   └── index.html
├── src/
│   ├── App.js          ← Main DocDesk application (all pages + components)
│   └── index.js         ← React entry point
└── package.json
```

All pages, shared components (`Sidebar`, `Topbar`, `StatusBadge`, `Icon`), and styles currently live in a single `App.js` file for simplicity. See [Suggested Improvements](#-suggested-improvements) below for how to split this up as the project grows.

---

## Navigation Map

```
Login
  └── Dashboard (home after login)
        ├── Patients ──→ Add Patient
        │             └─→ Patient Profile (Overview / Consultations / Prescriptions / Vitals)
        ├── Appointments
        ├── Consultations
        ├── Prescriptions
        ├── Analytics
        └── AI Insights
```

Navigation is handled via the sidebar (desktop) — clicking a nav item updates the active page in state.

---

## Suggested Improvements (Next Steps)

- [ ] **Backend integration** — connect to a real API (Node.js + Express + MongoDB, as used in the original DocDesk build) for persistent patient/appointment data
- [ ] **Authentication** — replace the simulated login with real JWT-based auth
- [ ] **React Router** — convert state-based navigation to proper routes (`/patients`, `/patients/:id`, etc.) for shareable URLs and browser back/forward support
- [ ] **Component splitting** — break `App.js` into separate files (`/pages`, `/components`) for maintainability
- [ ] **Form validation** — add validation to Add Patient, Consultation, and Prescription forms
- [ ] **Real charts** — swap the CSS bar charts in Analytics for a charting library (e.g. Recharts or Chart.js)
- [ ] **Mobile navigation** — add a hamburger/drawer menu for the sidebar on small screens
- [ ] **Live AI integration** — connect the AI Insights chat to a real LLM API instead of canned responses

---

##  Disclaimer

This is a **UI/UX demo project** for educational and portfolio purposes. It is **not HIPAA-compliant**, does not store real patient data, and should not be used in a production clinical setting without proper security, compliance, and backend infrastructure in place.

---

##  License

This project is for personal/portfolio use. Add your preferred license here (MIT, Apache 2.0, etc.) before publishing publicly.