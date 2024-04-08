// app/models/student.js

// Import necessary modules
const mongoose = require('mongoose');

// Define student schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    place: { type: String, default: '' },
    country: { type: String, default: '' }
});

// Create Student model
const Student = mongoose.model('Student', studentSchema);

// Export the model
module.exports = Student;
