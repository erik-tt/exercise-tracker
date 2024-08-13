import WorkoutForm from '@/components/workoutForm';
import React from 'react'; // Adjust the path as needed

const addWorkout = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Log a Workout</h1>
      <WorkoutForm />
    </div>
  );
};

export default addWorkout;
