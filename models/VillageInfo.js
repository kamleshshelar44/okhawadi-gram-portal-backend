const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name_en: String,
  name_mr: String,
  name_hi: String,
  type_en: String,
  type_mr: String,
  type_hi: String
}, { _id: false });

const hospitalSchema = new mongoose.Schema({
  name_en: String,
  name_mr: String,
  name_hi: String,
  type_en: String,
  type_mr: String,
  type_hi: String
}, { _id: false });

const waterSourceSchema = new mongoose.Schema({
  name_en: String,
  name_mr: String,
  name_hi: String
}, { _id: false });

const festivalSchema = new mongoose.Schema({
  name_en: String,
  name_mr: String,
  name_hi: String,
  description_en: String,
  description_mr: String,
  description_hi: String
}, { _id: false });

const villageInfoSchema = new mongoose.Schema({
  // Basic village information with multilingual support
  name_en: { type: String, required: true },
  name_mr: { type: String, required: true },
  name_hi: { type: String, required: true },

  // Location information
  taluka_en: { type: String, required: true },
  taluka_mr: { type: String, required: true },
  taluka_hi: { type: String, required: true },

  district_en: { type: String, required: true },
  district_mr: { type: String, required: true },
  district_hi: { type: String, required: true },

  state_en: { type: String, required: true },
  state_mr: { type: String, required: true },
  state_hi: { type: String, required: true },

  // Postal and communication
  pinCode: { type: String, required: true },
  postOffice_en: { type: String, required: true },
  postOffice_mr: { type: String, required: true },
  postOffice_hi: { type: String, required: true },
  stdCode: { type: String, required: true },
  elevation: { type: String },

  // Government representation
  assemblyConstituency_en: { type: String, required: true },
  assemblyConstituency_mr: { type: String, required: true },
  assemblyConstituency_hi: { type: String, required: true },

  assemblyMLA_en: { type: String, required: true },
  assemblyMLA_mr: { type: String, required: true },
  assemblyMLA_hi: { type: String, required: true },

  lokSabhaConstituency_en: { type: String, required: true },
  lokSabhaConstituency_mr: { type: String, required: true },
  lokSabhaConstituency_hi: { type: String, required: true },

  parliamentMP_en: { type: String, required: true },
  parliamentMP_mr: { type: String, required: true },
  parliamentMP_hi: { type: String, required: true },

  // Local leadership
  sarpanch_en: { type: String, required: true },
  sarpanch_mr: { type: String, required: true },
  sarpanch_hi: { type: String, required: true },

  // Geographic information
  mapLink: { type: String },
  population: { type: Number, default: 0 },
  literacyRate: { type: Number, default: 0 },
  area: { type: Number, default: 0 }, // in square kilometers

  // Descriptive content
  description_en: { type: String },
  description_mr: { type: String },
  description_hi: { type: String },

  history_en: { type: String },
  history_mr: { type: String },
  history_hi: { type: String },

  culture_en: { type: String },
  culture_mr: { type: String },
  culture_hi: { type: String },

  // Administrative information
  grampanchayatContact_en: { type: String },
  grampanchayatContact_mr: { type: String },
  grampanchayatContact_hi: { type: String },

  establishedYear: { type: Number },

  // Climate and geography
  climate_en: { type: String },
  climate_mr: { type: String },
  climate_hi: { type: String },

  // Demographics
  malePopulation: { type: Number, default: 0 },
  femalePopulation: { type: Number, default: 0 },
  otherPopulation: { type: Number, default: 0 },

  // Infrastructure
  totalHouses: { type: Number, default: 0 },
  schools: [schoolSchema],
  hospitals: [hospitalSchema],
  waterSources: [waterSourceSchema],

  // Economy
  mainOccupation_en: { type: String },
  mainOccupation_mr: { type: String },
  mainOccupation_hi: { type: String },

  // Festivals and traditions (both array of objects and string support)
  festivals: [festivalSchema],
  festivals_en: { type: String },
  festivals_mr: { type: String },
  festivals_hi: { type: String },

  // Homepage slider images (max 4 images)
  sliderImages: [
    {
      url: { type: String, required: true },
      caption_en: { type: String },
      caption_mr: { type: String },
      caption_hi: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],
}, {
  timestamps: true,
});

// Pre-save middleware to handle flexible data structures
villageInfoSchema.pre('save', function(next) {
  const doc = this;

  // Handle schools - if number sent, convert to array with default objects
  if (typeof doc.schools === 'number') {
    const schoolCount = doc.schools;
    doc.schools = [];
    for (let i = 0; i < schoolCount; i++) {
      doc.schools.push({
        name_en: `School ${i + 1}`,
        name_mr: `शाळा ${i + 1}`,
        name_hi: `स्कूल ${i + 1}`,
        type_en: 'Educational Institution',
        type_mr: 'शैक्षणिक संस्था',
        type_hi: 'शैक्षणिक संस्थान'
      });
    }
  }

  // Handle hospitals - if number sent, convert to array with default objects
  if (typeof doc.hospitals === 'number') {
    const hospitalCount = doc.hospitals;
    doc.hospitals = [];
    for (let i = 0; i < hospitalCount; i++) {
      doc.hospitals.push({
        name_en: `Healthcare Center ${i + 1}`,
        name_mr: `आरोग्य केंद्र ${i + 1}`,
        name_hi: 'स्वास्थ्य केंद्र ${i + 1}',
        type_en: 'Medical Facility',
        type_mr: 'वैद्यकीय सुविधा',
        type_hi: 'चिकित्सा सुविधा'
      });
    }
  }

  // Handle waterSources - if array of strings sent, convert to objects
  if (doc.waterSources && Array.isArray(doc.waterSources) && doc.waterSources.length > 0) {
    if (typeof doc.waterSources[0] === 'string') {
      doc.waterSources = doc.waterSources.map(source => ({
        name_en: source,
        name_mr: source,
        name_hi: source
      }));
    }
  }

  // Ensure arrays exist
  if (!doc.schools) doc.schools = [];
  if (!doc.hospitals) doc.hospitals = [];
  if (!doc.waterSources) doc.waterSources = [];
  if (!doc.festivals) doc.festivals = [];
  if (!doc.sliderImages) doc.sliderImages = [];

  next();
});

module.exports = mongoose.model('VillageInfo', villageInfoSchema);
