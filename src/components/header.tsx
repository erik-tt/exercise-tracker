import React from "react";
import Link from "next/link";
import { getAuth, signOut } from "firebase/auth";
import { useAuthContext } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuthContext();
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="bg-white p-4 border-b">
      <nav className="flex justify-between">
        <div>
          <Link href="/">
            <p className="bg-gray-500 text-transparent bg-clip-text text-2xl font-semibold">
              ExerciseTracker
            </p>
          </Link>
        </div>
        <ul className="flex space-x-4">
          {user ? (
            <button
              onClick={handleSignOut}
              className="text-gray-800 hover:text-gray-600"
            >
              Log Out
            </button>
          ) : (
            <li>
              <Link href="/signin">
                <p className="text-gray-800 hover:text-gray-600">Sign In</p>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
