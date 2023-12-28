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
        updateLocalStorage();
        
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
    const tasks = Array.from(todoList.children).map(li => {
        const textElement = li.querySelector('span');
        const checkbox = li.querySelector('input[type="checkbox"]');
        return {
            text: textElement.textContent,
            completed: checkbox.checked
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const newTask = document.createElement("li");

        const doneCB = document.createElement("input");
        doneCB.type = 'checkbox';
        doneCB.checked = task.completed; // Set the checkbox to the stored state

        const text = document.createElement("span");
        text.textContent = task.text;
        if(task.completed) {
            text.classList.add("strikeText"); // Add the strikethrough if the task was completed
        }

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

