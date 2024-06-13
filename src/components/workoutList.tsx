import React from 'react';
import WorkoutCard from '@/components/workoutCard';
import { Workout } from '@/types/types';
import Sidebar from '@/components/sidebar';


const workouts: Workout[] = [
    { id: 1, title: 'Morning Run 👟', description: 'A nice run in the park', duration: '30 mins', type:"run", date: '2024-06-01' },
    { id: 2, title: 'Yoga Session 🧘🏻‍♀️', description: 'i4 roller skiing session', duration: '45 mins', type:"Roller skiing", date: '2024-06-02' },
    { id: 3, title: 'Strength Training 💪', description: 'Full body strength training', duration: '1 hour', type:"strength", date: '2024-06-03' },
  ];

const WorkoutList = () => {

    return(
        <div className="flex flex-wrap column justify-center">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              title={workout.title}
              description={workout.description}
              duration={workout.duration}
              type = {workout.type}
              date={workout.date}
            />
          ))}
      </div>
    );
};

export default WorkoutList;