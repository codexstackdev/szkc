import { connectDB } from "@/lib/connect";
import userModel from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";




export async function POST(req:NextRequest){
    try {
        //bwas lang ni natuyo nako
    } catch (error) {
        const err = error instanceof Error ? error.message : "Server Unreachable";
        return NextResponse.json({success: false, message: err}, {status: 500})
    }
}