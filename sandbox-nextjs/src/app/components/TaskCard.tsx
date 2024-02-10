"use client";

import React, { useState } from "react";
import { deleteTask, updateTask } from "../actions";

export interface Task {
  id: number;
  title: string;
  content: string;
  isDone: boolean;
}

type taskCardProps = {
  task: Task;
  index: number;
};

const TaskCard = ({ task, index }: taskCardProps) => {
  const [isContentDisplayed, setIsContentDisplayed] = useState(false);

  return (
    <div>
      <div
        className={`flex justify-between w-full pl-6 mt-4 rounded-xl border-2 border-orange-400 border-b-orange-600 border-r-orange-600`}
      >
        <div
          className="w-2/3 lg:w-3/4 text-left cursor-pointer"
          role="button"
          onClick={() => setIsContentDisplayed(!isContentDisplayed)}
        >
          <span
            className={`font-medium ${
              task.isDone && "opacity-50 line-through"
            }`}
          >
            {`${index + 1} - ${task.title}`}
          </span>
          {task.isDone && <i className="text-green-600 ml-4">&#10003;</i>}
        </div>
        <div className="bg-orange-300 px-3 rounded-tl-lg rounded-br-xl border-t-2 border-t-orange-600">
          <button
            id={`updateTask${task.id}`}
            className={`w-6 px-1 m-1 ${
              task.isDone && "opacity-50 hover:bg-green-600"
            } rounded bg-green-600 hover:bg-green-400 text-white`}
            onClick={() => updateTask(task)}
            disabled={task.isDone}
          >
            &#10003;
          </button>
          <button
            id={`deleteTask${task.id}`}
            className="w-6 px-1 m-1 z-10 rounded bg-red-600 hover:bg-red-400 text-white"
            onClick={() => {
              deleteTask(task.id);
            }}
          >
            &#10007;
          </button>
        </div>
      </div>
      <div className="bg-orange-300 mx-4 rounded-b-xl">
        {isContentDisplayed && (
          <div className="animate-growTaskContent">
            <div
              className="animate-showTaskContent pt-2"
              role="button"
              onClick={() => setIsContentDisplayed(!isContentDisplayed)}
            >
              <span>{task.content}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
