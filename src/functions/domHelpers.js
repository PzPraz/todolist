function create(element) {
  return document.createElement(element);
}

function select(element) {
  return document.querySelector(element);
}

function addText(element, text) {
  element.textContent += text;
}

function setText(element, text) {
  element.textContent = text;
}

function append(parent, child) {
  parent.appendChild(child);
}

function clearContent(element) {
  element.innerHTML = "";
}

function createElementWithClasses(element, className) {
  const el = create(element);
  el.classList.add(className);
  return el;
}

function addEvent(element, event, callback) {
  element.addEventListener(event, callback);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function addClass(element, className) {
  element.classList.add(className);
}

function hide(element) {
  addClass(element, "hide");
}

function show(element) {
  removeClass(element, "hide");
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
  addClass,
  show,
  hide,
};
