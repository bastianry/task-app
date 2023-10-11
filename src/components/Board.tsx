import React, { useState } from "react";
import Card from "./Card";

const Board: React.FC = () => {
  const [tasks, setTasks] = useState<{ id: number; content: string }[]>([]);
  const [inProgress, setInProgress] = useState<
    { id: number; content: string }[]
  >([]);
  const [done, setDone] = useState<{ id: number; content: string }[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const [taskIdCounter, setTaskIdCounter] = useState<number>(0);

  const deleteTaskHandler = (
    card: "tasks" | "inProgress" | "done",
    taskId: number
  ) => {
    switch (card) {
      case "tasks":
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        break;
      case "inProgress":
        setInProgress((prevTasks) =>
          prevTasks.filter((task) => task.id !== taskId)
        );
        break;
      case "done":
        setDone((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        break;
      default:
        break;
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (
    card: "tasks" | "inProgress" | "done",
    event: React.DragEvent
  ) => {
    const draggedTaskId = event.dataTransfer.getData("text/plain");
    const draggedTask = [...tasks, ...inProgress, ...done].find(
      (task) => task.id === Number(draggedTaskId)
    );
    if (!draggedTask) return;

    if (tasks.some((task) => task.id === draggedTask.id)) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== draggedTask.id)
      );
    } else if (inProgress.some((task) => task.id === draggedTask.id)) {
      setInProgress((prevTasks) =>
        prevTasks.filter((task) => task.id !== draggedTask.id)
      );
    } else if (done.some((task) => task.id === draggedTask.id)) {
      setDone((prevTasks) =>
        prevTasks.filter((task) => task.id !== draggedTask.id)
      );
    }

    switch (card) {
      case "tasks":
        setTasks((prevTasks) => [...prevTasks, draggedTask]);
        break;
      case "inProgress":
        setInProgress((prevTasks) => [...prevTasks, draggedTask]);
        break;
      case "done":
        setDone((prevTasks) => [...prevTasks, draggedTask]);
        break;
      default:
        break;
    }
  };

  const addTaskHandler = () => {
    if (newTask.trim()) {
      const newTaskObject = { id: taskIdCounter, content: newTask };
      setTasks((prevTasks) => [...prevTasks, newTaskObject]);
      setNewTask("");
      setTaskIdCounter((prevId) => prevId + 1);
    }
  };

  return (
    <div>
      <div className="add-task-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter New Task"
          id="task-input"
        />
        <button onClick={addTaskHandler}>Add Task</button>
      </div>
      <div className="board-container">
        <Card
          title="To Do"
          tasks={tasks}
          onDeleteTask={(index) => deleteTaskHandler("tasks", index)}
          onDropTask={(event) => handleDrop("tasks", event)}
          onDragOver={handleDragOver}
        />
        <Card
          title="In Progress"
          tasks={inProgress}
          onDeleteTask={(index) => deleteTaskHandler("inProgress", index)}
          onDropTask={(event) => handleDrop("inProgress", event)}
          onDragOver={handleDragOver}
        />
        <Card
          title="Done"
          tasks={done}
          onDeleteTask={(index) => deleteTaskHandler("done", index)}
          onDropTask={(event) => handleDrop("done", event)}
          onDragOver={handleDragOver}
        />
      </div>
    </div>
  );
};

export default Board;
