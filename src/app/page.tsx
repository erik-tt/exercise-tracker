"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import withAuth from "@/components/HOC/withAuth";
import { Workout } from "@/types/types";
import { getWorkouts } from "@/firebase/firestore/getData";
import LoadingSpinner from "@/components/loadingSpinner";
import WorkoutCard from "@/components/workoutCard";

const workoutPage = () => {
  const { user } = useAuthContext();
  const uid = user?.uid;

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    //work around strict mode
    if (!initialized.current) {
      initialized.current = true;

      if (loading) {
        const fetchWorkouts = async () => {
          try {
            const { workouts, error } = await getWorkouts("workouts", uid);
            if (error) {
              setError("Failed to fetch workouts");
            } else {
              setWorkouts((prevWorkouts) => [...prevWorkouts, ...workouts]);
            }
          } catch (err) {
            setError("An error occurred while fetching workouts");
          } finally {
            setLoading(false);
          }
        };
        fetchWorkouts();
      }
    }
    setLoading(false);
  }, [loading, lastDoc, uid]);

  const handleLoadMore = () => {
    setLoading(true);
  };

  return (
    <div className=" text-gray-600 pt-12">
      <h1 className="text-4xl text-center">Workouts</h1>
      <div className="">
        {error && <p>{error}</p>}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                selectedActivity={workout.selectedActivity}
                description={workout.description}
                hours={workout.hours}
                minutes={workout.minutes}
                date={workout.date}
              />
            ))}
          </div>
        )}
        <div className="text-xl text-center p-6">
          <button onClick={handleLoadMore}>Load more</button>
        </div>
      </div>
    </div>
  );
};

export default withAuth(workoutPage);
