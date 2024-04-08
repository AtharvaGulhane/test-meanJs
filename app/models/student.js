// app/models/student.js

const mongoose = require('mongoose');

// Define student schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    profilePicture: { type: String } // Path to profile picture
});

// Create Student model
const Student = mongoose.model('Student', studentSchema);

// Export the model
module.exports = Student;
