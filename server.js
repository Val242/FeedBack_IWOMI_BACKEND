require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const connectToDB = require("./config/db");

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const feedBackRoute = require('./routes/feedbackRoute');
const assignmentRoute = require('./routes/assignmentRoutes');
const getAllCollaboratorsRoute = require('./routes/collaboratorRoute');
const assignedFeedbackRoute = require('./routes/collaboratorAssignedFeedBack');
const updatedFeedback = require('./routes/UpdatingRoute');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS setup (robust)
const allowedOrigins = [
  'http://localhost:5173',
  'https://feed-back-iwomi-frontend.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests like Postman
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Handle preflight OPTIONS requests manually
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(204); // No content
  }
  next();
});

// Health check
app.get("/", (req, res) => {
  res.send("✅ Feedback backend is running on Render!");
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/feedback', feedBackRoute);
app.use('/api/admin/assign', assignmentRoute);
app.use('/api/admin/collaboratorRoute', getAllCollaboratorsRoute);
app.use('/api/collaborator/feedbacks', assignedFeedbackRoute);
app.use('/api/collaborator/feedbacks', updatedFeedback);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    console.error('Error:', err.message);
    res.status(400).json({ error: err.message });
  } else {
    next();
  }
});

// Connect to DB and start server
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
