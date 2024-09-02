import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

const app = express();
app.use(express.json());



// Replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/node-typescript-app';
mongoose.connect(mongoURI, {
  
}).then(() => {
    console.log('Database connected');
}).catch((error) => {
    console.error('Error connecting to database:', error);
});


app.use('/',router)
app.listen(4000, () => {
    console.log(`Server running on http://localhost:5000`);
});
