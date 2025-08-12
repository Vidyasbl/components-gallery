import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './KanbanBoard.css';

const initialData = {
    tasks: {
        'task-1': {
            id: 'task-1',
            title: 'Implement user authentication',
            description: 'Create login and signup functionality with JWT tokens',
            assignee: 'John Smith',
            priority: 'High',
            type: 'Feature'
        },
        'task-2': {
            id: 'task-2',
            title: 'Fix responsive layout bug',
            description: 'Mobile navigation is not working properly on iOS devices',
            assignee: 'Sarah Johnson',
            priority: 'High',
            type: 'Bug'
        },
        'task-3': {
            id: 'task-3',
            title: 'Update API documentation',
            description: 'Document new endpoints for user management',
            assignee: 'Mike Chen',
            priority: 'Medium',
            type: 'Documentation'
        },
        'task-4': {
            id: 'task-4',
            title: 'Design landing page',
            description: 'Create wireframes and mockups for the new landing page',
            assignee: 'Emily Davis',
            priority: 'Medium',
            type: 'Design'
        },
        'task-5': {
            id: 'task-5',
            title: 'Set up CI/CD pipeline',
            description: 'Configure automated testing and deployment',
            assignee: 'Alex Wilson',
            priority: 'Low',
            type: 'DevOps'
        },
        'task-6': {
            id: 'task-6',
            title: 'Code review guidelines',
            description: 'Establish team code review standards and checklist',
            assignee: 'Lisa Brown',
            priority: 'Low',
            type: 'Process'
        }
    },
    columns: {
        'todo': {
            id: 'todo',
            title: 'To Do',
            taskIds: ['task-1', 'task-2', 'task-3']
        },
        'inprogress': {
            id: 'inprogress',
            title: 'In Progress',
            taskIds: ['task-4', 'task-5']
        },
        'done': {
            id: 'done',
            title: 'Done',
            taskIds: ['task-6']
        }
    },
    columnOrder: ['todo', 'inprogress', 'done']
};

const KanbanBoard = () => {
    const [data, setData] = useState(initialData);

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };

            const newData = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn
                }
            };

            setData(newData);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newData = {
            ...data,
            columns: {
                ...data.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };

        setData(newData);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return '#FF5630';
            case 'Medium':
                return '#FF8B00';
            case 'Low':
                return '#36B37E';
            default:
                return '#DDD';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Bug':
                return '🐛';
            case 'Feature':
                return '⭐';
            case 'Design':
                return '🎨';
            case 'DevOps':
                return '⚙️';
            case 'Documentation':
                return '📝';
            case 'Process':
                return '📋';
            default:
                return '📌';
        }
    };

    return (
        <div className="kanban-board">
            <div className="board-header">
                <h1>Project Board</h1>
                <p>Drag and drop tasks between columns</p>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="board-container">
                    {data.columnOrder.map(columnId => {
                        const column = data.columns[columnId];
                        const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

                        return (
                            <div key={column.id} className="column">
                                <div className="column-header">
                                    <h3>{column.title}</h3>
                                    <span className="task-count">{tasks.length}</span>
                                </div>

                                <Droppable droppableId={column.id}>
                                    {(provided, snapshot) => (
                                        <div
                                            className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {tasks.map((task, index) => (
                                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <div className="task-header">
                                                                <div className="task-type">
                                                                    <span className="type-icon">{getTypeIcon(task.type)}</span>
                                                                    <span className="type-text">{task.type}</span>
                                                                </div>
                                                                <div
                                                                    className="priority-indicator"
                                                                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                                                                    title={`${task.priority} Priority`}
                                                                ></div>
                                                            </div>

                                                            <h4 className="task-title">{task.title}</h4>
                                                            <p className="task-description">{task.description}</p>

                                                            <div className="task-footer">
                                                                <div className="assignee">
                                                                    <div className="assignee-avatar">
                                                                        {task.assignee.split(' ').map(name => name[0]).join('')}
                                                                    </div>
                                                                    <span className="assignee-name">{task.assignee}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        );
                    })}
                </div>
            </DragDropContext>
        </div>
    );
};

export default KanbanBoard;