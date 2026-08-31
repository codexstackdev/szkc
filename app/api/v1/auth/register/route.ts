import { NextRequest, NextResponse } from "next/server";




export async function GET(req:NextRequest){
    try {
        return NextResponse.json({success: true, message: "API"}, {status: 200})
    } catch (error) {
        const err = error instanceof Error ? error.message : "Server Unreachable";
        return NextResponse.json({success: false, message: err}, {status: 500})
    }
}