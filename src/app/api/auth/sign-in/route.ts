import { NextResponse } from "next/server";
import { signInSchema } from "@/schemas/users/signin";
import { serverClient } from "@/lib/serverClient"
import axios from "axios";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = signInSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { 
                    message: "Validation error", 
                    errors: result.error.format()
                }, 
                { status: 400 }
            );
        }

        const response = await serverClient.post("/api/v1/auth/sign-in", result.data);

        const { token: tokenData, ...userProfile } = response.data;

        const responseWithCookie = NextResponse.json(userProfile, { status: response.status });

        responseWithCookie.cookies.set("access_token", tokenData.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 30,
        });

        return responseWithCookie;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return NextResponse.json(error.response.data, { status: error.response.status });
        }
        return NextResponse.json(
            { message: "Internal server error" }, 
            { status: 500 }
        );
    }
}