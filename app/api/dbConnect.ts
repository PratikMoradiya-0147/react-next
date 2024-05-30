import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { exit } from 'process';

// Load environment variables from .env file
dotenv.config();

// Function to connect to the database
const connectDB = async () => {
    // Check if the connection is already established
    if(mongoose.connection.readyState >= 1) return;

    try{
        // Use the environment variable for the MongoDB connection string
        const uri = process.env.MONGO_URI;
        if(!uri) {
            throw new Error('MONGO_URI is not defined in the environment variables');
        }
        
        // connect to MongoDB  
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);
        console.log('Database Connected Successfully :>> ',);
    } catch(error) {
        console.error('Database Connection Error', error);
        process.exit(1); //Exit process with failure
    }
};

export default connectDB;