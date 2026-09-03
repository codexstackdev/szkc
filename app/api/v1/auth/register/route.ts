import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSupabaseAdmin } from "@/lib/db";

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

        const supabase = getSupabaseAdmin();
        const { data: existing, error: lookupError } = await supabase
            .from("users")
            .select("id")
            .eq("email", email)
            .maybeSingle();

        if (lookupError) {
            throw lookupError;
        }

        if (existing) {
            return NextResponse.json({ success: false, message: "An account with this email already exists." }, { status: 409 });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const { data: user, error: insertError } = await supabase
            .from("users")
            .insert({
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                ext: nameExtension,
                email,
                passwordHash: passwordHash,
            })
            .select("id")
            .single();

        if (insertError) {
            // The unique index is the final guard against two simultaneous registrations.
            if (insertError.code === "23505") {
                return NextResponse.json({ success: false, message: "An account with this email already exists." }, { status: 409 });
            }
            throw insertError;
        }

        return NextResponse.json({ success: true, message: "Account created successfully.", userId: user.id }, { status: 201 });
    } catch (error) {
        console.error("Registration failed:", error);
        return NextResponse.json({ success: false, message: "Unable to create the account." }, { status: 500 });
    }
}
