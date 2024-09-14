import React, { useState, useEffect } from "react";
import Link from "next/link";
import RunCircleIcon from "@mui/icons-material/RunCircle";
import TimelineIcon from "@mui/icons-material/Timeline";
import AddBoxIcon from "@mui/icons-material/AddBox";

const Sidebar = () => {
  const [selected, setSelected] = useState<string>(
    window.location.pathname.split("/")[1]
  );

  useEffect(() => {
    setSelected(window.location.pathname.split("/")[1]);
  }, []);

  return (
    <div className="bg-white text-gray-800 flex flex-col border-r border-t top-16">
      <nav className="flex-1 p-8">
        <ul className="space-y-4">
          <li>
            <Link href="/">
              <div className="flex items-center">
                <RunCircleIcon className="text-gray-400" />
                <p
                  className={`p-2 cursor-pointer rounded-md`}
                  onClick={() => setSelected("workout-log")}
                >
                  Workouts
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard">
              <div className="flex items-center">
                <TimelineIcon className="text-gray-400" />
                <p
                  className={`p-2 cursor-pointer rounded-md`}
                  onClick={() => setSelected("dashboard")}
                >
                  Dashboard
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/add">
              <div className="flex items-center">
                <AddBoxIcon className="text-gray-400" />
                <p
                  className={`p-2 cursor-pointer rounded-md`}
                  onClick={() => setSelected("add")}
                >
                  Add Workout
                </p>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
