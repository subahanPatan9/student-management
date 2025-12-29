const Student = require('../models/student.model');

// GET all students
// exports.getStudents = async (req, res) => {
//     const students = await Student.find();
//     res.json(students);
// };

// GET students with pagination
exports.getStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sortField = req.query.sort || 'createdAt';
    const sortOrder = req.query.order === 'desc' ? -1 : 1;
    const skip = (page - 1) * limit;

    const total = await Student.countDocuments();

    const students = await Student.find()
      .skip(skip)
      .limit(limit)
      .sort({ [sortField]: sortOrder });

    res.json({
      data: students,
      total,
      page,
      limit
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students' });
  }
};


exports.getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
};

exports.addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: 'Error adding student', error: err });
  }
};


exports.updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(student);
};

exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted successfully' });
};
