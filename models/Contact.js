const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  position_mr: {
    type: String,
  },
  position_hi: {
    type: String,
  },
  department: {
    type: String,
  },
  department_mr: {
    type: String,
  },
  department_hi: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  address_mr: {
    type: String,
  },
  address_hi: {
    type: String,
  },
  image: {
    type: String,
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Contact', contactSchema);