import express from 'express';
import { body } from 'express-validator';
import { register, login, logout, getProfile, updateProfile } from '../controllers/auth.controller.js';
import { verifyAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new doctor
 */
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').trim().notEmpty().withMessage('Name is required'),
  ],
  register
);

/**
 * POST /api/auth/login
 * Doctor login
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

/**
 * POST /api/auth/logout
 * Logout
 */
router.post('/logout', verifyAuth, logout);

/**
 * GET /api/auth/profile
 * Get current doctor's profile
 */
router.get('/profile', verifyAuth, getProfile);

/**
 * PUT /api/auth/profile
 * Update doctor's profile
 */
router.put('/profile', verifyAuth, updateProfile);

export default router;
