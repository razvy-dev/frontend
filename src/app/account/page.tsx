'use client'

// this can either confirm an account or just show the user data

import { useState } from "react"
import { useUserStore } from "@/stores/userStore"
import axios from "axios"
import { useSearchParams } from "next/dist/client/components/navigation"
import { useEffect } from "react"
import { redirect } from "next/navigation"
import TextField from "@/components/inputs/TextField"
import { useForm } from "react-hook-form"
import {  DeleteAccountFormData, deleteAccountSchema } from "@/schemas/users/deleteAccount"
import { zodResolver } from "@hookform/resolvers/zod"

export default function Account() {
    const user = useUserStore((state) => state.user)
    const setUser = useUserStore((state) => state.setUser)
    const isAuthenticated = useUserStore((state) => state.isAuthenticated)
    const isLoading = useUserStore((state) => state.isLoading)

    // get the token, if there is one
    const tokenParams = useSearchParams()
    const token = tokenParams.get('token')

    // in case the user wants to delete their account, ask for their password

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<DeleteAccountFormData>({
        resolver: zodResolver(deleteAccountSchema),
        mode: "onTouched"
    })

    const [password, setPassword] = useState("")

    // handle log out

    const clearUser = useUserStore((state) => state.clearUser);

    const handleSignOut = async () => {
        await axios.post("/api/auth/sign-out");
        clearUser();
    };

    // make the delete button

    const handleDelete = async (data: DeleteAccountFormData) => {
        try {
            const response = await axios.get(`/api/auth/delete-account`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                data
            })

            if (response.status == 200) {
                handleSignOut()
                redirect('sign-in')
            }
        } catch (error) {
            console.log("Something went wrong here", error)
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

            <form onSubmit={handleSubmit(handleDelete)}>
                <TextField
                    type="text"
                    label="Password"
                    placeholder="Password"
                    register={register("password")}
                    errors={errors.password}
                />

                <button className="bg-red text-white p-3">
                    Delete
                </button>
            </form>

            <button className="bg-blue text-white p-3" onClick={handleSignOut} disabled={isSubmitting}>
                Sign out
            </button>
        </div>
    )
}