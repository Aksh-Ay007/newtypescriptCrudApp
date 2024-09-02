import express from 'express';
import StudentController from '../controllers/studentController';

const router = express.Router();
const studentController = new StudentController();

// Define routes
router.get('/students', studentController.getAllStudents);  // Get all students
router.get('/students/:id', studentController.getStudent);  // Get a single student by ID
router.post('/students', studentController.createStudent); // Create a new student
router.put('/students/:id', studentController.updateStudent); // Update a student by ID
router.delete('/students/:id', studentController.deleteStudent); // Delete a student by ID

export default router;
