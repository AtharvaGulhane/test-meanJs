// Import necessary modules
const express = require('express');
const router = express.Router();

// Define Mongoose model for Teacher
const Teacher = require('../app/models/teacher');

// Route to get all teachers
router.get('/api/teachers', async function(req, res) {
   try {
      const teachers = await Teacher.find();
      res.json(teachers);
   } catch (error) {
      res.status(500).send(error);
   }
});

// Route to add a new teacher
router.post('/api/teachers', async function(req, res) {
   try {
      const { name, subject } = req.body;
      const teacher = new Teacher({ name, subject });
      await teacher.save();
      res.json({ message: 'Teacher created!', teacher });
   } catch (error) {
      res.status(500).send(error);
   }
});

// Route to delete a teacher by ID
router.delete('/api/teachers/:teacher_id', async function(req, res) {
   try {
      const deletedTeacher = await Teacher.deleteOne({ _id: req.params.teacher_id });
      if (deletedTeacher.deletedCount === 0) {
         return res.status(404).json({ message: 'Teacher not found' });
      }
      res.json({ message: 'Teacher deleted!' });
   } catch (error) {
      res.status(500).send(error);
   }
});

// Export the router
module.exports = router;
