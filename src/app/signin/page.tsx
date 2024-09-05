'use client'
import React, { useState } from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'

export default function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string>()
    const router = useRouter()

    const handleForm = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            setError('Wrong password or username')
        }

        // else successful
        else {
            return router.push("/")
        }
    }

    return (
    <div className="wrapper flex justify-center items-center min-h-screen bg-gray-400">
        <div className="form-wrapper bg-white p-10 rounded-lg shadow-md text-gray-700">
            <h1 className="text-2xl font-bold mb-6">Log In</h1>
            <form onSubmit={handleForm} className="form space-y-4">
                <label htmlFor="email" className="block"> 
                    <p className="mb-2">Email</p>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        type="email"
                        name="email"
                        id="email"
                        placeholder="example@mail.com"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </label>
                <label htmlFor="password" className="block">
                    <p className="mb-2">Password</p>
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        required type="password" 
                        name="password" 
                        id="password" 
                        placeholder="password" 
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </label>
                {error && <p className="text-red-500">{error}</p>}
                <button 
                type="submit"
                className="w-full bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
                >
                    Log In
                </button>
            </form>
            <p className="mt-4 text-center">
                Do not have an account?{' '}
                <a href="/signup" className="text-gray-500 hover:underline">
                Sign Up
                </a>
            </p>
        </div>

    </div>);
}