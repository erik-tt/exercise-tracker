'use client'
import React from "react";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import withAuth from "@/components/HOC/withAuth";

function Page() {

    return (
        <>
        <div className="bg-gray-100 w-full min-h-screen">
            <h1 className="text-4xl text-center p-6">Dashboard</h1>
        </div>
    </>
    );
}

export default withAuth(Page);