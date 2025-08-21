require('dotenv').config();
const express = require('express');
const cors = require('cors'); // <-- Added
const app = express();
const PORT = 3000;

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const collaboratorRoutes = require('./routes/collaborator')
const feedBackRoute = require('./routes/feedbackRoute');
const assignmentRoute = require('./routes/assignmentRoutes');
const getAllCollaboratorsRoute = require('./routes/collaboratorRoute')
const connectToDB = require("./config/db");

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173', // Your React app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/collaborator', collaboratorRoutes);
app.use('/api/admin/feedback', feedBackRoute);
app.use('/api/admin/assign', assignmentRoute);
app.use('/api/admin/collaboratorRoute', getAllCollaboratorsRoute)

// Error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    console.error('Error:', err.message);
    res.status(400).json({ error: err.message });
  } else {
    console.log("Success");
  }
});

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
