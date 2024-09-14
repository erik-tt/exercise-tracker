"use client";

import addData from "@/firebase/firestore/addData";
import { serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import ActivitySelector from "./activitySelector";
import { DateInput, Textarea, Input } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { useAuthContext } from "@/context/AuthContext";

// Helper function
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const WorkoutForm = () => {
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState<number | string>("");
  const [minutes, setMinutes] = useState<number | string>("");
  const [date, setDate] = useState(getTodayDate());
  const [error, setError] = useState("");
  const [hourError, setHourError] = useState("");
  const [minuteError, setMinuteError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const { user } = useAuthContext();
  const uid = user?.uid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const id = new Date().toISOString();
      const createdAt = serverTimestamp();
      const data = {
        selectedActivity,
        description,
        hours,
        minutes,
        date,
        createdAt,
        uid,
      };
      const result = await addData("workouts", id, data);
      if (result.error) {
        setError("Failed to add workout data");
      } else {
        setSuccess("Workout data added successfully");
        // Reset form fields
        setSelectedActivity("");
        setDescription("");
        setHours("");
        setMinutes("");
        setDate(getTodayDate());
      }
    } catch (e: any) {
      setError("An error occurred: " + e.message);
    }
  };

  const handleHourInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setHourError("");
      setHours("");
      return;
    }
    let number = parseInt(value);
    if (Number.isNaN(number) && value != "") {
      setHourError("Use numbers for hours");
    } else {
      setError("");
      setHours(number);
    }
  };

  const handleMinutesInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setMinuteError("");
      setMinutes("");
      return;
    }
    let number = parseInt(value);
    if (Number.isNaN(number)) {
      setMinuteError("Use numbers for minutes");
      return;
    }
    if (number > 60) {
      setMinuteError("Minutes cannot be larger than 60");
      return;
    } else {
      setHourError("");
      setMinutes(number);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-gray-600 max-w-lg mx-auto p-10 bg-white shadow-sm rounded"
    >
      <div>
        <h1 className="text-2xl font-bold mb-4">Add a workout</h1>
        <ActivitySelector
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
        />
      </div>
      <div>
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter your workout description"
          className=" w-full"
        />
      </div>

      <div className="flex">
        <div className="mr-2">
          <Input
            label="Hours"
            value={hours.toString()}
            onChange={handleHourInput}
            isRequired
            isInvalid={hourError.length != 0}
            errorMessage={hourError}
            className="w-full"
          />
        </div>
        <div className="ml-2">
          <Input
            label="Minutes"
            value={minutes.toString()}
            onChange={handleMinutesInput}
            isRequired
            isInvalid={minuteError.length != 0}
            errorMessage={minuteError}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <DateInput
          label={"Date"}
          isRequired
          defaultValue={parseDate(getTodayDate())}
          className="w-full"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-gray-600">{success}</p>}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Add
      </button>
    </form>
  );
};

export default WorkoutForm;
