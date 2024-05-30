import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../dbConnect";
import User from "@/models/User";
import { comparePassword, generateToken } from "@/utils/auth";

export async function POST(req: NextRequest) {
    await connectDB();

    try{
        const {email, password} = await req.json();

        // check if user exists
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: 'User already exists'}, {status: 400});
        }

        // Compare passwords
        const isMatch = await comparePassword(password, user.password);
        console.log('password :>> ', password);
        console.log('user.password :>> ', user.password);
        console.log('isMatch :>> ', isMatch);
        if(!isMatch){
            return NextResponse.json({error: 'Invalid email or password'}, {status: 400});
        }

        const token = generateToken(user);
        return NextResponse.json({message: 'Login Successful', token}, {status: 200})

    }catch(error){
        console.error('Error logging in user:', error);
        return NextResponse.json({error: 'Server error'}, {status: 500});
    }
}