import { NextResponse } from "next/server";
import { deleteAccountSchema } from "@/schemas/users/deleteAccount";
import { serverClient } from "@/lib/serverClient"
import axios from "axios";

import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const cookieStore = await cookies();
        const token = cookieStore.get("access_token")?.value;

        const result = deleteAccountSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { 
                    message: "Validation error", 
                    errors: result.error.format()
                }, 
                { status: 400 }
            );
        }

        const response = await serverClient.post("/api/v1/auth/delete-account", result.data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

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