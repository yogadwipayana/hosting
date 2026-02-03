import { useEffect } from 'react';

/**
 * Custom hook for integrating Microsoft Clarity analytics into a React application.
 *
 * This hook dynamically loads the Microsoft Clarity tracking script and initializes
 * it with the project ID from environment variables. It ensures the script is only
 * loaded once and provides proper cleanup when the component unmounts.
 *
 * @hook
 * @example
 * // In your main App component or layout:
 * import { useClarity } from '@/hooks/useClarity';
 *
 * function App() {
 *   useClarity();
 *   return <div>Your App</div>;
 * }
 *
 * @environment VITE_CLARITY_PROJECT_ID - The Microsoft Clarity project ID
 *
 * @returns {void}
 */
export function useClarity() {
    useEffect(() => {
        const projectId = import.meta.env.VITE_CLARITY_PROJECT_ID;

        // Only load if project ID is defined
        if (!projectId) {
            if (import.meta.env.DEV) {
                console.warn(
                    '[useClarity] VITE_CLARITY_PROJECT_ID is not defined. Clarity will not be loaded.'
                );
            }
            return;
        }

        // Check if Clarity is already loaded to prevent duplicate initialization
        if (window.clarity && window.clarity.loaded) {
            return;
        }

        // Initialize the window.clarity queue function
        window.clarity =
            window.clarity ||
            function () {
                (window.clarity.q = window.clarity.q || []).push(arguments);
            };

        // Create and configure the script element
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.clarity.ms/tag/${projectId}`;

        // Append the script to document.head
        document.head.appendChild(script);

        // Cleanup function to remove the script when component unmounts
        return () => {
            // Only remove if the script is still in the DOM
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);
}

export default useClarity;
