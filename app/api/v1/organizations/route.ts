import { connectDB } from "@/lib/connect";
import orgModel from "@/models/orgSchema";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(req:NextRequest){
    const token = req.cookies.get("cred")?.value;
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    try {
        const { payload } = await jwtVerify(token as string, secret);
        if(!payload.id && payload.role !== "superadmin") return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401});
        await connectDB();
        const orgs = await orgModel.find({});
        return NextResponse.json({success: true, orgs}, {status: 200});
    } catch (error) {
        const err = error instanceof Error ? error.message : "Server Unreachable";
        return NextResponse.json({success: false, message: err}, {status: 500})
    }
}

export async function POST(req:NextRequest){
    const { name, type, admin } = await req.json();
    const token = req.cookies.get("cred")?.value;
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    try {
        const { payload } = await jwtVerify(token as string, secret);
        if(!payload.id && payload.role !== "superadmin") return NextResponse.json({success: false, message: "Unauthorized"}, {status: 401});
        if(!name || !type) return NextResponse.json({success:false, message: "Missing parameters"}, {status: 400});
        await connectDB();
        const newOrg = new orgModel({name, type, admin});
        await newOrg.save();
        return NextResponse.json({success: true, message: "Organization created successfully"}, {status: 200});
    } catch (error) {
        const err = error instanceof Error ? error.message : "Server Unreachable";
        return NextResponse.json({success: false, message: err}, {status: 500});
    }
}