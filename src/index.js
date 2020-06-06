// Importing date-fns library for date formatting
import { formatDistanceToNow, format } from 'date-fns'

//Functionality is in place. Work on styling

//Query Selectors
var nav = document.querySelector("#nav");
var content = document.querySelector("#content");

var currentList;

var defaultList = {};
    let todo1 = {
        title: "title1",
        dueDate: "dueDate1",
        priority: "priority1",
        description: "description test"
    };

    let todo2 = {
        title: "title2",
        dueDate: "dueDate2",
        priority: "priority2",
        description: "description test2"
    };

    defaultList['todo1'] = todo1;
    defaultList['todo2'] = todo2;

var projectList = {};
projectList['defaultList'] = defaultList;


const toDoFactory = (title, description, dueDate, priority, project) => {
    console.log(title); 
    return { title, description, dueDate, priority, project };
};

function pushToList(x) {
    //Add the toDo to the appropriate list or default list
    let thisProject = x['project'];
    let projectTitle = x['title'];
    if (projectList.hasOwnProperty(thisProject)) {
        project[projectTitle] = x;
    } else {
        defaultList[projectTitle] = x;
    };
}

//DOM form for user input of new ToDo
function inputNewToDo() {
    var listContainer = this.parentNode;
    let inputRow = document.createElement('tr');

    let titleInput = document.createElement("td");
      titleInput.innerHTML = "<input type='text' id='thisTitle' placeholder='Title of this ToDo'>"
      inputRow.appendChild(titleInput);

      let dueDateInput = document.createElement('td');
      dueDateInput.innerHTML = "<input type='text' id='thisDueDate' placeholder='Due date for this ToDo'>"
      inputRow.appendChild(dueDateInput)

      let priorityInput = document.createElement("td");
      priorityInput.innerHTML = "<input type='text' id='thisPriority' placeholder='High, Medium, or Low priority'>"
      inputRow.appendChild(priorityInput);

      let descriptionInput = document.createElement('td');
      descriptionInput.innerHTML = "<input tye='text' id='thisDescription' placeholder='Brief description or notes for this ToDo'>"
      inputRow.appendChild(descriptionInput);

      let projectInput = document.createElement("td");
      projectInput.innerHTML = "<input type='text' id='thisProject' placeholder='Case Sensitive: Enter an existing project, or this ToDo will be placed in the Default List'>"
      inputRow.appendChild(projectInput);

      let submitBtn = document.createElement("td");
      submitBtn.innerHTML = '<input type="button" value="submit">';
      submitBtn.addEventListener("click", returnNewToDo);
      inputRow.appendChild(submitBtn);

    listContainer.appendChild(inputRow);
}

function returnNewToDo() {
    var thisTitle = document.getElementById("thisTitle").value;
    var thisDescription = document.getElementById("thisDescription").value;
    var thisDueDate = document.getElementById("thisDueDate").value;
    var thisPriority = document.getElementById('thisPriority').value;
    var thisProject = document.getElementById("thisProject").value;

   var thisNewToDo = toDoFactory(thisTitle, thisDescription, thisDueDate, thisPriority, thisProject);
   pushToList(thisNewToDo);
    render(currentList);
}

//Push a new project to the project list
var projectFactory = (x) => {
    let str = x.toString();
    x = {};
    projectList[str] = x;
    navBar();
}

//Name a new project
var newProject = () => {
    let projectName = prompt("What would you like to call your new project?");
    projectFactory(projectName);
};

//DOM Nav bar

var navBar = () => {
    while (nav.firstChild) {
        nav.removeChild(nav.firstChild);
    };
    let bar = document.createElement('tr');
    for (const property in projectList) {
        let a = document.createElement("td");
        let currentList = `${property}`.toString();
        a.innerHTML = currentList;
        a.setAttribute("data-index", currentList);
        a.addEventListener("click", chooseList)
        bar.appendChild(a);
    }

    let projectButton = document.createElement("td");
    projectButton.innerHTML = "<button>Add a new project!</button>";
    projectButton.addEventListener("click", newProject);
    bar.appendChild(projectButton);

    nav.appendChild(bar);
};

function chooseList() {
    currentList = this.dataset.index;
    render(currentList);
    return currentList;
}

//DOM Todo
function render(x) {
    
    content.innerHTML = "";
    let currentListProps = projectList[x];
    let listContainer = document.createElement("div")
    listContainer.setAttribute("data-index", x);

    let newToDoBtn = document.createElement("button");
    newToDoBtn.innerHTML = "Create a ToDo in this project!";
    newToDoBtn.addEventListener("click", inputNewToDo);
    listContainer.appendChild(newToDoBtn);

            for (let prop in currentListProps) {
                if (currentListProps.hasOwnProperty(prop)) {
                    let itemContainer = document.createElement('tr');
                    itemContainer.setAttribute("data-index", prop);
                    itemContainer.addEventListener('click', expandDetails);
                    let thisToDo = currentListProps[prop]

                    for (let key in thisToDo) {
                        if (thisToDo.hasOwnProperty(key)) {

                            if (key == "description") { continue; }

                                let a = document.createElement("td");
                                let keyString = thisToDo[key];
                                a.innerHTML = keyString;
                                a.setAttribute('id', keyString);
                                itemContainer.appendChild(a);

                    }}
                    listContainer.appendChild(itemContainer);
                    content.appendChild(listContainer);
                }}
    return currentList;
};

//Expand Details in Todo

function expandDetails() {
    console.log(this.parentNode);
    var thisListName = this.parentNode.dataset.index;
    console.log(thisListName);
    var ProjToThisList = projectList[thisListName];
    console.log(ProjToThisList);
    var thisToDo = ProjToThisList[this.dataset.index];
    let parentElement = this.childNodes[0];
 

    if (parentElement.querySelector(".expansion") != null) {  
        //delete the expansion
        let expansion = parentElement.querySelector(".expansion");
        expansion.parentNode.removeChild(expansion);
        

    } else { //create the expansion
    let expandList = document.createElement('p');
    expandList.innerHTML = thisToDo['description'];
    console.log(thisToDo);

    expandList.setAttribute("class", "expansion");
    parentElement.appendChild(expandList);
}
}

navBar();