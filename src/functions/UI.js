import {select, createElementWithClasses, append} from './domHelpers.js'

function createContent(){
    const body = select('body')
    const content = createElementWithClasses('div', 'content')
    append(body, content)
}



export{createContent}