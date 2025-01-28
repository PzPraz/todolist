import { show, hide, create, select, addClass, setText, clearContent, createElementWithClasses, append} from '../functions/domHelpers.js'
import { Task } from '../functions/Task.js'
import { handleTaskEdit, handleTaskFormSubmit} from '../logic/taskFormHandlers.js'
import { format } from 'date-fns'

function createGeneralTasks(tasks, title){
    const projectPreviews = select('.project-previews')    
    clearContent(projectPreviews)

    const projectTitle = createElementWithClasses('h1', 'project-title')
    setText(projectTitle, title)

    const projectPreviewLists = createElementWithClasses('div', 'project-preview-lists')
    append(projectPreviews, projectTitle)
    append(projectPreviews, projectPreviewLists)

    updateTaskLists(tasks)
}

function createProjectPreview(project){
    const projectPreviews = select('.project-previews')
    clearContent(projectPreviews)

    const projectTitle = createElementWithClasses('h1', 'project-title')
    setText(projectTitle, project.name)

    const projectPreviewLists = createElementWithClasses('div', 'project-preview-lists')
    
    const addProjectTasksButton = createElementWithClasses('button', 'add-project-tasks-btn')
    setText(addProjectTasksButton, 'Add Tasks')

    addProjectTasksButton.addEventListener('click', (e) => {
        e.preventDefault()
        const form = select('.add-project-task-form')

        show(form)
        hide(e.target)

    })



    const addProjectTasksForm = createProjectTasksForm()


    append(projectPreviews, projectTitle)
    append(projectPreviews, projectPreviewLists)
    append(projectPreviews, addProjectTasksButton)
    append(projectPreviews, addProjectTasksForm)

    updateTaskLists(Task.getProjectTasks(project.name))

}

function createProjectTasksForm(){  
    const form = createElementWithClasses('form', 'add-project-task-form')
    addClass(form, 'hide')

    const inputTaskName = create('input')
    inputTaskName.setAttribute('type', 'text')
    inputTaskName.setAttribute('id', 'name')
    inputTaskName.setAttribute('placeholder', 'Name')
    inputTaskName.setAttribute('required', 'true')    

    const inputDueDate = create('input')
    inputDueDate.setAttribute('type', 'date')
    inputDueDate.setAttribute('name', 'dueDate')
    inputDueDate.setAttribute('id', 'dueDate')
    inputDueDate.setAttribute('required', 'ture')

    const inputLabel = createElementWithClasses('label', 'priority-label')
    inputLabel.setAttribute('for', 'priority')
    setText(inputLabel, 'Set Priority (Lowest to Highest)')
    const inputPriority = create('input')
    inputPriority.setAttribute('name', 'priority')
    inputPriority.setAttribute('required', 'true')
    inputPriority.setAttribute('type', 'range')
    inputPriority.setAttribute('id', 'priority')
    inputPriority.setAttribute('max', '3')
    inputPriority.setAttribute('min', '1')
    inputPriority.setAttribute('value', '1')
    inputPriority.setAttribute('style', 'width: 200px;')


    const inputDetails = create('textarea')
    inputDetails.setAttribute('name', 'details')
    inputDetails.setAttribute('placeholder', 'Task Details')

    const taskControlButton = createElementWithClasses('div', 'add-task-control-btn')

    const taskSubmitButton = createElementWithClasses('button', 'task-submit')
    taskSubmitButton.setAttribute('type', 'submit')
    setText(taskSubmitButton, 'Add')

    const cancelTaskButton = createElementWithClasses('button', 'cancel-task-btn')
    cancelTaskButton.setAttribute('type', 'button')
    cancelTaskButton.addEventListener('click', (e) => {
        e.preventDefault()
        const addTaskButton = select('.add-project-tasks-btn')
        const addTaskForm = select('.add-project-task-form')
        show(addTaskButton)
        hide(addTaskForm)
        addTaskForm.reset()
    })
    setText(cancelTaskButton, 'Cancel')

    append(taskControlButton, taskSubmitButton)
    append(taskControlButton, cancelTaskButton)

    append(form, inputTaskName)
    append(form, inputDueDate)
    append(form, inputDetails)
    append(form, inputLabel)
    append(form, inputPriority)
    append(form, taskControlButton)

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const addTaskButton = select('.add-project-tasks-btn')
        const addTaskForm = e.target
        handleTaskFormSubmit(e)

        show(addTaskButton)
        hide(addTaskForm)

        addTaskForm.reset()
    })

    return form

}

function createPreview(){
    const content = select('.content')
    const projectPreviews = createElementWithClasses('div', 'project-previews')

    append(content, projectPreviews)
}

function removeTaskFromProject(e){
    const projectName = select('.project-title').textContent
    const taskElement = e.currentTarget.parentElement.parentElement
    const taskId = taskElement.getAttribute('data-task-id');
    Task.removeTask(taskId)
    const jsonData = Task.saveToJson()
    localStorage.setItem('taskManagerData', jsonData)
    if (projectName == 'All Tasks'){
        updateTaskLists(Task.tasks)
    } else if (projectName === 'Today'){
        updateTaskLists(Task.getTasksByCategory('today'))
    } else if (projectName === 'This Week'){
        updateTaskLists(Task.getTasksByCategory('week'))
    } else if (projectName === 'This Month'){
        updateTaskLists(Task.getTasksByCategory('month'))
    } else {
        updateTaskLists(Task.getProjectTasks(projectName))
    }

}

function showTaskDetailsPopUp(e){
    e.preventDefault()
    
    const taskElement = e.currentTarget.parentElement.parentElement
    const taskId = taskElement.getAttribute('data-task-id');
    

    const overlay = select('.overlay')
    const popUp = select('.task-details-pop-up')


    setTaskDetailsPopUp(Task.getTaskById(taskId))
    show(overlay)
    show(popUp)
}

function createTaskPreview(task){
    const taskPreview = createElementWithClasses('div', 'task-preview')
    const taskName = createElementWithClasses('div', 'task-name')
    const taskControlButton = createElementWithClasses('div', 'task-control-btn')
    const moreDetailsButton = createElementWithClasses('button', 'more-details-btn')
    const removeTaskButton = createElementWithClasses('button', 'remove-task-button')
    const taskEditButton = createElementWithClasses('button', 'task-edit-btn')

    setText(taskName, task.name)
    removeTaskButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/></svg>`
    moreDetailsButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M448.67-280h66.66v-240h-66.66v240Zm31.32-316q15.01 0 25.18-9.97 10.16-9.96 10.16-24.7 0-15.3-10.15-25.65-10.16-10.35-25.17-10.35-15.01 0-25.18 10.35-10.16 10.35-10.16 25.65 0 14.74 10.15 24.7 10.16 9.97 25.17 9.97Zm.19 516q-82.83 0-155.67-31.5-72.84-31.5-127.18-85.83Q143-251.67 111.5-324.56T80-480.33q0-82.88 31.5-155.78Q143-709 197.33-763q54.34-54 127.23-85.5T480.33-880q82.88 0 155.78 31.5Q709-817 763-763t85.5 127Q880-563 880-480.18q0 82.83-31.5 155.67Q817-251.67 763-197.46q-54 54.21-127 85.84Q563-80 480.18-80Zm.15-66.67q139 0 236-97.33t97-236.33q0-139-96.87-236-96.88-97-236.46-97-138.67 0-236 96.87-97.33 96.88-97.33 236.46 0 138.67 97.33 236 97.33 97.33 236.33 97.33ZM480-480Z"/></svg>`
    taskEditButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M186.67-120q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840h389L509-773.33H186.67v586.66h586.66v-324.66L840-578v391.33q0 27-19.83 46.84Q800.33-120 773.33-120H186.67ZM480-480ZM360-360v-170l377-377q10-10 22.33-14.67 12.34-4.66 24.67-4.66 12.67 0 25.04 5 12.38 5 22.63 15l74 75q9.4 9.97 14.53 22.02 5.13 12.05 5.13 24.51 0 12.47-4.83 24.97-4.83 12.5-14.83 22.5L530-360H360Zm499-424.67-74.67-74.66L859-784.67Zm-432.33 358H502l246-246L710-710l-38.33-37.33-245 244.33v76.33ZM710-710l-38.33-37.33L710-710l38 37.33L710-710Z"/></svg>`

    removeTaskButton.addEventListener('click', (e) => {
        removeTaskFromProject(e)
    })    

    moreDetailsButton.addEventListener('click', (e) => {
        showTaskDetailsPopUp(e)
    })

    taskEditButton.addEventListener('click', (e) => {
        showTaskEditForm(e)
    })

    taskPreview.setAttribute('data-task-id', task.id)
    addClass(taskPreview, getPriorityClass(task.priority))

    append(taskControlButton, moreDetailsButton)
    append(taskControlButton, taskEditButton)
    append(taskControlButton, removeTaskButton)
    
    append(taskPreview, taskName)
    append(taskPreview, taskControlButton)

    return taskPreview

}

function updateTaskLists(tasks){
    const taskLists = select('.project-preview-lists')
    clearContent(taskLists)

    tasks.forEach(task => {
        const taskPreview = createTaskPreview(task)

        append(taskLists, taskPreview)
    })

}

function createOverlay(){
    const content = select('.content')
    const overlay = createElementWithClasses('div', 'overlay')
    addClass(overlay, 'hide')
    
    overlay.addEventListener('click', (e) =>{
        e.preventDefault()
        const popUp = select('.task-details-pop-up')
        const editForm = select('.edit-project-task-form')
        hide(overlay)
        hide(popUp)
        hide(editForm)
    })

    append(content, overlay)
}

function createTaskDetailsPopUp(){
    const content = select('.content')
    const popUp = createElementWithClasses('div', 'task-details-pop-up')
    addClass(popUp, 'hide')
    const taskNameBox = createElementWithClasses('div', 'task-name-box')
    const taskNameTitle = create('h2')
    setText(taskNameTitle, 'Task Name')
    const taskName = createElementWithClasses('span', 'task-name-popup')

    const taskDueDateBox = createElementWithClasses('div', 'task-duedate-box')
    const taskDueDateTitle = create('h2')
    setText(taskDueDateTitle, 'DueDate')
    const taskDueDate = createElementWithClasses('span', 'task-duedate')
    
    const taskDetailsBox = createElementWithClasses('div', 'task-details-box' )
    const taskDetailsTitle = create('h2')
    setText(taskDetailsTitle, 'Details')
    const taskDetails = createElementWithClasses('span', 'task-details')

    const isCompleteButton = createElementWithClasses('button', 'is-task-complete-btn')
    isCompleteButton.addEventListener('click', (e) => {
        const taskElement = e.currentTarget.parentElement.firstChild.lastElementChild
        const taskId = taskElement.getAttribute('data-task-id');

        Task.toggleComplete(taskId)
        setTaskDetailsPopUp(Task.getTaskById(taskId))
    })


    append(taskNameBox, taskNameTitle)
    append(taskNameBox, taskName)

    append(taskDueDateBox, taskDueDateTitle)
    append(taskDueDateBox, taskDueDate)

    append(taskDetailsBox, taskDetailsTitle)
    append(taskDetailsBox, taskDetails)



    append(popUp, taskNameBox)
    append(popUp, taskDueDateBox)
    append(popUp, taskDetailsBox)
    append(popUp, isCompleteButton)

    append(content, popUp)

}


function setTaskDetailsPopUp(task){
    
    clearTaskDetailsPopUp()

    const taskName = select('.task-name-popup')
    taskName.setAttribute('data-task-id', task.id)
    const dueDate = select('.task-duedate')
    const taskDetails = select('.task-details')
    const isCompleteButton = select('.is-task-complete-btn')

    const date = new Date(task.duedate);

    // Use `toLocaleDateString` for a readable format
    const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    });

    setText(taskName, task.name)
    setText(dueDate, formattedDate)
    setText(taskDetails, task.details)
    if(task.isComplete){
        addClass(isCompleteButton, 'completed')
        setText(isCompleteButton, 'Completed')
    } else {
        isCompleteButton.classList.remove('completed')
        setText(isCompleteButton, 'Not Completed')
    }
}

function clearTaskDetailsPopUp(){
    const taskName = select('.task-name-popup')
    const dueDate = select('.task-duedate')
    const taskDetails = select('.task-details')


    taskName.textContent = ''
    dueDate.textContent = ''
    taskDetails.textContent = ''
}

function getPriorityClass(priority){
    if (priority == 1) return 'priority-low'
    if (priority == 2) return 'priority-med'
    if (priority == 3) return 'priority-high'
}

function createTaskEditForm(){
    const content = select('.content')
    const form = createElementWithClasses('form', 'edit-project-task-form')
    //addClass(form, 'hide')

    const inputTaskName = create('input')
    inputTaskName.setAttribute('type', 'text')
    inputTaskName.setAttribute('id', 'editName')
    inputTaskName.setAttribute('placeholder', 'Name')
    inputTaskName.setAttribute('required', 'true')  
    //inputTaskName.value = task.name  

    const inputDueDate = create('input')
    inputDueDate.setAttribute('type', 'date')
    inputDueDate.setAttribute('name', 'dueDate')
    inputDueDate.setAttribute('id', 'editDueDate')
    inputDueDate.setAttribute('required', 'ture')
    //inputDueDate.value = task.duedate

    const inputLabel = createElementWithClasses('label', 'priority-label')
    inputLabel.setAttribute('for', 'priority')
    setText(inputLabel, 'Set Priority (Lowest to Highest)')
    const inputPriority = create('input')
    inputPriority.setAttribute('name', 'priority')
    inputPriority.setAttribute('required', 'true')
    inputPriority.setAttribute('type', 'range')
    inputPriority.setAttribute('id', 'editPriority')
    inputPriority.setAttribute('max', '3')
    inputPriority.setAttribute('min', '1')
    inputPriority.setAttribute('value', '1')
    inputPriority.setAttribute('style', 'width: 200px;')
    //inputPriority.value = task.priority


    const inputDetails = create('textarea')
    inputDetails.setAttribute('name', 'details')
    inputDetails.setAttribute('placeholder', 'Task Details')
    inputDetails.setAttribute('id', 'editDetails')
    //inputDetails.value = task.details

    const taskControlButton = createElementWithClasses('div', 'edit-task-control-btn')

    const taskEditButton = createElementWithClasses('button', 'edit-task-submit')
    taskEditButton.setAttribute('type', 'submit')
    setText(taskEditButton, 'Edit')

    const cancelTaskButton = createElementWithClasses('button', 'cancel-task-btn')
    cancelTaskButton.setAttribute('type', 'button')
    cancelTaskButton.addEventListener('click', (e) => {
        e.preventDefault()
        const editTaskForm = select('.edit-project-task-form')
        hide(editTaskForm)
        editTaskForm.reset()
    })
    setText(cancelTaskButton, 'Cancel')

    append(taskControlButton, taskEditButton)
    append(taskControlButton, cancelTaskButton)

    append(form, inputTaskName)
    append(form, inputDueDate)
    append(form, inputDetails)
    append(form, inputLabel)
    append(form, inputPriority)
    append(form, taskControlButton)

    form.addEventListener('submit', (e) => {
        const editTaskForm = e.target
        handleTaskEdit(e)
        hide(editTaskForm)
        editTaskForm.reset()
    })

    append(content, form)
    
}

function setTaskEditForm(task){
    const form = select('.edit-project-task-form')
    form.setAttribute('data-task-id', task.id)
    const taskName = select('#editName')
    const taskDueDate = select('#editDueDate')
    const taskDetails = select('#editDetails')
    const taskPriority = select('#editPriority')

    const dateString = task.duedate;
    const date = new Date(dateString);
    
    // Format to YYYY-MM-DD
    const formattedDate = format(date, 'yyyy-MM-dd');
    taskName.value = task.name
    taskDueDate.value = formattedDate
    taskDetails.value = task.details
    taskPriority.value = task.priority
}

function showTaskEditForm(e){
    e.preventDefault()
    const overlay = select('.overlay')
    const taskElement = e.currentTarget.parentElement.parentElement
    const taskId = taskElement.getAttribute('data-task-id');
    
    const form = select('.edit-project-task-form')
    show(form)
    show(overlay)
    const task = Task.getTaskById(taskId)
    console.log(task);
    
    setTaskEditForm(task)
}

export { createTaskEditForm, createPreview, createProjectPreview, updateTaskLists, createGeneralTasks, createOverlay, createTaskDetailsPopUp }
