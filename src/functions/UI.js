import {show, hide, create, select, addClass, setText, clearContent, createElementWithClasses, append} from './domHelpers.js'
import { Task } from './Task'
import { handleProjectFormSubmit, handleProjectFormCancel } from '../logic/projectFormHandlers'

function createContent(){
    const body = select('body')
    const content = createElementWithClasses('div', 'content')

    append(body, content)
}




/* createContent()
createPreview() */

//createProjectPreview({name: 'anjay'})

export{createContent}