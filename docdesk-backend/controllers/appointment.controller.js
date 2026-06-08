import Appointment from '../models/Appointment.model.js';
import Patient from '../models/Patient.model.js';

/**
 * GET /api/appointments
 * Get appointments for the logged-in doctor
 */
export const getAllAppointments = async (req, res, next) => {
  try {
    const { status, date, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // Build filter
    let filter = { doctorId: req.userId };
    if (status) filter.status = status;
    if (date) {
      const dateObj = new Date(date);
      filter.date = {
        $gte: new Date(dateObj.setHours(0, 0, 0, 0)),
        $lt: new Date(dateObj.setHours(23, 59, 59, 999)),
      };
    }

    const total = await Appointment.countDocuments(filter);
    const appointments = await Appointment.find(filter)
      .populate('patientId', 'name email phone')
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/appointments/upcoming
 * Get upcoming appointments
 */
export const getUpcomingAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.userId,
      date: { $gte: new Date() },
      status: { $in: ['Scheduled', 'Rescheduled'] },
    })
      .populate('patientId', 'name email phone')
      .sort({ date: 1 })
      .limit(10);

    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/appointments/:id
 * Get appointment details
 */
export const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      doctorId: req.userId,
    }).populate('patientId');

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/appointments
 * Create a new appointment
 */
export const createAppointment = async (req, res, next) => {
  try {
    const { patientId, date, time, type, notes, duration, location, isVirtual, meetingLink } =
      req.body;

    // Validate required fields
    if (!patientId || !date || !time) {
      return res.status(400).json({ error: 'patientId, date, and time are required' });
    }

    // Check if patient exists and belongs to this doctor
    const patient = await Patient.findOne({ _id: patientId, doctorId: req.userId });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Check for scheduling conflicts
    const conflict = await Appointment.findOne({
      doctorId: req.userId,
      date: new Date(date),
      time,
      status: { $in: ['Scheduled', 'Rescheduled'] },
    });

    if (conflict) {
      return res.status(400).json({ error: 'Time slot already booked' });
    }

    const appointment = new Appointment({
      doctorId: req.userId,
      patientId,
      date: new Date(date),
      time,
      type: type || 'Consultation',
      notes,
      duration: duration || 30,
      location: location || 'Clinic',
      isVirtual: isVirtual || false,
      meetingLink,
    });

    await appointment.save();

    // Update patient's nextAppointment
    await Patient.findByIdAndUpdate(patientId, { nextAppointment: appointment._id });

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: await appointment.populate('patientId'),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/appointments/:id
 * Update appointment
 */
export const updateAppointment = async (req, res, next) => {
  try {
    const { date, time, type, status, notes, duration, location, isVirtual, meetingLink } =
      req.body;

    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, doctorId: req.userId },
      {
        date: date ? new Date(date) : undefined,
        time,
        type,
        status,
        notes,
        duration,
        location,
        isVirtual,
        meetingLink,
      },
      { new: true, runValidators: true }
    ).populate('patientId');

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({
      message: 'Appointment updated successfully',
      appointment,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/appointments/:id
 * Cancel/delete appointment
 */
export const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findOneAndDelete({
      _id: req.params.id,
      doctorId: req.userId,
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Clear patient's nextAppointment if this was it
    await Patient.updateOne(
      { nextAppointment: appointment._id },
      { nextAppointment: null }
    );

    res.json({ message: 'Appointment cancelled' });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/appointments/:id/status
 * Update appointment status
 */
export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['Scheduled', 'Completed', 'Cancelled', 'No-show'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, doctorId: req.userId },
      { status },
      { new: true }
    ).populate('patientId');

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({
      message: `Appointment marked as ${status}`,
      appointment,
    });
  } catch (error) {
    next(error);
  }
};
