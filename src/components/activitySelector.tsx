import React from "react";
import { Select, SelectSection, SelectItem, Avatar } from "@nextui-org/react";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import HikingIcon from "@mui/icons-material/Hiking";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import RowingIcon from "@mui/icons-material/Rowing";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

interface ActivitySelectorProps {
  selectedActivity: string;
  setSelectedActivity: (activity: string) => void;
}

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

const ActivitySelector = ({
  selectedActivity,
  setSelectedActivity,
}: ActivitySelectorProps) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedActivity(event.target.value);
  };

  return (
    <Select
      label="Workout type"
      placeholder="Select a workout"
      className="w-full"
      isRequired
      value={selectedActivity}
      onChange={handleSelectChange}
    >
      {activities.map((activity) => (
        <SelectItem
          key={activity.key}
          startContent={
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 text-white">
              {activity.icon}{" "}
            </div>
          }
        >
          {activity.key}
        </SelectItem>
      ))}
    </Select>
  );
};

export default ActivitySelector;
