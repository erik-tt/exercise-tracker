'use client'
import React from "react";
import WorkoutList from "@/components/workoutList";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import withAuth from "@/components/HOC/withAuth";

const workoutPage = () => {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/signup")
    }, [user])

    return (
        <>
            <div className="bg-gray-100 w-full min-h-screen">
                <h1 className="text-4xl text-center p-6">Workouts</h1>
                <WorkoutList />
            </div>
        </>
    );
}

export default withAuth(workoutPage);