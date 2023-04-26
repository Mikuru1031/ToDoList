"use strict";
const form = document.querySelector("form");
const input = document.querySelector("input");
const output = document.querySelector("ul");
if (localStorage.getItem("todos")) {
    const todos = JSON.parse(localStorage.getItem("todos") || "{}");
    todos.forEach((todo) => {
        addTodo(todo);
    });
}
form === null || form === void 0 ? void 0 : form.addEventListener("click", (e) => {
    e.preventDefault();
    if (input === null || input === void 0 ? void 0 : input.value) {
        const todo = {
            text: input.value,
            checked: false
        };
        addTodo(todo);
        saveData();
        input.value = "";
    }
});
function addTodo(todo) {
    const li = document.createElement("li");
    li.innerText = todo.text;
    if (todo.checked) {
        li.classList.add("checked");
    }
    output === null || output === void 0 ? void 0 : output.appendChild(li);
    li.addEventListener("click", () => {
        const checked = li.classList.toggle("checked");
        if (checked) {
            todo.checked = true;
        }
        else {
            todo.checked = false;
        }
        saveData();
    });
    li.addEventListener("dblclick", () => {
        const editTodo = window.prompt("編集") || "";
        if (editTodo) {
            li.innerText = editTodo;
            saveData();
        }
    });
    li.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        li.remove();
        saveData();
    });
}
function saveData() {
    const todos = [];
    const liTags = document.querySelectorAll("li");
    liTags.forEach((li) => {
        let checked = false;
        if (li.classList.contains("checked")) {
            checked = true;
        }
        const todo = {
            text: li.innerText,
            checked: checked
        };
        todos.push(todo);
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
