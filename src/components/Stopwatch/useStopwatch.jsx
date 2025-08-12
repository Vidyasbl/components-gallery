import { useState, useRef, useEffect } from 'react';

function useStopwatch() {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const startTimeRef = useRef(0);
    const animationFrameIdRef = useRef(null);

    // Function to update the time during animation
    const animate = (timestamp) => {
        if (!startTimeRef.current) {
            // If stopwatch just started or resumed, set the start time
            startTimeRef.current = timestamp - elapsedTime;
        }
        setElapsedTime(timestamp - startTimeRef.current);
        animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (isRunning) {
            // Start the animation loop
            animationFrameIdRef.current = requestAnimationFrame(animate);
        } else {
            // Pause: Stop the animation loop
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = null; // Clear the ID
            startTimeRef.current = 0; // Reset start time reference when paused
        }

        // Cleanup function: This runs when the component unmounts or isRunning changes
        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [isRunning, elapsedTime]); // Dependency on elapsedTime to restart correctly after pause/resume

    const start = () => {
        if (!isRunning) {
            setIsRunning(true);
        }
    };

    const pause = () => {
        if (isRunning) {
            setIsRunning(false);
        }
    };

    const reset = () => {
        setIsRunning(false);
        setElapsedTime(0);
        // requestAnimationFrame will be cancelled by the useEffect cleanup
        // if it was running, and then reset by the next start call.
    };

    return { elapsedTime, isRunning, start, pause, reset };
}

export default useStopwatch;