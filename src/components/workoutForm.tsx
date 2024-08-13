"use client";

import addData from '@/firebase/firestore/addData';
import React, { useState } from 'react'; // Adjust the path as needed

const WorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const id = new Date().toISOString(); // Generate a unique ID, e.g., timestamp
      const data = { title, description, duration, date };
      const result = await addData('workouts', id, data);
      if (result.error) {
        setError('Failed to add workout data');
      } else {
        setSuccess('Workout data added successfully');
        // Reset form fields
        setTitle('');
        setDescription('');
        setDuration('');
        setDate('');
      }
    } catch (e : any) {
      setError('An error occurred: ' + e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title">Title:</label>
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
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="block w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label htmlFor="duration">Duration:</label>
        <input
          type="text"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          className="block w-full mt-1 p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
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
      {success && <p className="text-green-500">{success}</p>}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default WorkoutForm;
