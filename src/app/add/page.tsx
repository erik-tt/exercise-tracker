'use client'
import withAuth from "@/components/HOC/withAuth";
import WorkoutForm from '@/components/workoutForm';
import React from 'react'; // Adjust the path as needed

const addWorkout = () => {
  return (
    <div className="bg-gray-100 w-full min-h-screen p-24 ml-24">
      <WorkoutForm />
    </div>
  );
};

export default withAuth(addWorkout);
