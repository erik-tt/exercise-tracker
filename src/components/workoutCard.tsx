import { WorkoutCardProps } from '@/types/types';

const WorkoutCard = ({ title, description, duration, date, type } : WorkoutCardProps) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white">
             <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                    <p className="text-gray-700 text-base">{description}</p>
                    <p className="text-gray-700 text-base">Duration: {duration}</p>
                    <p className="text-gray-700 text-base">Date: {date}</p>
                    <p className="text-gray-700 text-base">Type: {type}</p>
                </div>
        </div>
    )
}

export default WorkoutCard;