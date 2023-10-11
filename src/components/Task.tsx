import React from "react";

type TaskProperties = {
  taskId: number;
  taskContent: string;
  deleteTask: () => void;
  onDragStart: (event: React.DragEvent) => void;
};

const Task: React.FC<TaskProperties> = ({
  taskContent,
  deleteTask,
  onDragStart,
}) => {
  return (
    <div className="task-container" draggable={true} onDragStart={onDragStart}>
      <span className="task-text">{taskContent}</span>
      <button className="delete-button" onClick={deleteTask}>
        X
      </button>
    </div>
  );
};

export default Task;
