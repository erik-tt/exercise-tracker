import React, { useState } from "react";
import { Workout } from "@/types/types";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const WorkoutTrend = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([])

    
  return(
    <>
        <div className="w-full h-64">
            <ResponsiveContainer width="95%" height="100%">
                <LineChart width={500} height={400} data={[ {"date": "12/7", "number": 8}, {"date": "15/7", "number": 2}, {"date": "20/7", "number": 12}]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="number" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </>
    );
};

export default WorkoutTrend;
