import { WorkoutCardProps } from '@/types/types';

const WorkoutCard = ({ title, description, hours, minutes, date } : WorkoutCardProps) => {
    return (
        <div className="max-w-sm rounded-3xl overflow-hidden shadow-sm m-4 bg-white space-y-4 text-gray-600 max-w-lg mx-auto">
             <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                    <p className="text-gray-700 text-base">{description}</p>
                    <p className="text-gray-700 text-base">Duration: {hours} : {minutes}</p>
                    <p className="text-gray-700 text-base">Date: {date}</p>
                </div>
        </div>
    )
}

export default WorkoutCard;