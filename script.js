/*This is the js code for the todo app that adds tasks, check them off, and remove them, while saving 
and loading tasks using localStorage*/

const inputBox = document.getElementById("input-box");/*grabs id of "input-box" and stores it in variable inputBox, same in line 2 */
const listContainer = document.getElementById("list-container");//document.getElementById() is used to find the element by id name
const completedContainer = document.getElementById("completed-container")//my issue was typing wrong id and it was not showing the completed task to its appropriate container

function addTask() {//function alert notification, for when user wants to add a new task to the list
    if(inputBox.value == "") {//if user enters nothing, checks if input box is empty
        alert("You must write something!");/*The alert() function sends an alert box */
    }
    else {
        let li = document.createElement("li");//create a list
        li.innerHTML = inputBox.value;//sets the content of list <li> to the text entered by user in input
        listContainer.appendChild(li);//appends the new <li> to the text entered by user
        let span = document.createElement("span");//<span> is created and appended to the <li>
        span.innerHTML = "\u00d7"//the "\u00d7" is the x symbol
        li.appendChild(span);//the delete button is appended to the <li>
    }
    inputBox.value = "";//this line clears the input box after the task is added, so user types new task.
    saveData();//calls the saveData() function to save the updated list of tasks to localStorage().
}

inputBox.addEventListener("keydown", function(e) {//adds task when clicked enter key
    if (e.key === "Enter") {
        addTask();
    }
}, false);
//handles task clicks -and deletion UPDATE: changed event listener to "document" so that it listens to both containers
document.addEventListener("click", function(e) {//adds an event listener to the listContainer element, a user clicks in the container, the code function will execute.
    if(e.target.tagName === "LI") {//e.target means the element was clicked, this checks if the clicked element is a task in <li>.
        e.target.classList.toggle("checked");//if clicked, the line toggles class "checked"

        if (e.target.classList.contains("checked")) {
            completedContainer.appendChild(e.target);//moves to completed taks
        } else {
            listContainer.appendChild(e.target); //moves back if unchecked
        }
        saveData();//calls function to save the updated list to localStorage
    }
    else if(e.target.tagName === "SPAN") {//checks if clcked element is a <span>.The span is the delete button x symbol attached to each task.
        e.target.parentElement.remove();//if the clicked element is a <span>, this removed the entire <li>> element. e.target.parentElement gets the parent <li> element of <span>, and .remove() function removes it from the DOM.
        saveData();
    }
}, false);//closes event listener function specifying false for the useCapture parameter.


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);//stores the HTML content of listContainer in the browser's localStorage under the key "data"; when user reloads page, the tasks can be stored.
    localStorage.setItem("completedTasks", completedContainer.innerHTML);
}

function showTask() {//function is responsible for loading and displaying the saved tasks when the page is loaded.
    listContainer.innerHTML = localStorage.getItem("data");//retrieves the saved tasks that were stored under "data" key from localStorage, sets the innerHTML of listContainer to that saved content and effectively restores task list from last session.
    completedContainer.innerHTML = localStorage.getItem("completedTasks");
}

showTask();//calls function right after defininf it to load and display the tasks that were saved in localStorage when the page loads.

