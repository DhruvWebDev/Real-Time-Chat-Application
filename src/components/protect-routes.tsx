import React, { ReactNode } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

interface ProtectRouteProps {
    children: ReactNode;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
    const { isSignedIn, isLoaded, user } = useUser();
    const { pathname } = useLocation();

    if (isLoaded && !isSignedIn) {
        return <Navigate to="/?sign-in=true" />;
    }

    if (user !== undefined && pathname !== "/chat-app") {
        return <Navigate to="/chat-app" />;
    }

    return <>{children}</>;
}

export default ProtectRoute;
