const form = document.querySelector("form");
const input = document.querySelector("input");
const output = document.querySelector("ul");
type Todo = {
  text: string;
  checked: boolean;
}

if(localStorage.getItem("todos")) {
  const todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "{}");
  todos.forEach((todo: Todo) => {
    addTodo(todo);
  })
}

form?.addEventListener("click", (e) => {
  e.preventDefault();
  if(input?.value) {
    const todo: Todo = {
      text: input.value,
      checked: false
    }
    addTodo(todo);
    saveData();
    input.value = "";
  }
})

function addTodo(todo: Todo): void {
  const li = document.createElement("li");
  li.innerText = todo.text;
  if(todo.checked) {
    li.classList.add("checked");
  }
  output?.appendChild(li);

  li.addEventListener("click", () => {
    const checked: boolean = li.classList.toggle("checked");
    if(checked) {
      todo.checked = true;
    } else {
      todo.checked = false;
    }
    saveData();
  })

  li.addEventListener("dblclick", () => {
    const editTodo: string | null = window.prompt("編集") || "";
    if(editTodo) {
      li.innerText = editTodo;
      saveData();
    }
    
  })

  li.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    li.remove();
    saveData();
  })
}

function saveData() {
  const todos: Todo[] = [] ;
  const liTags = document.querySelectorAll("li");
  liTags.forEach((li) => {
    let checked: boolean = false;
    if(li.classList.contains("checked")) {
      checked = true;
    }
    const todo: Todo = {
      text: li.innerText,
      checked: checked
    }
    todos.push(todo);
  })
  localStorage.setItem("todos", JSON.stringify(todos));
}


