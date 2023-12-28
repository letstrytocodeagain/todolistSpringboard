const addNewTask = document.querySelector("form");
const todoList = document.querySelector("#list");
const input = document.querySelector("#NewTask");
const clearBTN = document.querySelector('#clearButton');
let text = "";

toggleButtonVisibility();

addNewTask.addEventListener("submit", function(e){
    e.preventDefault();

    let newTask = document.createElement("li");
    let doneCB= document.createElement("input");
    text = document.createElement("span");
    console.log(input.value);
    text.textContent = input.value;
    doneCB.type = 'checkbox';

    let removeBTN = document.createElement("button");
    removeBTN.innerText = "Delete";

    newTask.appendChild(doneCB);
    newTask.appendChild(text);
    newTask.appendChild(removeBTN);

    input.value = "";
    todoList.appendChild(newTask);
    toggleButtonVisibility();
    updateLocalStorage();
    
})

todoList.addEventListener("click", function(e){
    if(e.target.tagName === "INPUT"){
        let textElement = e.target.nextSibling;
        textElement.classList.toggle("strikeText");
        
    }else if(e.target.tagName === "BUTTON"){
        e.target.parentNode.remove();
        toggleButtonVisibility();
        updateLocalStorage();
    }


})

clearBTN.addEventListener('click', function() {
    document.getElementById('list').innerHTML = '';
    toggleButtonVisibility();
    updateLocalStorage();
  });

function toggleButtonVisibility() {
    if (todoList.children.length === 0) {
      clearBTN.classList.add('hidden');
    } else {
      clearBTN.classList.remove('hidden');
    }
  }

//SAVE TO LOCALSTORAGE FUNCTIONS:

  function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll("#list li span").forEach(span => {
        tasks.push(span.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        const newTask = document.createElement("li");
        const doneCB = document.createElement("input");
        doneCB.type = 'checkbox';
        
        const text = document.createElement("span");
        text.textContent = taskText;

        const removeBTN = document.createElement("button");
        removeBTN.innerText = "Delete";

        newTask.appendChild(doneCB);
        newTask.appendChild(text);
        newTask.appendChild(removeBTN);

        todoList.appendChild(newTask);
    });
    toggleButtonVisibility();
}


document.addEventListener('DOMContentLoaded', loadTasks);

