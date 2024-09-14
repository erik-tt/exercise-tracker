'use client'
import withAuth from "@/components/HOC/withAuth";
import WorkoutForm from '@/components/workoutForm';
import React, { useEffect } from 'react'; // Adjust the path as needed

const addWorkout = () => {

  return (
    <div className="bg-gray-100 min-h-screen">
      <WorkoutForm/>
    </div>
  );
};

export default withAuth(addWorkout);
