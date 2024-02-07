document.addEventListener("DOMContentLoaded", getTodos);

const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');


toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteAndcheck);




// Functions;
function addToDo(event) {
    event.preventDefault();

    // toDo Div;
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo');

    // Create li
    const newToDo = document.createElement('li');

    if (toDoInput.value === '') {
            alert("You must write something!");
        } 
    else {
        
        newToDo.innerText = toDoInput.value;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        // Adding to local storage;
        saveToLocalStorage(toDoInput.value);

        // check btn;
        const checked = document.createElement('button');

        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn');
        toDoDiv.appendChild(checked);

        // delete btn;
        const deleted = document.createElement('button');

        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn');
        toDoDiv.appendChild(deleted);

        // Append list item
        toDoList.appendChild(toDoDiv);

        // Clear the input field
        toDoInput.value = '';
    }

}   


function deleteAndcheck(event){

    const item = event.target;

    // delete
    if(item.classList[0] === 'delete-btn')
    {
        item.parentElement.classList.add("fall");

        //removing local storage todos
        removeFromLocalStorage(item.parentElement);

        item.parentElement.addEventListener('transitionend', ()=>{
            item.parentElement.remove();
        })
    }

    if(item.classList[0] === 'check-btn')
    {
        item.parentElement.classList.toggle("completed");
    }
}



// Save it to local storage:
function saveToLocalStorage(todo){
    
    let todos;
    
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}



function getTodos() {
   
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach((todo)=> {
        // toDo DIV;
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo");

        // Create li
        const newToDo = document.createElement('li');
        
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        // check btn;
        const checked = document.createElement('button');

        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn");
        toDoDiv.appendChild(checked);

        // delete btn;
        const deleted = document.createElement('button');

        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn");
        toDoDiv.appendChild(deleted);

        // Append to list;
        toDoList.appendChild(toDoDiv);
    });
}

//Remove it from Local Storage
function removeFromLocalStorage(todo){
    
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex =  todos.indexOf(todo.children[0].innerText);

    todos.splice(todoIndex, 1);

    // console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}
