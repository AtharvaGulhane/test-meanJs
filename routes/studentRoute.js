// routes/studentRoute.js

const express = require('express');
const router = express.Router();
const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination folder for uploaded images
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set unique filename for uploaded images
   }
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

// Import the Student model
const Student = require('../app/models/student');

// Route to add a new student with profile picture
router.post('/api/students', upload.single('profilePicture'), async (req, res) => {
   try {
      // Extract data from request body
      const { name, age } = req.body;
      // Get the path to the uploaded profile picture (if provided)
      const profilePicture = req.file ? req.file.path : null;
      
      // Create a new Student instance
      const student = new Student({ name, age, profilePicture });
      // Save the student to the database
      await student.save();
      
      // Send response
      res.status(201).json({ message: 'Student created!', student });
   } catch (error) {
      res.status(400).send(error);
   }
});

// Other routes (e.g., update, delete) can be added similarly...

// Export the router
module.exports = router;
