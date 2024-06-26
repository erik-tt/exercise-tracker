'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Header from "@/components/header";

export default function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/signup")
    }, [user])

    return (
        <div>
            <h1>Landing Page</h1>
        </div>
    );
}