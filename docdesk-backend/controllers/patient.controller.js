import Patient from '../models/Patient.model.js';

/**
 * GET /api/patients
 * Get all patients for the logged-in doctor
 */
export const getAllPatients = async (req, res, next) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // Build search filter
    let filter = { doctorId: req.userId };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Patient.countDocuments(filter);
    const patients = await Patient.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
      data: patients,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/patients/:id
 * Get a single patient by ID
 */
export const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({
      _id: req.params.id,
      doctorId: req.userId,
    }).populate('nextAppointment');

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/patients
 * Create a new patient
 */
export const createPatient = async (req, res, next) => {
  try {
    const { name, email, phone, dateOfBirth, gender, bloodType, allergies } = req.body;

    // Validate required fields
    if (!name || !phone || !dateOfBirth || !gender) {
      return res.status(400).json({
        error: 'name, phone, dateOfBirth, and gender are required',
      });
    }

    const patient = new Patient({
      doctorId: req.userId,
      name,
      email,
      phone,
      dateOfBirth,
      gender,
      bloodType,
      allergies: allergies || [],
    });

    await patient.save();

    res.status(201).json({
      message: 'Patient created successfully',
      patient,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/patients/:id
 * Update patient information
 */
export const updatePatient = async (req, res, next) => {
  try {
    const { name, email, phone, dateOfBirth, gender, bloodType, allergies, patientTag } =
      req.body;

    const patient = await Patient.findOneAndUpdate(
      { _id: req.params.id, doctorId: req.userId },
      {
        name,
        email,
        phone,
        dateOfBirth,
        gender,
        bloodType,
        allergies,
        patientTag,
      },
      { new: true, runValidators: true }
    );

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json({
      message: 'Patient updated successfully',
      patient,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/patients/:id
 * Delete a patient
 */
export const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findOneAndDelete({
      _id: req.params.id,
      doctorId: req.userId,
    });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/patients/:id/notes
 * Add a clinical note to patient
 */
export const addPatientNote = async (req, res, next) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: 'title and body are required' });
    }

    const patient = await Patient.findOneAndUpdate(
      { _id: req.params.id, doctorId: req.userId },
      {
        $push: {
          notes: { title, body, createdAt: new Date() },
        },
      },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json({
      message: 'Note added successfully',
      patient,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/patients/:id/prescriptions
 * Add a prescription to patient
 */
export const addPrescription = async (req, res, next) => {
  try {
    const { name, dosage, status, refills } = req.body;

    if (!name || !dosage) {
      return res.status(400).json({ error: 'name and dosage are required' });
    }

    const patient = await Patient.findOneAndUpdate(
      { _id: req.params.id, doctorId: req.userId },
      {
        $push: {
          prescriptions: {
            name,
            dosage,
            status: status || 'Active',
            refills: refills || 0,
            lastFilled: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json({
      message: 'Prescription added successfully',
      patient,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/patients/:id/lastvisit
 * Update last visit date
 */
export const updateLastVisit = async (req, res, next) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      { _id: req.params.id, doctorId: req.userId },
      { lastVisit: new Date() },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json({
      message: 'Last visit updated',
      patient,
    });
  } catch (error) {
    next(error);
  }
};
