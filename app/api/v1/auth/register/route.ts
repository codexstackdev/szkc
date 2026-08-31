import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const firstName = String(body.firstName ?? "").trim();
        const middleName = String(body.middleName ?? "").trim() || null;
        const lastName = String(body.lastName ?? "").trim();
        const nameExtension = String(body.ext ?? "").trim() || null;
        const email = String(body.email ?? "").trim().toLowerCase();
        const password = String(body.password ?? "");
        const rePassword = String(body.rePassword ?? "");

        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json({ success: false, message: "Please complete all required fields." }, { status: 400 });
        }
        if (password.length < 8 || password !== rePassword) {
            return NextResponse.json({ success: false, message: "Passwords must match and contain at least 8 characters." }, { status: 400 });
        }

        const [existing] = await db.execute("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
        if (Array.isArray(existing) && existing.length > 0) {
            return NextResponse.json({ success: false, message: "An account with this email already exists." }, { status: 409 });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            "INSERT INTO users (firstName, middleName, lastName, ext, email, passwordHash) VALUES (?, ?, ?, ?, ?, ?)",
            [firstName, middleName, lastName, nameExtension, email, passwordHash],
        );

        return NextResponse.json({ success: true, message: "Account created successfully.", userId: (result as { insertId: number }).insertId }, { status: 201 });
    } catch (error) {
        console.error("Registration failed:", error);
        return NextResponse.json({ success: false, message: "Unable to create the account." }, { status: 500 });
    }
}
