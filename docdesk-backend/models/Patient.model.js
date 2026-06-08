import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Doctor ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email'],
      default: null,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
      required: [true, 'Gender is required'],
    },
    bloodType: {
      type: String,
      enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
      default: null,
    },
    allergies: [String],
    medicalProblems: [
      {
        name: String,
        diagnosed: Date,
        status: {
          type: String,
          enum: ['Chronic', 'Resolved', 'Ongoing'],
          default: 'Ongoing',
        },
      },
    ],
    prescriptions: [
      {
        name: String,
        dosage: String,
        status: {
          type: String,
          enum: ['Active', 'Inactive'],
          default: 'Active',
        },
        refills: Number,
        lastFilled: Date,
      },
    ],
    notes: [
      {
        title: String,
        body: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    lastVisit: {
      type: Date,
      default: null,
    },
    nextAppointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      default: null,
    },
    patientTag: {
      type: String,
      enum: ['VIP', 'Follow-up', 'New', null],
      default: null,
    },
  },
  { timestamps: true }
);

// Index for faster queries
patientSchema.index({ doctorId: 1, name: 1 });
patientSchema.index({ doctorId: 1, createdAt: -1 });

export default mongoose.model('Patient', patientSchema);
