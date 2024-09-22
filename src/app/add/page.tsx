'use client'
import withAuth from "@/components/HOC/withAuth";
import WorkoutForm from '@/components/workoutForm';
import React, { useEffect } from 'react'; // Adjust the path as needed

const addWorkout = () => {

  return (
    <div className="pt-12">
      <WorkoutForm/>
    </div>
  );
};

export default withAuth(addWorkout);
