const form = document.querySelector('.add');
const ul = document.querySelector('.todos');
let listItems = document.querySelectorAll('li');
const existingTodos = JSON.parse(localStorage.getItem('todos'));

const todos = existingTodos || [];

const search = document.querySelector('.search input');

const filterTodos = term => {
    Array.from(ul.children)
        .filter(todo =>  !todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.add('filtered'));

    Array.from(ul.children)
        .filter(todo =>  todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.remove('filtered'));
}

search.addEventListener('keyup', () => {
    let term = search.value.trim().toLowerCase();
    filterTodos(term);
});

const createNewTodo = newTodo => {
    let li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'text-white');
    let span = document.createElement('span');
    span.innerText = newTodo;
    let icon = document.createElement('i');
    icon.classList.add('far', 'fa-trash-alt', 'delete');
    li.appendChild(span);
    li.appendChild(icon);
    ul.appendChild(li);
}

todos.forEach(todo => {
    createNewTodo(todo);
});

let trashIcons = document.querySelectorAll('.delete');
trashIcons.forEach(addRemoveEvent());

const refreshRemoveEvent = () => {
    trashIcons = document.querySelectorAll('.delete');
    trashIcons.forEach(addRemoveEvent());
}

function addRemoveEvent() {
    return item => {
        item.addEventListener('click', event => {
            event.target.parentElement.remove();
        });
    };
}

form.addEventListener('submit', event => {
    event.preventDefault();
    createNewTodo(form.add.value.trim());

    todos.push(form.add.value.trim());

    form.reset();

    refreshRemoveEvent();
    refreshDuplicateEvent();

    localStorage.setItem('todos', JSON.stringify(todos));
});

function duplicateOnClick() {
    return item => {
        item.addEventListener('click', event => {
            form.add.value = event.target.innerText;
        });
    };
}

function refreshDuplicateEvent() {
    listItems = document.querySelectorAll('li');
    listItems.forEach(duplicateOnClick());
}

refreshDuplicateEvent();
