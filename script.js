const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const toDoList = document.getElementById('toDoList');

let editTodo = null;

//function to add to do
const addToDo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must write something in your to do");
        return;
    }

    if (addBtn.value === "Edit") {
        editTodo.target.previousElementSibling.innerHTML = inputText;
        editLocalTodos(inputText);
        addBtn.value = "Add";
        inputBox.value = "";
        return;
    }

    //creating li tag
    const li = document.createElement("li");
    //creating p tag
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    //creating Edit button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("editBtn", "btn");
    li.appendChild(editBtn);

    //creating Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("deleteBtn", "btn");
    li.appendChild(deleteBtn);

    toDoList.appendChild(li);
    inputBox.value = "";
    saveLocalTodos(inputText);
}

//function to update : (Edit/Delete) to do
const updateTOdo = (e) => {
    if (e.target.innerHTML === "Remove") {
        toDoList.removeChild(e.target.parentElement);
        deleteLocaltodos(e.target.parentElement);
    }

    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
}

//function to save local to do
const saveLocalTodos = (todo) => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//function to get local to do
const getLocaltodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            //creating li tag
            const li = document.createElement("li");
            //creating p tag
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);

            //creating Edit button
            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("editBtn", "btn");
            li.appendChild(editBtn);

            //creating Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("deleteBtn", "btn");
            li.appendChild(deleteBtn);

            toDoList.appendChild(li);
        });
    }
}

//function to delete local to do
const deleteLocaltodos = (todo)=> {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos))
}

const editLocalTodos = (todo)=> {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocaltodos);
addBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', updateTOdo);
