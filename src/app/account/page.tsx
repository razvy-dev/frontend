'use client'

import { useUserStore } from "@/stores/userStore"

export default function Account() {
    const user = useUserStore((state) => state.user)
    return (
        <div>
            <p>{user?.username}</p>
            <p>{user?.email}</p>
        </div>
    )
}