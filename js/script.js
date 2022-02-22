const taskInputValue = document.querySelector(".todo-task");
const addTaskBtn = document.querySelector(".add-button");
const ulList = document.querySelector(".task-container");
const resetAll = document.querySelector(".reset");
const taskStatus = document.querySelector(".information");

let todos = [];

class Todo {
  constructor(name) {
    this.addTask(name);
  }

  addTask(name) {
    let taskBox = document.createElement("li");
    taskBox.classList.add("task");

    let taskName = document.createElement("input");
    taskName.type = "text";
    taskName.disabled = true;
    taskName.value = name;
    taskName.classList.add("task-name");

    let tools = document.createElement("div");
    tools.classList.add("tools");

    ulList.appendChild(taskBox);
    taskBox.append(taskName, tools);

    let doneBtn = document.createElement("button");
    doneBtn.classList.add("buttonTask", "task-done");
    doneBtn.innerHTML = '<i class="fa fa-check" aria-hidden="true">';
    doneBtn.addEventListener("click", this.taskDone.bind(this));

    let editBtn = document.createElement("button");
    editBtn.classList.add("buttonTask", "edit");
    editBtn.innerHTML = "EDIT";
    editBtn.addEventListener("click", this.taskEdit.bind(this));

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("buttonTask", "delete");
    deleteBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true">';
    deleteBtn.addEventListener("click", this.taskDelete.bind(this));

    tools.appendChild(doneBtn);
    tools.appendChild(editBtn);
    tools.appendChild(deleteBtn);
  }

  taskDone(e) {
    e.preventDefault();
    const task = e.target.closest("li").firstChild;
    task.style.color = "green";
  }

  taskEdit(e) {
    const task = e.target.closest("li");
    const name = task.firstChild.value;
    const editTodo = e.target.parentNode.previousSibling;

    editTodo.disabled = false;
    let input = document.querySelector(".task-name");
    let idx = todos.indexOf(name);

    window.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        if (!editTodo.value) {
          alert("Task can not be empty");
        } else {
          editTodo.disabled = true;
          todos.splice(idx, 1, editTodo.value);
          task.firstChild.style.color = "";
        }
      }
    });
  }

  taskDelete(e) {
    const task = e.target.closest("li");
    const name = task.firstChild.value;
    let idx = todos.indexOf(name);
    todos.splice(idx, 1);
    task.remove();
    if (todos.length === 0) {
      taskStatus.innerHTML = "There is no task written";
    }
  }
}

function addNewTask() {
  if (taskInputValue.value) {
    new Todo(taskInputValue.value);
    todos.push(taskInputValue.value);
    taskInputValue.value = "";
    taskStatus.innerHTML = "";
  } else {
    alert("Task name can not be empty");
  }
}

resetAll.addEventListener("click", function (e) {
  e.preventDefault();
  todos = [];
  ulList.innerHTML = "";
  taskStatus.innerHTML = "There is no task written";
});

addTaskBtn.addEventListener("click", addNewTask);
