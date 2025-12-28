const Student = require('../models/student.model');

// GET all students
exports.getStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students);
};

// GET student by ID
exports.getStudentById = async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.json(student);
};

// ADD student
exports.addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student); 
  } catch (err) {
    res.status(500).json({ message: 'Error adding student', error: err });
  }
};


// UPDATE student
exports.updateStudent = async (req, res) => {
    const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(student);
};

// DELETE student
exports.deleteStudent = async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
};
