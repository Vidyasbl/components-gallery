import './Stopwatch.css'; // Component-specific styles

function StopwatchDisplay({ elapsedTime }) {
    // Calculate minutes, seconds, and milliseconds from elapsed time
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor(elapsedTime % 1000);

    // Format the time for display
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).padStart(3, '0');

    return (
        <div className="stopwatch-display">
            <span className="time-segment minutes">{formattedMinutes}</span>
            <span className="time-separator">:</span>
            <span className="time-segment seconds">{formattedSeconds}</span>
            <span className="time-separator">.</span>
            <span className="time-segment milliseconds">{formattedMilliseconds}</span>
        </div>
    );
}

export default StopwatchDisplay;