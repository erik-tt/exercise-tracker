'use client'
import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import withAuth from "@/components/HOC/withAuth";
import { Workout } from "@/types/types";
import { getPaginatedDocuments } from "@/firebase/firestore/getData";
import LoadingSpinner from "@/components/loadingSpinner";
import WorkoutCard from "@/components/workoutCard";

const workoutPage = () => {
    const { user } = useAuthContext()
    const router = useRouter()

    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [lastDoc, setLastDoc] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const initialized = useRef(false)


    //Authentication check
    React.useEffect(() => {
        if (user == null) router.push("/signup")
    }, [user])

    useEffect(() => {

        //work around strict mode
        if (!initialized.current) {
            initialized.current = true;

            if (loading) {
                const fetchWorkouts = async () => {
                    try {
                        const { result, lastVisible, error } = await getPaginatedDocuments('workouts', lastDoc);
                        if (error) {
                            setError('Failed to fetch workouts');
                        } else {
                            setWorkouts((prevWorkouts) => [...prevWorkouts, ...result]);
                            setLastDoc(lastVisible);
                        }
                    } catch (err) {
                        setError('An error occurred while fetching workouts');
                    } finally {
                        setLoading(false);
                    }
                };

                fetchWorkouts();
            }
        }
    }, [loading, lastDoc]);

    const handleLoadMore = () => {
        setLoading(true);
    };

    return (
        <div className="bg-gray-100 w-full min-h-screen text-gray-600">
            <h1 className="text-4xl text-center p-6">Workouts</h1>
            <div>
                {error && <p>{error}</p>}
                {loading ? (<LoadingSpinner/>
                ) : (
                    <div>
                        {workouts.map((workout) => (
                            <WorkoutCard
                                key={workout.id}
                                title = {workout.title}
                                description = {workout.description}
                                hours = {workout.hours}
                                minutes = {workout.minutes}
                                date = {workout.date}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default withAuth(workoutPage);