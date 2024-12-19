import React, { useEffect, useState } from "react";
import { Workout } from "@/types/types";
import { Area, AreaChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface IWorkoutTrendProps {
    workoutList: Workout[]
}

const WorkoutTrend: React.FC<IWorkoutTrendProps> = (props: IWorkoutTrendProps) => {
    
    const [data, setData] = useState<any[]>([]);
    const activityTypes = ["Running", "Cycling", "Weight Lifting", "Skiing", "Roller Skiing", "Hiking", "Walking", "Rowing", "Other"]

    const colors: string[] = [
        "#8884d8", // Light Purple
        "#82ca9d", // Soft Green
        "#ffc658", // Light Orange
        "#ff7f50", // Coral
        "#8dd1e1", // Light Blue
        "#a4de6c", // Light Lime
        "#d0ed57", // Soft Yellow
        "#ffbb28", // Warm Yellow
        "#ff8042", // Vibrant Orange
    ];

    useEffect(() => {
        const groupedData: { [key: string]: any} = {};

        props.workoutList.map(workout => {
            const totalMinutes = Number(workout.hours) * 60 +  Number(workout.minutes);
            const date = workout.date;

            if (!groupedData[date]) {
                groupedData[date] = { date };
                activityTypes.forEach(type => {
                    groupedData[date][type] = 0;
                });
            }
            groupedData[date][workout.selectedActivity] += totalMinutes;
        });

        const transformedData = Object.values(groupedData).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setData(transformedData);
    }, [props.workoutList]);
    
    return(
        <>
            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart width={500} height={400} data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="date" tickMargin={5}/>
                        <YAxis tickMargin={10} />
                        <Tooltip />
                        <Legend />
                        {activityTypes
                            .filter(activity => 
                                // Check if the activity has non-zero values across all data entries
                                data.some(entry => entry[activity] > 0)
                            )
                            .map((activity, index) => (
                                <Area 
                                    key={activity} 
                                    type="monotone" 
                                    dataKey={activity} 
                                    stackId="1" 
                                    stroke={colors[index]} 
                                    fill={colors[index]}  
                                />
                            ))}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
        );
};

export default WorkoutTrend;
