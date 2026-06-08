/**
 * API Client for DocDesk Frontend
 * Copy this to: src/services/apiClient.js in your React project
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Make authenticated API calls
 */
async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('authToken');

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return data;
}

// ─── Authentication ──────────────────────────────────────────────────────
export const authAPI = {
  register: (email, password, name, specialty) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, specialty }),
    }),

  login: (email, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    apiCall('/auth/logout', { method: 'POST' }),

  getProfile: () =>
    apiCall('/auth/profile'),

  updateProfile: (updates) =>
    apiCall('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),
};

// ─── Patients ────────────────────────────────────────────────────────────
export const patientAPI = {
  getAll: (search = '', page = 1, limit = 10) =>
    apiCall(`/patients?search=${search}&page=${page}&limit=${limit}`),

  getById: (id) =>
    apiCall(`/patients/${id}`),

  create: (patientData) =>
    apiCall('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    }),

  update: (id, patientData) =>
    apiCall(`/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(patientData),
    }),

  delete: (id) =>
    apiCall(`/patients/${id}`, { method: 'DELETE' }),

  addNote: (id, title, body) =>
    apiCall(`/patients/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ title, body }),
    }),

  addPrescription: (id, name, dosage, status, refills) =>
    apiCall(`/patients/${id}/prescriptions`, {
      method: 'POST',
      body: JSON.stringify({ name, dosage, status, refills }),
    }),

  updateLastVisit: (id) =>
    apiCall(`/patients/${id}/lastvisit`, { method: 'PUT' }),
};

// ─── Appointments ───────────────────────────────────────────────────────
export const appointmentAPI = {
  getAll: (status = '', date = '', page = 1, limit = 10) => {
    let query = `?page=${page}&limit=${limit}`;
    if (status) query += `&status=${status}`;
    if (date) query += `&date=${date}`;
    return apiCall(`/appointments${query}`);
  },

  getUpcoming: () =>
    apiCall('/appointments/upcoming'),

  getById: (id) =>
    apiCall(`/appointments/${id}`),

  create: (appointmentData) =>
    apiCall('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    }),

  update: (id, appointmentData) =>
    apiCall(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    }),

  delete: (id) =>
    apiCall(`/appointments/${id}`, { method: 'DELETE' }),

  updateStatus: (id, status) =>
    apiCall(`/appointments/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    }),
};

// ─── Helper: Store token after login ─────────────────────────────────────
export function setAuthToken(token) {
  localStorage.setItem('authToken', token);
}

export function clearAuthToken() {
  localStorage.removeItem('authToken');
}

export function getAuthToken() {
  return localStorage.getItem('authToken');
}
