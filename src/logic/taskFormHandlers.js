import { Task } from '../functions/Task.js';
import { select, hide, show } from '../functions/domHelpers.js';
import { updateTaskLists } from '../components/preview.js';

function handleTaskFormSubmit(e){
    e.preventDefault()
    const form = select('.add-project-task-form')
    const project = select('.project-title').textContent
    const taskName = select('#name').value
    const taskDueDate = select('#dueDate').value
    const taskDetails = select('textarea').value


    Task.addTask(taskName, taskDueDate, taskDetails, project)
    const jsonData = Task.saveToJson()
    localStorage.setItem('taskManagerData', jsonData)
    updateTaskLists(Task.getProjectTasks(project))

    show(form)
    hide(e.target)
}

function handleTaskFormCancel(e){
    e.preventDefault()
    const addTaskButton = select('.add-project-tasks-btn')
    const form = select('.add-project-task-form')
    show(addTaskButton)
    hide(form)
    form.reset()
}

export { handleTaskFormCancel, handleTaskFormSubmit}