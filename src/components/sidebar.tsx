import React, { useState, useEffect} from 'react';
import Link from 'next/link';

const Sidebar = () => {
    
    const [selected, setSelected] = useState<string>(window.location.pathname.split('/')[1]);

    useEffect(() => {
        setSelected(window.location.pathname.split('/')[1]);
    }, []);



    return (
        <div className="h-screen w-58 bg-white text-gray-800 flex flex-col border-r">
            <nav className="flex-1 p-8">
                <ul className="space-y-4">
                    <li>
                        <Link href="/workout-log">
                            <p className={`p-2 px-6 cursor-pointer rounded-md ${selected === 'workout-log' ? 'bg-blue-600 text-white' : ''}
                            hover:bg-blue-500 hover:text-white`} onClick={() => setSelected('workout-log')}>
                                Workouts</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard">
                            <p className={`p-2 px-6 cursor-pointer rounded-md  ${selected === 'dashboard' ? 'bg-blue-600 text-white' : ''}
                            hover:bg-blue-500 hover:text-white`} onClick={() => setSelected('dashboard')}>
                                Dashboard
                            </p>
                        </Link> 
                    </li>
                    <li>
                        <Link href="/add">
                            <p className={`p-2 px-6  cursor-pointer rounded-md border border-purple-600 
                            hover:bg-blue-500 hover:text-white`} onClick={() => setSelected('add')}>
                                Add + 
                            </p>
                        </Link>
                    </li>
                </ul>
        </nav>
        </div>
    )
}

export default Sidebar;