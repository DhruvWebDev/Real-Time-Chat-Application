import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spline from '@splinetool/react-spline';

export default function NotFound() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#0a0a0a]"> {/* Dark background */}
            {/* Spline Container */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="relative w-[80%] h-[80%] flex items-center justify-center"> {/* Centered and responsive */}
                    <Spline
                        scene="https://prod.spline.design/Y-Rj4Ef6V9cJyFpg/scene.splinecode"
                        style={{
                            width: '100%',
                            height: '100%',
                            boxShadow: '0 0 50px rgba(0, 0, 255, 0.3), 0 0 100px rgba(0, 0, 255, 0.2), 0 0 150px rgba(0, 0, 255, 0.1)',
                            borderRadius: '30px',
                            backgroundColor: '#0a0a0a'
                        }}
                    />
                </div>
            </div>

            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black/30 z-10" />

            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                {/* Logo and Header */}
                <div className="mb-8">
                    {isLoading ? (
                        <div className="flex items-center justify-center w-16 h-16 border-4 border-t-blue-500 border-blue-300 rounded-full animate-spin"></div>
                    ) : (
                        <div className="text-gray-100 text-9xl font-bold">404</div>
                    )}
                </div>

                {/* Main Text */}
                {!isLoading && (
                    <>
                        <h2 className="text-2xl font-semibold text-gray-100 mb-4">
                            Oops! Page not found
                        </h2>
                        <p className="text-gray-200 mb-8 text-center max-w-md">
                            The page you are looking for doesn't exist or has been moved.
                        </p>

                        {/* Button */}
                        <Link to="/">
                            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200">
                                Return to Home
                            </button>
                        </Link>
                    </>
                )}

            </div>
        </div>
    );
}