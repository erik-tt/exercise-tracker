import React, { createContext, useContext, useEffect, useState, ReactNode, FC } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import LoadingSpinner from '@/components/loadingSpinner';

// Initialize Firebase authentication
const auth = getAuth(firebase_app);

// Define the shape of the context
interface AuthContextType {
  user: User | null;
}

// Create the AuthContext with a default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// Define the type for AuthContextProvider props
interface AuthContextProviderProps {
  children: ReactNode;
}

// AuthContextProvider component
export const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
       {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};
