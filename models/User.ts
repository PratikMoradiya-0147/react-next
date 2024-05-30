import mongoose, { Model, Schema } from "mongoose";

// Define the interface for a User document
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define the schema for the User model
const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

// Add a pre-save hook to update the `updatedAt` field
// This hook updates the updatedAt field every time the document is saved.
userSchema.pre<IUser>('save', function (next) {
    this.updatedAt = new Date();
    next();
  });
  

//   Export the use model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;