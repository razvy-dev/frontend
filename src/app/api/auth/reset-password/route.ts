import { NextResponse } from "next/server";
import { resetPasswordSchema } from "@/schemas/users/resetPassword";
import { serverClient } from "@/lib/serverClient"
import axios from "axios";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = resetPasswordSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { 
                    message: "Validation error", 
                    errors: result.error.format()
                }, 
                { status: 400 }
            );
        }

        const { confirmPassword, ...backendData } = result.data;
        const response = await serverClient.post("/api/v1/auth/reset-password", backendData);

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