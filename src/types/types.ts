
//Types:
export interface Workout {
    id: string;
    selectedActivity: string;
    description: string;
    hours: string;
    minutes: string;
    date: string;
    createdAt: any;
}



//Props:
export interface WorkoutCardProps {
    selectedActivity: string;
    description: string;
    hours: string;
    minutes: string;
    date: string;
}



