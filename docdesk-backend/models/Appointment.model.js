import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Doctor ID is required'],
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Patient ID is required'],
    },
    date: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    time: {
      type: String,
      required: [true, 'Appointment time is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Enter time in HH:MM format'],
    },
    type: {
      type: String,
      enum: ['Consultation', 'Follow-up', 'Test Results', 'Procedure'],
      default: 'Consultation',
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled', 'No-show'],
      default: 'Scheduled',
    },
    notes: {
      type: String,
      default: null,
    },
    duration: {
      type: Number, // in minutes
      default: 30,
    },
    location: {
      type: String,
      default: 'Clinic',
    },
    isVirtual: {
      type: Boolean,
      default: false,
    },
    meetingLink: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Index for faster queries
appointmentSchema.index({ doctorId: 1, date: -1 });
appointmentSchema.index({ patientId: 1 });
appointmentSchema.index({ status: 1, date: 1 });

export default mongoose.model('Appointment', appointmentSchema);
