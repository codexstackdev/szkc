import { connectDB } from "@/lib/connect";
import userModel from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export async function POST(req:NextRequest){
    const { email, password } = await req.json();
    try {
        if(!email || !password) return NextResponse.json({success: false, message: "Missing Credentials"}, {status: 400});
        await connectDB();
        const user = await userModel.findOne({email: email});
        if(!user) return NextResponse.json({success: false, message: "User doesn't exist"}, {status: 400});
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) return NextResponse.json({success: false, message: "Invalid password"},{status: 400});
        if(user.role === "awaiting activation") return NextResponse.json({success: false, message: "Your account is awaiting administrator approval."}, {status: 400});
        const token = jwt.sign({id: user._id, role: user.role}, process.env.SECRET_KEY as string, {expiresIn: "1d"});
        const response = NextResponse.json({success: true, message: "Logged in successfully", id:user._id}, {status: 200});
        response.cookies.set({
            name: "cred",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
        });
        return response;
    } catch (error) {
        const err = error instanceof Error ? error.message : "Server Unreachable";
        return NextResponse.json({success: false, message: err}, {status: 500})
    }
}