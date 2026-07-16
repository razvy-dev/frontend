'use client'

// this can either confirm an account or just show the user data

import { useUserStore } from "@/stores/userStore"
import axios from "axios"
import { useSearchParams } from "next/dist/client/components/navigation"
import { useEffect } from "react"

export default function Account() {
    const user = useUserStore((state) => state.user)
    const setUser = useUserStore((state) => state.setUser)
    const isAuthenticated = useUserStore((state) => state.isAuthenticated)
    const isLoading = useUserStore((state) => state.isLoading)

    // get the token, if there is one
    const tokenParams = useSearchParams()
    const token = tokenParams.get('token')

    // make the delete button

    const handleDelete = () => {
        try {
            const response = await axios.get(`/api/auth/delete-account`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    accessToken: token // * will see how I extract it in a few minutes
                }
            })
        }
    }

    useEffect(() => {
        if (token) {
            // call the confirm account API
            async function confirmAccount() {
                try {
                    const response = await axios.get(`/api/auth/confirm-account`, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            token: token
                        }
                    });

                    if (response.status === 200) {
                        const confirmedUser = response.data;
                        setUser(confirmedUser);
                    }

                } catch (error) {
                    console.error("Error confirming account:", error);
                }
            }

            confirmAccount();
        }
    }, [token])

    if (isLoading) {
        return <div className="min-h-screen bg-white">Loading...</div>
    }

    if (!isAuthenticated) {
        return <div className="min-h-screen bg-white">Please log in to view your account.</div>
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1 className="text-3xl font-bold mb-4 text-black">Account Details</h1>
            {user && (
                <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                    <p className="text-lg text-black font-semibold"><strong>Username:</strong> {user.username}</p>
                    <p className="text-lg text-black font-semibold"><strong>Email:</strong> {user.email}</p>
                </div>
            )}
        </div>
    )
}