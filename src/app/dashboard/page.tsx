"use client";
import React from "react";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import withAuth from "@/components/HOC/withAuth";
import WorkoutTrend from "@/components/workoutTrend";
import { Card, CardHeader } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/date-picker";

function Page() {
  return (
    <>
      <div className="mx-8 flex flex-col gap-4 pt-12">
        <div className="flex flex-row justify-between px-4">
          <h1 className="text-4xl text-center pl-4">Workout Analysis</h1>
          <DateRangePicker className="max-w-xs" variant="bordered" />
        </div>

        <div className="flex m-4 gap-8">
          <Card className="flex-1 p-8 justify-center bg-white shadow rounded-md">
            <CardHeader className="pb-0 pt-2 px-4">
              <div>
                <h4 className="font-bold text-gray-700 text-3xl">20</h4>
                <small className="text-gray-500">Total Workouts</small>
              </div>
            </CardHeader>
          </Card>

          <Card className="flex-1 p-8 justify-center bg-white shadow rounded-md">
            <CardHeader className="pb-0 pt-2 px-4">
              <div>
                <h4 className="font-bold text-gray-700 text-3xl">12</h4>
                <small className="text-gray-500">Running</small>
              </div>
            </CardHeader>
          </Card>

          <Card className="flex-1 p-8 justify-center bg-white shadow rounded-md">
            <CardHeader className="pb-0 pt-2 px-4">
              <div>
                <h4 className="font-bold text-gray-700 text-3xl">8</h4>
                <small className="text-gray-500">Strength Training</small>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="bg-white mx-4 p-4 shadow-md rounded-md">
          <h2 className="font-bold mb-4">Workouts</h2>
          <WorkoutTrend />
        </div>
      </div>
    </>
  );
}

export default withAuth(Page);
