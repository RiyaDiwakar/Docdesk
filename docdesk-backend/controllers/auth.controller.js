import { validationResult } from 'express-validator';
import User from '../models/User.model.js';
import { generateToken } from '../middleware/auth.js';

/**
 * POST /api/auth/register
 * Create a new doctor account
 */
export const register = async (req, res, next) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, specialty } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
      specialty: specialty || 'General Practice',
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id, user.email);

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        specialty: user.specialty,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/login
 * Doctor login
 */
export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({ error: 'Account has been deactivated' });
    }

    // Generate token
    const token = generateToken(user._id, user.email);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        specialty: user.specialty,
        clinicName: user.clinicName,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/logout
 * Logout (frontend removes token)
 */
export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

/**
 * GET /api/auth/profile
 * Get current doctor's profile
 */
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/auth/profile
 * Update doctor's profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { name, specialty, licenseNumber, clinicName, clinicAddress, contactNumber } =
      req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        name,
        specialty,
        licenseNumber,
        clinicName,
        clinicAddress,
        contactNumber,
      },
      { new: true, runValidators: true }
    );

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    next(error);
  }
};
