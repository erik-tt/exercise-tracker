'use client'
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'

export default function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleForm = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/")
    }
    return (
    <div className="wrapper flex justify-center items-center min-h-screen bg-gray-100">
        <div className="form-wrapper bg-white p-10 rounded-lg shadow-md text-gray-700">
            <h1 className="text-2xl font-bold mb-6">Sign In</h1>
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
                <button 
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                    Sign In
                </button>
            </form>
            <p className="mt-4 text-center">
                Do not have an account?{' '}
                <a href="/signup" className="text-blue-500 hover:underline">
                Sign Up
                </a>
            </p>
        </div>

    </div>);
}