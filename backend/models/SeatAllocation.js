const mongoose = require('mongoose');

const SeatAllocationSchema = new mongoose.Schema({
  program: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  totalSeats: {
    type: Number,
    required: true,
    min: 0
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0
  },
  cutoffScore: {
    type: Number,
    default: 0
  },
  year: {
    type: Number,
    default: new Date().getFullYear()
  }
});

module.exports = mongoose.model('SeatAllocation', SeatAllocationSchema);