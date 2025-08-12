import './Stopwatch.css'; // Component-specific styles

function StopwatchControls({ isRunning, onStart, onPause, onReset }) {
    return (
        <div className="stopwatch-controls">
            {!isRunning ? (
                <button onClick={onStart} className="control-button start-button">
                    Start
                </button>
            ) : (
                <button onClick={onPause} className="control-button pause-button">
                    Pause
                </button>
            )}
            <button onClick={onReset} className="control-button reset-button">
                Reset
            </button>
        </div>
    );
}

export default StopwatchControls;