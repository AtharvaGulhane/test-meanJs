// app/models/teacher.js

// Import necessary modules
const mongoose = require('mongoose');

// Define teacher schema
const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number},
    subject: { type: String, required: true }
});

// Create Teacher model
const Teacher = mongoose.model('Teacher', teacherSchema);

// Export the model
module.exports = Teacher;
