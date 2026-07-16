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

        return NextResponse.json(response.data, { status: response.status });
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