"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import withAuth from "@/components/HOC/withAuth";
import WorkoutTrend from "@/components/workoutTrend";
import { Card, CardHeader } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/date-picker";
import { Workout } from "@/types/types";
import { getWorkouts } from "@/firebase/firestore/getData";

function Page(this: any) {
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

  console.log(workouts)

  return (
    <>
      <div className="flex flex-col gap-4 pt-12 mx-auto">
        <div className="flex flex-row justify-between px-4">
          <h1 className="text-4xl text-center pl-4">Analysis</h1>
          <DateRangePicker className="max-w-xs" variant="bordered" />
        </div>

        <div className="flex m-4 gap-8">
          <Card className="flex-1 p-8 justify-center bg-white shadow rounded-md">
            <CardHeader className="pb-0 pt-2 px-4">
              <div>
                <h4 className="font-bold text-gray-700 text-3xl">{workouts.length}</h4>
                <small className="text-gray-500">Total</small>
              </div>
            </CardHeader>
          </Card>

          <Card className="flex-1 p-8 justify-center bg-white shadow rounded-md">
            <CardHeader className="pb-0 pt-2 px-4">
              <div>
                <h4 className="font-bold text-gray-700 text-3xl">
                  {workouts.filter((workout) => workout.selectedActivity === 'Running').length}
                </h4>
                <small className="text-gray-500">Running</small>
              </div>
            </CardHeader>
          </Card>

          <Card className="flex-1 p-8 justify-center bg-white shadow rounded-md">
            <CardHeader className="pb-0 pt-2 px-4">
              <div>
                <h4 className="font-bold text-gray-700 text-3xl">{workouts.filter((workout) => workout.selectedActivity === 'Weight Lifting').length}</h4>
                <small className="text-gray-500">Strength</small>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="bg-white mx-4 p-4 shadow-md rounded-md">
          <h2 className="font-bold mb-4">Activities by minutes</h2>
          <WorkoutTrend workoutList={workouts}/>
        </div>
      </div>
    </>
  );
}

export default withAuth(Page);
