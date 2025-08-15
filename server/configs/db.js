import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Attach all event listeners before attempting connection
        mongoose.connection.on('connected', () => {
            console.log('✅ DATABASE CONNECTED');
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ Database connection error:', err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ Database disconnected');
        });

        // Connect to DB
        await mongoose.connect(`${process.env.MONGODB_URL}/pingup`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1); // Exit process if DB fails to connect
    }
};

export default connectDB;
