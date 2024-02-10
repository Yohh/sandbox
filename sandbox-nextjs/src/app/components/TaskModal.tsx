"use client";

import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import { createTask } from "../actions";
import { useRouter } from "next/navigation";

export interface NewTask {
  title: string;
  content: string;
}

const TaskModal = () => {
  const router = useRouter();

  const [task, setTask] = useState<NewTask>({
    title: "",
    content: "",
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTask(task as NewTask);
    router.push("/todolist");
  };

  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center backdrop-blur-sm">
      <form
        className="w-1/3 h-1/4 bg-orange-400 rounded-2xl flex flex-col justify-around items-center px-4 border-t-2 border-t-orange-600 border-b-2 border-b-orange-600 shadow-xl"
        onSubmit={(e) => submit(e)}
      >
        <h1 className="font-bold">new task</h1>
        <div className="flex justify-between w-4/5">
          <label htmlFor="taskTitle">title:</label>
          <input
            className="rounded w-2/3"
            type="text"
            id="taskTitle"
            minLength={1}
            maxLength={20}
            required
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            autoFocus
          />
        </div>
        <div className="flex justify-between w-4/5">
          <label htmlFor="taskContent">content:</label>
          <input
            className="rounded w-2/3"
            type="text"
            id="taskContent"
            minLength={1}
            maxLength={50}
            required
            value={task.content}
            onChange={(e) => setTask({ ...task, content: e.target.value })}
          />
        </div>
        <div className="ml-auto mr-5">
          <Link href="/todolist">
            <button
              className="w-8 px-1 m-1 z-10 rounded bg-red-600 hover:bg-red-400 text-white"
              type="button"
            >
              &#10007;
            </button>
          </Link>
          <button
            className="w-8 px-1 m-1 rounded bg-green-600 hover:bg-green-400 text-white"
            id="taskSubmit"
            type="submit"
          >
            &#10003;
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskModal;
