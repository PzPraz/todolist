import { Task } from "../functions/Task.js";
import { select, hide, show } from "../functions/domHelpers.js";
import { updateTaskLists } from "../components/preview.js";

function handleTaskFormSubmit(e) {
  e.preventDefault();
  const form = select(".add-project-task-form");
  const project = select(".project-title").textContent;
  const taskName = select("#name").value;
  const taskDueDate = select("#dueDate").value;
  const taskDetails = select("textarea").value;
  const taskPriority = select("#priority").value;

  Task.addTask(taskName, taskDueDate, taskDetails, project, taskPriority);
  const jsonData = Task.saveToJson();
  localStorage.setItem("taskManagerData", jsonData);
  updateTaskLists(Task.getProjectTasks(project));

  show(form);
  hide(e.target);
}

function handleTaskFormCancel(e) {
  e.preventDefault();
  const addTaskButton = select(".add-project-tasks-btn");
  const form = select(".add-project-task-form");
  show(addTaskButton);
  hide(form);
  form.reset();
}

function handleTaskEdit(e) {
  e.preventDefault;

  const overlay = select(".overlay");
  const taskElement = e.currentTarget;
  const projectName = select(".project-title").textContent;
  const taskId = taskElement.getAttribute("data-task-id");

  const taskName = select("#editName").value;
  const taskDueDate = select("#editDueDate").value;
  const taskDetails = select("#editDetails").value;
  const taskPriority = select("#editPriority").value;
  const currentTask = Task.getTaskById(taskId);

  hide(overlay);

  Task.editTask(currentTask, taskName, taskDueDate, taskDetails, taskPriority);

  if (projectName == "All Tasks") {
    updateTaskLists(Task.getTask());
  } else if (projectName === "Today") {
    updateTaskLists(Task.getTasksByCategory("today"));
  } else if (projectName === "This Week") {
    updateTaskLists(Task.getTasksByCategory("week"));
  } else if (projectName === "This Month") {
    updateTaskLists(Task.getTasksByCategory("month"));
  } else {
    updateTaskLists(Task.getProjectTasks(projectName));
  }

  const jsonData = Task.saveToJson();
  localStorage.setItem("taskManagerData", jsonData);
}

export { handleTaskFormCancel, handleTaskFormSubmit, handleTaskEdit };
