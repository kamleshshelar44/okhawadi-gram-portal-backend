const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const villageRoutes = require('./routes/village');
const newsRoutes = require('./routes/news');
const projectRoutes = require('./routes/projects');
const galleryRoutes = require('./routes/gallery');
const contactRoutes = require('./routes/contacts');
const awardRoutes = require('./routes/awards');
const schemeRoutes = require('./routes/schemes');
const contactFormRoutes = require('./routes/contact-form');
const contactMessageRoutes = require('./routes/contact-messages');

const app = express();

// Connect to database
connectDB();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
});

// ----------------------
// 🔐 Security & Middleware
// ----------------------
app.use(helmet());
app.use(compression());
app.use(limiter);

// ✅ Global CORS for all API routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ Allow preflight requests globally
app.options('*', cors());

// ✅ Parse incoming JSON and form data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ----------------------
// 📁 Serve Uploaded Files (with CORS & no-cache)
// ----------------------
app.use(
  '/uploads',
  cors({
    origin: '*',
    methods: ['GET'],
  }),
  (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  },
  express.static(path.join(__dirname, 'uploads'))
);

// ----------------------
// 🚀 API Routes
// ----------------------
app.use('/api/auth', authRoutes);
app.use('/api/village', villageRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/awards', awardRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/contact-form', contactFormRoutes);
app.use('/api/contact-messages', contactMessageRoutes);

// ----------------------
// 🩺 Health Check
// ----------------------
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// ----------------------
// ❌ Global Error Handler
// ----------------------
app.use(errorHandler);

// ----------------------
// 🟢 Start Server
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
