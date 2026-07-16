import { NextResponse } from "next/server";
import { serverClient } from "@/lib/serverClient"

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const validationCode = url.searchParams.get("token");

        if (!validationCode) {
            return NextResponse.json(
                { message: "Validation code is required" }, 
                { status: 400 }
            );
        }

        const response = await serverClient.get(`/api/v1/auth/confirm-account?token=${validationCode}`);

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
        
    } catch (error: any) {
        const message = error?.response?.data?.detail || error?.message || "An error occurred while processing the request";
        const status = error?.response?.status || 500;
        return NextResponse.json(
            { message },
            { status }
        );
    }
}