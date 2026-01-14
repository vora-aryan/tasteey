import { Link } from "react-router";
import { Home, MoveLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center space-y-8">
        <div className="space-y-4">
            <h1 className="text-9xl font-black text-gray-900 dark:text-gray-100 select-none">404</h1>
            <h2 className="text-4xl font-bold tracking-tight text-gray-800 dark:text-white">Page not found</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
            <Link 
                to="/" 
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none gap-2"
            >
                <Home className="w-4 h-4" />
                Go Home
            </Link>
             <button 
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-gray-700 transition duration-200 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:shadow-outline focus:outline-none gap-2"
            >
                <MoveLeft className="w-4 h-4" />
                Go Back
            </button>
        </div>
    </div>
  );
}
