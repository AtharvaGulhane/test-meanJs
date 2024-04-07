// modules =================================================
const express = require('express');
const app = express();
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
// set our port
const port = 3000;
// configuration ===========================================

// config files
var db = require('./config/db');
console.log("connecting--",db);
mongoose.connect(db.url); //Mongoose connection created

// frontend routes =========================================================
app.get('/', (req, res) => res.send('Welcome to Tutorialspoint!'));

// Parse JSON bodies
app.use(express.json());

//defining route
app.get('/tproute', function (req, res) {
   res.send('This is routing for the application developed using Node and Express...');
});

var Student = require('./app/models/student');
app.get('/api/students', async function(req, res) {
   try {
      // use mongoose to get all students in the database
      const students = await Student.find();
      console.log(students.length,students);
      res.json(students); // return all students in JSON format
   } catch (error) {
      // if there is an error retrieving, send the error.
      res.status(500).send(error);
   }
});

// Now your route for creating a student
app.post('/api/students/send', async function (req, res) {
    try {
        var student = new Student({
            name: req.body.name,
            place: req.body.place,
            country: req.body.country
        });
        await student.save();
        res.json({ message: 'student created!' });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete('/api/students/:student_id', async function (req, res) {
    try {
       await Student.deleteOne({ _id: req.params.student_id });
       res.json({ message: 'Successfully deleted' });
    } catch (error) {
       res.status(500).send(error);
    }
 });
 

 app.put('/api/students/:student_id', async function (req, res) {
   try {
      const { name, place, country } = req.body;
      
      const updatedStudent = await Student.findOneAndUpdate(
         { _id: req.params.student_id },
         { $set: { name, place, country }, $inc: { __v: 1 }},
         { new: true, runValidators: true }
      );
      
      if (!updatedStudent) {
         return res.status(404).json({ message: 'Student not found' });
      }
      
      res.json({ message: 'Successfully updated', updatedStudent });
   } catch (error) {
      res.status(500).send(error);
   }
});


// startup our app at http://localhost:3000
app.listen(port, ()=> console.log(`Example app listening on port ${port}!`));