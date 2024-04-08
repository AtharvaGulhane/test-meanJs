// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db');
const bodyParser = require('body-parser');

// Connect to MongoDB using the configuration
mongoose.connect(dbConfig.url);

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes for students and teachers
const studentRoutes = require('./routes/studentRoute');
const teacherRoutes = require('./routes/teacherRoute');

// Use routes for students and teachers
app.use(studentRoutes);
app.use(teacherRoutes);

// Define port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
