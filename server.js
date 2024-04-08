// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db');
const bodyParser = require('body-parser');
// Connect to MongoDB using the configuration
mongoose.connect(dbConfig.url);
console.log("connecting--",dbConfig.url);

// Create Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); // or app.use(bodyParser.json());

// Import routes for teachers and students
const teacherRoutes = require('./routes/teacherRoute');
const studentRoutes = require('./routes/studentRoute');

// Use routes for teachers and students
app.use(teacherRoutes);
app.use(studentRoutes);

// Define port
const port = process.env.PORT || 3000;

// frontend routes =========================================================
app.get('/', (req, res) => res.send('TEST'));

// Start the server
// startup our app at http://localhost:3000
app.listen(port, () => console.log(`Server is running on port ${port}`));
