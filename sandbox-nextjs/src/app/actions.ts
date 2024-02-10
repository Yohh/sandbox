"use server";

import { revalidateTag } from "next/cache";
import { NewTask } from "./components/TaskModal";
import { Task } from "./components/TaskCard";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getTasks = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`, {
      next: { tags: ["tasks"] },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const createTask = async (newTask: NewTask) => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    body: JSON.stringify({ title: newTask.title, content: newTask.content }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to create data");
  }

  revalidateTag("tasks");
};

export const updateTask = async (task: Task) => {
  const res = await fetch(`${baseUrl}/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ ...task, isDone: true }),
  });
  if (!res.ok) {
    throw new Error("Failed to update data");
  }

  revalidateTag("tasks");
};

export const deleteTask = async (id: number) => {
  const res = await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete data");
  }

  revalidateTag("tasks");
};
