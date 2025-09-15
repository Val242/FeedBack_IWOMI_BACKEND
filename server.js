require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000; // Use Render's PORT env if available

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
// const collaboratorRoutes = require('./routes/collaborator')
const feedBackRoute = require('./routes/feedbackRoute');
const assignmentRoute = require('./routes/assignmentRoutes');
const getAllCollaboratorsRoute = require('./routes/collaboratorRoute');
const assignedFeedbackRoute = require('./routes/collaboratorAssignedFeedBack');
const updatedFeedback = require('./routes/UpdatingRoute');

const connectToDB = require("./config/db");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Allow both local & deployed frontend
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://feedbackiwomi-frontend.onrender.com'  // <-- replace with your actual frontend Render URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Health check route (prevents 404 on root)
app.get("/", (req, res) => {
  res.send("✅ Feedback backend is running on Render!");
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/collaborator', collaboratorRoutes);
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

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
