"use client";

import addData from '@/firebase/firestore/addData';
import { serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react'; // Adjust the path as needed

const WorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const id = new Date().toISOString();
      const createdAt = serverTimestamp() // Generate a unique ID, e.g., timestamp
      const data = { title, description, hours, minutes, date, createdAt};
      const result = await addData('workouts', id, data);
      if (result.error) {
        setError('Failed to add workout data');
      } else {
        setSuccess('Workout data added successfully');
        // Reset form fields
        setTitle('');
        setDescription('');
        setHours('');
        setMinutes('');
        setDate('');
      }
    } catch (e : any) {
      setError('An error occurred: ' + e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-gray-600 max-w-lg mx-auto p-10 bg-white shadow-sm rounded">
      <div>
      <h1 className="text-2xl font-bold mb-4">Add a workout</h1>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="block w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="block w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </div> 

      <div className='flex'>
        <div className='mr-2'>
          <label htmlFor="hours">Hours</label>
          <input
            type="number"
            id="duration"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
            className="block w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className='ml-2'>
          <label htmlFor="hours">Minutes</label>
          <input
            type="number"
            id="duration"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            required
            className="block w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <div>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="block w-full mt-1 p-2 border border-gray-300 rounded"
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
