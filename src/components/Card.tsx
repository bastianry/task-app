import React from 'react';
import Task from './Task';

type CardProperties = {
    title: string;
    tasks: { id: number, content: string }[];
    onDeleteTask: (id: number) => void;
    onDropTask: (event: React.DragEvent) => void;
    onDragOver: (event: React.DragEvent) => void;
}

const Card: React.FC<CardProperties> = ({ title, tasks, onDeleteTask, onDragOver, onDropTask }) => {
    return (
        <div className="card-container" onDrop={onDropTask} onDragOver={onDragOver}>
            <h2>{title}</h2>
            {tasks.map((task) =>
    <Task 
        key={task.id} 
        taskContent={task.content} 
        taskId={task.id} 
        deleteTask={() => onDeleteTask(task.id)} 
        onDragStart={(event) => {event.dataTransfer.setData('text/plain', String(task.id));
    }} />
)}

        </div>
    );
}

export default Card;