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
    toggleButtonVisibility()
    
})

todoList.addEventListener("click", function(e){
    if(e.target.tagName === "INPUT"){
        let textElement = e.target.nextSibling;
        textElement.classList.toggle("strikeText");
        
    }else if(e.target.tagName === "BUTTON"){
        e.target.parentNode.remove();
        toggleButtonVisibility()
    }


})

clearBTN.addEventListener('click', function() {
    document.getElementById('list').innerHTML = '';
    toggleButtonVisibility();
  });

function toggleButtonVisibility() {
    if (todoList.children.length === 0) {
      clearBTN.classList.add('hidden');
    } else {
      clearBTN.classList.remove('hidden');
    }
  }

 

