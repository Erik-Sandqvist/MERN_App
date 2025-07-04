import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://esandqvist04:b1TnHy6l3cvNiSmT@cluster0.fji6qjr.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0");
       
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}