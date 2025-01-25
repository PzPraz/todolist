import './reset.css'
import './styles.css'

import { Task } from "./functions/Task.js";
import {select} from './functions/domHelpers.js'


//only for debugging purposes
window.Task = Task

//

const projectForm = select('#add-project-form')
const addProjectBtn = select('.add-project')

addProjectBtn.addEventListener('click', () => {
    addProjectBtn.classList.add('hide')
    projectForm.classList.add('show')
    projectForm.classList.remove('hide')
})

