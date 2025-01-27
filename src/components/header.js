import { select, setText, createElementWithClasses, append} from '../functions/domHelpers.js'

function createHeader(){
    const body = select('body')
    const header = createElementWithClasses('header', 'header')
    const logo = createElementWithClasses('div', 'logo')
    const pageName = createElementWithClasses('h1', 'page-name')

    logo.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m435.33-250 228-228L618-523.33l-183 183L338.33-437l-45 45 142 142ZM226.67-80q-27 0-46.84-19.83Q160-119.67 160-146.67v-666.66q0-27 19.83-46.84Q199.67-880 226.67-880H574l226 226v507.33q0 27-19.83 46.84Q760.33-80 733.33-80H226.67Zm314-542.67v-190.66h-314v666.66h506.66v-476H540.67Zm-314-190.66v190.66-190.66 666.66-666.66Z"/></svg>`
    setText(pageName, 'Todo List')

    append(header, logo)
    append(header, pageName)
    append(body, header)
}


export { createHeader }