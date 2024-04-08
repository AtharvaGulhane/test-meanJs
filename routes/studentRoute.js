// Import necessary modules
const express = require('express');
const router = express.Router();

// Define Mongoose model for Student
const Student = require('../app/models/student');

// Route to get all students
router.get('/api/students', async function(req, res) {
   try {
      const students = await Student.find();
      res.json(students);
   } catch (error) {
      res.status(500).send(error);
   }
});

// Route to add a new student
router.post('/api/students', async function(req, res) {
   try {
      const { name, place, country } = req.body;
      const student = new Student({ name, place, country });
      await student.save();
      res.json({ message: 'Student created!', student });
   } catch (error) {
      res.status(500).send(error);
   }
});

// Route to delete a student by ID
router.delete('/api/students/:student_id', async function(req, res) {
   try {
      const deletedStudent = await Student.deleteOne({ _id: req.params.student_id });
      if (deletedStudent.deletedCount === 0) {
         return res.status(404).json({ message: 'Student not found' });
      }
      res.json({ message: 'Student deleted!' });
   } catch (error) {
      res.status(500).send(error);
   }
});

// Export the router
module.exports = router;
