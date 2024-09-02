import express from 'express';
import { studentModel } from '../db/studentsModel';

class StudentController {

    getAllStudents = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const students = await studentModel.find();
            response.status(200).json(students);
        } catch (error) {
            console.error('Error fetching students:', error); // Log error
            response.sendStatus(500); // Internal Server Error
        }
    }

    getStudent = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const { id } = request.params;
            const student = await studentModel.findById(id);
            if (student) {
                response.status(200).json(student);
            } else {
                response.sendStatus(404); // Not Found
            }
        } catch (error) {
            console.error('Error fetching student:', error); // Log error
            response.sendStatus(400); // Bad Request
        }
    }

    createStudent = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const { name, email, mobile, dob, doj } = request.body;
            
            // Basic validation
            if (!name || !email || !mobile || !dob || !doj) {
                response.sendStatus(400); // Bad Request
                return;
            }

            const student = new studentModel({
                name,
                email,
                mobile,
                dob,
                doj
            });

            await student.save();
            response.status(201).json(student); // Created
        } catch (error) {
            console.error('Error creating student:', error); // Log error
            response.sendStatus(500); // Internal Server Error
        }
    }

    updateStudent = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const { id } = request.params;
            const updateData = request.body;

            // Basic validation (optional)
            if (!updateData || Object.keys(updateData).length === 0) {
                response.sendStatus(400); // Bad Request
                return;
            }

            const student = await studentModel.findByIdAndUpdate(id, updateData, {
                new: true, // Return the updated document
                runValidators: true // Run validators on the updated document
            });

            if (student) {
                response.status(200).json(student);
            } else {
                response.sendStatus(404); // Not Found
            }
        } catch (error) {
            console.error('Error updating student:', error); // Log error
            response.sendStatus(500); // Internal Server Error
        }
    }

    deleteStudent = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const { id } = request.params;
            const result = await studentModel.findByIdAndDelete(id);

            if (result) {
                response.sendStatus(204); // No Content (successfully deleted)
            } else {
                response.sendStatus(404); // Not Found
            }
        } catch (error) {
            console.error('Error deleting student:', error); // Log error
            response.sendStatus(500); // Internal Server Error
        }
    }
}

export default StudentController;
