function create(element){
    return document.createElement(element)
}

function select(element){
    return document.querySelector(element)
}

function addText(element, text){
    element.textContent += text
}


function setText(element, text){
    element.textContent = text
}

function append(parent, child){
    parent.appendChild(child)
}

function clearContent(element){
    element.innerHTML = ''
}

function createElementWithClasses(element, classes = []) {
    const el = create(element);
    el.classList.add(...classes);
    return el;
}

function addEvent(element, event, callback) {
    element.addEventListener(event, callback);
}


function addClass(element, className) {
    element.classList.add(className);
}



export { 
    create, 
    select, 
    addText, 
    append, 
    setText, 
    clearContent,  
    createElementWithClasses, 
    addEvent,
    addClass
}