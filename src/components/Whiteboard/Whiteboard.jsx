import Contents from './Contents';
import './Whiteboard.css'; // Global styles for the app

function Whiteboard() {
    return (
        <div className="whiteboard-app-container">
            <h1 className="whiteboard-app-title">Simple React Whiteboard</h1>
            <Contents />
            <div className="whiteboard-footer-note">
                <p>Built with React & Canvas API</p>
            </div>
        </div>
    );
}

export default Whiteboard;