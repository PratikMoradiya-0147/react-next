import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function authMiddleware(req: NextRequest){
    // console.log('req :>> ', req);
    const authorizationHeader = req.headers.get('Authorization');

    if(!authorizationHeader){
        return NextResponse.json({error: 'Unauthorized: No token provided'}, {status:401});
    }

    const token = authorizationHeader.split(' ')[1];

    if(!token){
        return NextResponse.json({error: 'Unauthorized: Invalid token format'}, {status: 401});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        console.log('decoded :>> ', decoded);
        
        (req as any).user = decoded;
        return NextResponse.next();
    } catch(error){
        console.error('JWT verification error:', error);
        return NextResponse.json({error: 'Unauthorized: invalid token'}, {status: 401});
    }
}

export const config = {
    matcher: '/api/:path*' // apply middleware to all routes under /api/auth
  };