const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todolist = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){
    form.addEventListener("submit" , addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodostoUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e){



}


function filterTodos(e){
    
    const filterValue = e.target.value.toLowerCase();

    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style", "display : none !important")
        }
        
        else{
            listItem.setAttribute("style", "display : block")
        }



        
    })


}




function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
       e.target.parentElement.parentElement.remove(); 
       deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
       showAlert("success", "ToDo muveffeqiyyetle silindi");
    }

}

function deleteTodoFromStorage(deletetodo){
    let todos = getToDosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);
        }

    })

    localStorage.setItem("todos", JSON.stringify(todos));

}



function loadAllTodostoUI(){
    let todos = getToDosFromStorage();

    todos.forEach(function(todo){
        addToDotoUI(todo);
    })
}


function addTodo(e){
    const newTodo = todoInput.value.trim();
    
    if(newTodo === ""){
        showAlert("danger", "Zehmet olmasa todo daxil edin");
        
    }
    
    else{
        addToDotoUI(newTodo);
        
        addToDotoStorage(newTodo);

        showAlert("success", "ToDo muveffeqiyyetle elave olundu");
    }



    e.preventDefault();
}





function getToDosFromStorage(){
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }

    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;

}



function addToDotoStorage(newTodo){

    let todos = getToDosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));



}
function showAlert(type , message){

    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);

    setTimeout(function(){
        alert.remove();

    },1000);


}


function addToDotoUI(newTodo){
    const listItem = document.createElement("li");

    const link = document.createElement("a");

    link.href = "#";

    link.className = "delete-item";

    link.innerHTML = "<i class='fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    listItem.appendChild(document.createTextNode(newTodo));
    
    listItem.appendChild(link);
    
    todolist.appendChild(listItem);

    todoInput.value = "";
}

