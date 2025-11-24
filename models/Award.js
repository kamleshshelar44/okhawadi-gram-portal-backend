const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  title_mr: {
    type: String,
  },
  title_hi: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  description_mr: {
    type: String,
  },
  description_hi: {
    type: String,
  },
  category: {
    type: String,
    enum: ['village', 'development', 'education', 'health', 'environment', 'culture', 'other'],
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  organization: {
    type: String,
  },
  organization_mr: {
    type: String,
  },
  organization_hi: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Award', awardSchema);