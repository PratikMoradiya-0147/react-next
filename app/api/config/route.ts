import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({mongoUri: process.env.MONGO_URI})
}