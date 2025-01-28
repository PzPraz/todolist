import {show, hide, create, select, addClass, setText, clearContent, createElementWithClasses, append} from '../functions/domHelpers.js'
import { handleProjectFormSubmit, handleProjectFormCancel } from '../logic/projectFormHandlers'
import { createProjectPreview, createGeneralTasks } from './preview.js'
import { Task } from '../functions/Task.js'

function createSidebar(){
    const content = select('.content')
    const sidebar = createElementWithClasses('aside', 'sidebar')
    
    const projectSidebar = createProjectSidebar()
    const generalTasks = createGeneralTaskSection()
    
    append(sidebar, generalTasks)
    append(sidebar, projectSidebar)
    append(content, sidebar)
}

function createGeneralTaskSection(){
    const generalTasks = createElementWithClasses('div', 'general-tasks');

    const allTasksBox = createTaskBox('Tasks', 'all-tasks', 'All Tasks', () => Task.tasks);
    const todayTasksBox = createTaskBox('Today', 'today-tasks', 'Today', () => Task.getTasksByCategory('today'));
    const weekTasksBox = createTaskBox('This Week', 'week-tasks', 'This Week', () => Task.getTasksByCategory('week'));
    const monthTasksBox = createTaskBox('This Month', 'month-tasks', 'This Month', () => Task.getTasksByCategory('month'));

    append(generalTasks, allTasksBox);
    append(generalTasks, todayTasksBox);
    append(generalTasks, weekTasksBox);
    append(generalTasks, monthTasksBox);

    return generalTasks;
}

function createTaskBox(label, className, title, getTasksCallback) {
    const taskBox = createElementWithClasses('div', className);
    const taskButton = createTaskButton(label, `${className}-button`);

    taskButton.addEventListener('click', (e) => {
        e.preventDefault();
        createGeneralTasks(getTasksCallback(), title);
    });

    append(taskBox, taskButton);
    return taskBox;
}


function createProjectSidebar(){
    const projectSidebar = createElementWithClasses('div', 'project-sidebar')

    const projectHeader = create('h1')
    setText(projectHeader, 'Project')
    addClass(projectHeader, 'project-header')

    const projectLists = createElementWithClasses('div', 'project-lists')

    const addProjectButton = createTaskButton('Add Project', 'add-project')
    addProjectButton.addEventListener('click', (e) => {
        const projectForm = select('#add-project-form')
        show(projectForm)
        hide(e.target)
    })
    
    const addProjectForm = createProjectForm()

    append(projectSidebar, projectHeader)
    append(projectSidebar, projectLists)
    append(projectSidebar, addProjectButton)
    append(projectSidebar, addProjectForm)

    return projectSidebar

}



function createTaskButton(text, className){
    const button = createElementWithClasses('button', className)
    addClass(button, 'task-btn')
    setText(button, text)
    return button
}


function createProjectForm(){
    const projectForm = createElementWithClasses('form', 'hide')
    projectForm.setAttribute("id", "add-project-form");
    

    const inputProjectName = create('input')
    inputProjectName.setAttribute("id", "add-project-name");
    inputProjectName.setAttribute('required', 'true')
    inputProjectName.setAttribute('type', 'text')
    inputProjectName.setAttribute('placeholder', 'Project name')

    const projectControl = createElementWithClasses('div','btn-control')
    const submitProjectButton = createElementWithClasses('button', 'submit-project-btn')
    submitProjectButton.setAttribute('type', 'submit')
    setText(submitProjectButton, 'Add')


    const cancelProjectButton = createElementWithClasses('button', 'cancel-btn')
    cancelProjectButton.setAttribute('type', 'button')
    cancelProjectButton.addEventListener('click', (e) => {
        handleProjectFormCancel(e)
    })
    setText(cancelProjectButton, 'Cancel')

    append(projectControl, submitProjectButton)
    append(projectControl, cancelProjectButton)

    append(projectForm, inputProjectName)
    append(projectForm, projectControl)

    projectForm.addEventListener('submit', (e) => {
        handleProjectFormSubmit(e)
    })

    return projectForm

}

function removeProject(e){
    const projectName = e.currentTarget.parentElement.firstChild.textContent
    Task.removeProject(projectName)
    const jsonData = Task.saveToJson()
    localStorage.setItem('taskManagerData', jsonData)
    updateProjectLists()
}

function setProjectPreview(e){
    e.preventDefault()    
    const projectName = e.target.textContent
    const project = Task.findProject(projectName)
    createProjectPreview(project)
}

function createProjectNav(project){
    const projectBox = createElementWithClasses('div', 'project-element')
    const navProjectButton = createElementWithClasses('button', 'project-btn')
    const removeProjectButton = createElementWithClasses('button', 'remove-project-btn')

    setText(navProjectButton, project.name)
    removeProjectButton.innerHTML =  `<svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z"/></svg>`
    removeProjectButton.addEventListener('click', (e) => {
        removeProject(e)
    })

    append(projectBox, navProjectButton)
    append(projectBox, removeProjectButton)

    navProjectButton.addEventListener('click', (e) => {
        setProjectPreview(e)
    })

    return projectBox

}

function updateProjectLists(){
    const projectLists = select('.project-lists')
    clearContent(projectLists)

    Task.projects.forEach(p => {
        const project = createProjectNav(p)
        append(projectLists, project)
    })
}


export { updateProjectLists, createSidebar }