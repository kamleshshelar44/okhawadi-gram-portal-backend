const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
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
    enum: ['agriculture', 'education', 'health', 'housing', 'employment', 'welfare', 'infrastructure', 'other'],
    required: true,
  },
  eligibility: {
    type: String,
  },
  eligibility_mr: {
    type: String,
  },
  eligibility_hi: {
    type: String,
  },
  benefits: {
    type: String,
  },
  benefits_mr: {
    type: String,
  },
  benefits_hi: {
    type: String,
  },
  image: {
    type: String,
  },
  documents: [{
    name: String,
    url: String,
  }],
  applicationLink: {
    type: String,
  },
  lastDate: {
    type: Date,
  },
  contactPerson: {
    type: String,
  },
  contactPhone: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Scheme', schemeSchema);