import express from 'express';
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  addPatientNote,
  addPrescription,
  updateLastVisit,
} from '../controllers/patient.controller.js';
import { verifyAuth } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(verifyAuth);

/**
 * GET /api/patients
 * Get all patients with pagination and search
 */
router.get('/', getAllPatients);

/**
 * POST /api/patients
 * Create a new patient
 */
router.post('/', createPatient);

/**
 * GET /api/patients/:id
 * Get patient by ID
 */
router.get('/:id', getPatientById);

/**
 * PUT /api/patients/:id
 * Update patient information
 */
router.put('/:id', updatePatient);

/**
 * DELETE /api/patients/:id
 * Delete patient
 */
router.delete('/:id', deletePatient);

/**
 * POST /api/patients/:id/notes
 * Add clinical note
 */
router.post('/:id/notes', addPatientNote);

/**
 * POST /api/patients/:id/prescriptions
 * Add prescription
 */
router.post('/:id/prescriptions', addPrescription);

/**
 * PUT /api/patients/:id/lastvisit
 * Update last visit date
 */
router.put('/:id/lastvisit', updateLastVisit);

export default router;
