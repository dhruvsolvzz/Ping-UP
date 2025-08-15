import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Attach event listeners before connecting
        mongoose.connection.on('connected', () => console.log('DATABASE CONNECTED'));
             // Correct string interpolation
             await mongoose.connect(`${process.env.MONGODB_URL}/pingup-app`);

    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
};

export default connectDB;
