import './reset.css'
import './styles.css'

import { Task } from "./functions/Task.js";
import { createGeneralTasks } from './components/preview.js';
import { createHeader } from './components/header.js';
import { createContent } from './functions/UI.js';
import {createSidebar} from './components/sidebar.js'
import { createPreview, createTaskEditForm, updateTaskLists, createOverlay, createTaskDetailsPopUp} from './components/preview.js';
import { updateProjectLists } from './components/sidebar.js';

//only for debugging purposes
window.Task = Task
window.updateTask = updateTaskLists
//

const savedData = localStorage.getItem('taskManagerData'); // Retrieve from local storage or a server
if (savedData) {
    Task.loadFromJson(savedData);
}


createHeader()
createContent()
createSidebar()
createPreview()
createOverlay()
createTaskDetailsPopUp()
createTaskEditForm()
updateProjectLists()

createGeneralTasks('All Tasks')
