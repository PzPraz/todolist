import { Task } from "../functions/Task.js";
import { select, hide, show } from "../functions/domHelpers.js";
import { updateProjectLists } from "../components/sidebar.js";

function handleProjectFormSubmit(e) {
  e.preventDefault();

  const projectName = select("#add-project-name").value;
  Task.addProject(projectName);

  const addProjectBtn = select(".add-project");
  show(addProjectBtn);
  hide(e.target);

  updateProjectLists();

  const jsonData = Task.saveToJson();
  localStorage.setItem("taskManagerData", jsonData);

  e.target.reset();
}

function handleProjectFormCancel(e) {
  e.preventDefault();

  const projectForm = select("#add-project-form");
  const addProjectButton = select(".add-project");

  show(addProjectButton);
  hide(projectForm);

  projectForm.reset();
}

export { handleProjectFormSubmit, handleProjectFormCancel };
