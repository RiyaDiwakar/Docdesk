import express from 'express';
import {
  getAllAppointments,
  getUpcomingAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus,
} from '../controllers/appointment.controller.js';
import { verifyAuth } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(verifyAuth);

/**
 * GET /api/appointments
 * Get all appointments with pagination and filtering
 */
router.get('/', getAllAppointments);

/**
 * GET /api/appointments/upcoming
 * Get upcoming appointments
 */
router.get('/upcoming', getUpcomingAppointments);

/**
 * POST /api/appointments
 * Create a new appointment
 */
router.post('/', createAppointment);

/**
 * GET /api/appointments/:id
 * Get appointment by ID
 */
router.get('/:id', getAppointmentById);

/**
 * PUT /api/appointments/:id
 * Update appointment
 */
router.put('/:id', updateAppointment);

/**
 * DELETE /api/appointments/:id
 * Cancel appointment
 */
router.delete('/:id', deleteAppointment);

/**
 * PUT /api/appointments/:id/status
 * Update appointment status
 */
router.put('/:id/status', updateAppointmentStatus);

export default router;
