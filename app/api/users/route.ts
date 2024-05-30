import { NextRequest, NextResponse } from "next/server";
import connectDB from "../dbConnect";
import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import { authMiddleware } from "@/middleware/auth";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextRequest) {
  await connectDB(); //Ensure database connection established

  const authResult = await authMiddleware(req);

    if(authResult.status !== 200){
        return authResult;
    }

  try {
    const { name, email, password } = await req.json();

    // Validate the input data
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await hashPassword(password);

    // create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();

//   const user = (req as any).user;
//   console.log('user :>> ', user);
//   if(!user){
//     return NextResponse.json({error: 'Unauthorized'}, {status: 401});
//   }

//  const authResult = await authMiddleware(req);

    // if(authResult.status !== 200){
    //     return authResult;
    // }

  try {
    const users = await User.find(); //Fetch all users from the database
    console.log('users :>> ', users);
    return NextResponse.json(
      { message: "Users fetched successfully", users },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   await connectDB();

//   if (req.method === 'GET') {
//     try {
//       const users = await User.find();
//       res.status(200).json(users);
//       console.log('users 222:>> ', users);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching users', error });
//     }
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// };

// export default handler;
