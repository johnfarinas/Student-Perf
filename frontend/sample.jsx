const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Define endpoints
const ENDPOINTS = {
  STUDENTS: "/students",
  STUDENT: "/students/:id",
  COURSES: "/courses",
  COURSE: "/courses/:id",
  GRADES: "/grades",
  GRADE: "/grades/:id",
};

// Read data from JSON file
const readData = () => {
  const data = fs.readFileSync("./db.json");
  return JSON.parse(data);
};

// Write data to JSON file
const writeData = (data) => {
  fs.writeFileSync("./db.json", JSON.stringify(data));
};

// Get all students
const getAllStudents = (req, res) => {
  const data = readData();
  res.json(data.students);
};

// Get student by ID
const getStudentById = (req, res) => {
  const data = readData();
  const student = data.students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    res.status(404).json({ message: "Student not found" });
  } else {
    res.json(student);
  }
};

// Add new student
const addStudent = (req, res) => {
  const data = readData();
  const newStudent = {
    id: data.students.length + 1,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  data.students.push(newStudent);
  writeData(data);
  res.json(newStudent);
};

// Get all courses
const getAllCourses = (req, res) => {
  const data = readData();
  res.json(data.courses);
};

// Get course by ID
const getCourseById = (req, res) => {
  const data = readData();
  const course = data.courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).json({ message: "Course not found" });
  } else {
    res.json(course);
  }
};

// Add new course
const addCourse = (req, res) => {
  const data = readData();
  const newCourse = {
    id: data.courses.length + 1,
    name: req.body.name,
    instructor: req.body.instructor,
  };
  data.courses.push(newCourse);
  writeData(data);
  res.json(newCourse);
};

// Get all grades
const getAllGrades = (req, res) => {
  const data = readData();
  res.json(data.grades);
};

// Get grade by ID
const getGradeById = (req, res) => {
  const data = readData();
  const grade = data.grades.find((g) => g.id === parseInt(req.params.id));
  if (!grade) {
    res.status(404).json({ message: "Grade not found" });
  } else {
    res.json(grade);
  }
};

// Add new grade
const addGrade = (req, res) => {
  const data = readData();
  const newGrade = {
    id: data.grades.length + 1,
    studentId: req.body.studentId,
    courseId: req.body.courseId,
    grade: req.body.grade,
  };
  data.grades.push(newGrade);
  writeData(data);
  res.json(newGrade);
};

// Set up API routes
app.use(express.json());

app.get(ENDPOINTS.STUDENTS, getAllStudents);
app.get(ENDPOINTS.STUDENT, getStudentById);
app.post(ENDPOINTS.STUDENTS, addStudent);

app.get(ENDPOINTS.COURSES, getAllCourses);
app.get(ENDPOINTS.COURSE, getCourseById);
app.post(ENDPOINTS.COURSES, addCourse);

app.get(ENDPOINTS.GRADES, getAllGrades);
app.get(ENDPOINTS.GRADE, getGradeById);
app.post(ENDPOINTS.GRADES, addGrade);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
