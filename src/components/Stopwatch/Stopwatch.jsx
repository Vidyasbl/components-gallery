import useStopwatch from './useStopwatch';
import StopwatchDisplay from './StopwatchDisplay';
import StopwatchControls from './StopwatchControls';
import './Stopwatch.css'; // Component-specific styles

function Stopwatch() {
    const { elapsedTime, isRunning, start, pause, reset } = useStopwatch();

    return (
        <div className="stopwatch-container">
            <StopwatchDisplay elapsedTime={elapsedTime} />
            <StopwatchControls
                isRunning={isRunning}
                onStart={start}
                onPause={pause}
                onReset={reset}
            />
        </div>
    );
}

export default Stopwatch;