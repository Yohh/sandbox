import { test, expect } from "@playwright/test";
import { BACKEND_URL, BASE_URL } from "./utils/consts";
import { Task } from "@/app/components/TaskCard";
import { v4 as uuidv4 } from "uuid";

test.describe("manage task", () => {
  test("create task", async ({ page }) => {
    await page.goto(`${BASE_URL}/todolist?modal=true`);

    const titleText = `test_title_${uuidv4().slice(0, 8)}`;

    const firstInput = page.locator("id=taskTitle");
    await firstInput.fill(titleText);

    const contentText = `test_content-${uuidv4().slice(0, 8)}`;

    const secondInput = page.locator("id=taskContent");
    await secondInput.fill(contentText);

    const submitButton = page.locator("id=taskSubmit");
    await submitButton.click();

    await page.goto(`${BASE_URL}/todolist`);

    expect(page.locator(`text=${titleText}`)).toBeTruthy();

    const taskButton = page.locator(`text=${titleText}`);
    await taskButton.click();

    expect(page.locator(contentText)).toBeTruthy();

    const getTasks = await page.request.fetch(`${BACKEND_URL}/tasks`, {
      method: "get",
    });
    const tasksData = await getTasks.json();
    const testTaskId = await tasksData.find(
      (task: Task) => task.title === titleText
    ).id;

    const deleteTask = await page.request.fetch(
      `${BACKEND_URL}/tasks/${testTaskId}`,
      {
        method: "delete",
      }
    );
    expect(deleteTask.status()).toBe(200);
  });

  test("update task", async ({ page }) => {
    const titleText = `test_title_${uuidv4().slice(0, 8)}`;
    const contentText = `test_content-${uuidv4().slice(0, 8)}`;

    const createTask = await page.request.fetch(`${BACKEND_URL}/tasks`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        title: titleText,
        content: contentText,
      },
    });
    const createdTaskData: Task = await createTask.json();

    await page.goto(`${BASE_URL}/todolist`);

    const updateButton = page.locator(`id=updateTask${createdTaskData.id}`);
    await updateButton.click();

    const getTask = await page.request.fetch(
      `${BACKEND_URL}/tasks/${createdTaskData.id}`,
      {
        method: "get",
      }
    );
    const tasksData: Task = await getTask.json();

    expect(tasksData.isDone).toBe(true);

    const deleteTask = await page.request.fetch(
      `${BACKEND_URL}/tasks/${tasksData.id}`,
      {
        method: "delete",
      }
    );
    expect(deleteTask.status()).toBe(200);
  });

  test("delete task", async ({ page }) => {
    const titleText = `test_title_${uuidv4().slice(0, 8)}`;
    const contentText = `test_content-${uuidv4().slice(0, 8)}`;

    const createTask = await page.request.fetch(`${BACKEND_URL}/tasks`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        title: titleText,
        content: contentText,
      },
    });
    const createdTaskData: Task = await createTask.json();

    await page.goto(`${BASE_URL}/todolist`);

    const deleteButton = page.locator(`id=deleteTask${createdTaskData.id}`);
    await deleteButton.click();

    const getTasks = await page.request.fetch(`${BACKEND_URL}/tasks`, {
      method: "get",
    });
    const tasksData = await getTasks.json();

    expect(tasksData.name).not.toBe(titleText);
  });
});
