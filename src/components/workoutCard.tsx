import { WorkoutCardProps } from "@/types/types";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import HikingIcon from "@mui/icons-material/Hiking";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import RowingIcon from "@mui/icons-material/Rowing";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const activities = [
  { key: "Running", icon: <DirectionsRunIcon fontSize="small" /> },
  { key: "Cycling", icon: <DirectionsBikeIcon fontSize="small" /> },
  { key: "Weight Lifting", icon: <FitnessCenterIcon fontSize="small" /> },
  { key: "Skiing", icon: <DownhillSkiingIcon fontSize="small" /> },
  { key: "Roller Skiing", icon: <DownhillSkiingIcon fontSize="small" /> },
  { key: "Hiking", icon: <HikingIcon fontSize="small" /> },
  { key: "Walking", icon: <DirectionsWalkIcon fontSize="small" /> },
  { key: "Rowing", icon: <RowingIcon fontSize="small" /> },
  { key: "Other", icon: <QuestionMarkIcon fontSize="small" /> },
];

const WorkoutCard = ({
  selectedActivity,
  description,
  hours,
  minutes,
  date,
}: WorkoutCardProps) => {
  const selectActivityIcon = (key: String) => {
    const icon = activities.find((activity) => activity.key === key);
    return icon ? icon.icon : <QuestionMarkIcon fontSize="small" />;
  };

  return (
    <Card className="py-2 max-w-sm m-4 mx-auto">
      <CardHeader className="pb-0 pt-2 px-4">
        <div className="flex items-center w-full">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 text-white mr-4">
            {selectActivityIcon(selectedActivity)}
          </div>
          <div className="flex justify-between items-center w-full">
            <div>
              <h4 className="font-bold text-large">{selectedActivity}</h4>
              <small className="text-gray-500">{date}</small>
            </div>
            <div className="flex space-x-2 text-gray-500">
              <AccessTimeIcon />
              <p>
                {hours}h : {minutes}min
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default WorkoutCard;
