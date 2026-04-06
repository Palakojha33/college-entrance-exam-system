const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    required: true,
    unique: true
  },
  studentName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  program: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  coursePreferences: [{
    program: String,
    department: String,
    priority: Number
  }],
  academicMarks: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  examScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  totalScore: {
    type: Number,
    default: function() {
      return (this.academicMarks * 0.6) + (this.examScore * 0.4);
    }
  },
  status: {
    type: String,
    enum: ['Under Review', 'Processing', 'Admitted', 'Rejected', 'Waitlisted'],
    default: 'Processing'
  },
  admittedProgram: {
    type: String,
    default: null
  },
  applicationFee: {
    type: Number,
    default: 500 // Application fee in INR
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentId: {
    type: String
  },
  submittedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);
