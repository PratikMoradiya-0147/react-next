import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../dbConnect";
import User from "@/models/User";
import next from "next";
import { authMiddleware } from "@/middleware/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const authResult = await authMiddleware(req);

    if(authResult.status !== 200){
        return authResult;
    }

  try {
    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json(user);
    // const {id} = params;
    // return NextResponse.json({userId: id});
  } catch (error) {
    return NextResponse.json(
      { error: "Error retrieving error user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log('params :>> ', params);
  await connectDB();

  const authResult = await authMiddleware(req);

    if(authResult.status !== 200){
        return authResult;
    }

  try {
    const deletedUser = await User.findByIdAndDelete(params.id);
    console.log('User :>> ', User);
    console.log('deletedUser :>> ', deletedUser);
    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully", deletedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const authResult = await authMiddleware(req);

    if(authResult.status !== 200){
        return authResult;
    }

  try {
    const userId = params.id;
    const data = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true }
    ); //Apply partial update
    if (!updatedUser) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    //   check if the user already exists
    if (data.email){

        const existingUser = await User.findOne({email: data.email });
        if (existingUser && existingUser.id.toString() !== userId) {
          return NextResponse.json(
            { message: "User already exists" },
            { status: 400 }
          );
        }
    }


    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const authResult = await authMiddleware(req);

    if(authResult.status !== 200){
        return authResult;
    }

  try {
    const userId = params.id;
    const data = await req.json();


    //   check if the user already exists
    if (data.email){

        const existingUser = await User.findOne({email: data.email });
        if (existingUser && existingUser.id.toString() !== userId) {
          return NextResponse.json(
            { message: "User already exists" },
            { status: 400 }
          );
        }
    }
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
      upsert: true,
    });


    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
