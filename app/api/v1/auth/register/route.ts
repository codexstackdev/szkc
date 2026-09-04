import { connectDB } from "@/lib/connect";
import userModel from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req:NextRequest){
    const { firstName, middleName, lastName, extName, email, password } = await req.json();
    try {
        if(!firstName || !middleName || !lastName || !email || !password) return NextResponse.json({success: false, message: "Missing credentials"}, {status: 400});
        await connectDB();
        const isUserExist = await userModel.findOne({email: email});
        if(isUserExist) return NextResponse.json({success: false, message: "User already exist"}, {status: 400});
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({firstName, middleName, lastName, extName, email, password:hashedPassword});
        await newUser.save();
        return NextResponse.json({success: true, message: "Registered successfully"}, {status: 200});
    } catch (error) {
        const err = error instanceof Error ? error.message : "Server Unreachable";
        return NextResponse.json({success: false, message: err}, {status: 500})
    }
}