import React, { useEffect } from "react";
import LoadingSpinner from "../loadingSpinner";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

/**
 * Higher Order Component to check if user is authenticated. 
 * Can be reused to check if user is authenticated before rendering a component.
 * @param WrappedComponent 
 * @returns withAuth component to check if user is authenticated
 */
const withAuth = (WrappedComponent: React.ComponentType) => {
    const AuthenticatedComponent = (props: any) => {
        const { user } = useAuthContext();
        const router = useRouter();

        useEffect(() => {
            if (!user) {
                router.push("/signin");
            }
        }, [user, router]);

        if (!user) return <LoadingSpinner />;   

        return <WrappedComponent {...props} />;
    };
    return AuthenticatedComponent;
};

export default withAuth;