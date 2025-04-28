const todos = [
  {
    text: "And I'd like to take a minute just sit right there",
    is_done: true,
  },
  {
    text: "I'll tell you how I became the prince of a town called Bel-Air",
    is_done: false,
  },
  {
    text: "Now this is a story all about how, my life got flipped-turned upside down",
    is_done: false,
  },
  {
    text: "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia",
    is_done: true,
  },
  {
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
    is_done: false,
  },
];

const todoList = document.getElementById("todo-list");
const addTodoForm = document.getElementById("addTodoForm");
const todoTextInput = document.getElementById("todo-text-input");
const todoIndexInput = document.getElementById("todo-index-input");
const addTodoBtn = document.getElementById("add-todo-btn");
const editTodoBtn = document.getElementById("edit-todo-btn");

// render todos {read}
function renderTodolist() {
  // console.log(todos);

  let todo_list = "";
  todos.forEach(function (todo, index, array) {
    todo_list += `<li data-index=${index} class="bg-gray-50 min-h-[50px] flex items-center py-2 gap-2 px-3.5 rounded shadow group">
                    <input type="checkbox" id="todo-checkbox-${index}" class="todo-checkbox peer flex-none" ${
      todo.is_done ? "checked" : ""
    } />
                    <label for="todo-checkbox-${index}" class="peer-checked:line-through peer-checked:text-gray-600 grow select-none">
                      ${todo.text}
                    </label>

                    <!-- actions -->
                    <div class="flex-none hidden group-hover:flex items-center justify-center gap-2">
                      <!-- edit button -->
                      <button type="button" class="todo-edit-btn hover:bg-yellow-500 hover:text-gray-100 hover:shadow-lg rounded-full text-sm p-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline-block select-none pointer-events-none">
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                      </button>
                      
                      <!-- delete button -->
                      <button type="button" class="todo-delete-btn hover:bg-red-500 hover:text-gray-100 hover:shadow-lg rounded-full text-sm p-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline-block select-none pointer-events-none">
                          <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                </li>`;
  });
  todoList.innerHTML = todo_list;
}

// add new todo || edit todo {create | edit}
addTodoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const todo_index = todoIndexInput.value;
  const todo_text = todoTextInput.value;

  if (todo_index) {
    // edit
    todos[todo_index].text = todo_text;
  } else {
    // create
    todos.push({
      text: todo_text,
      is_done: false,
    });
  }

  renderTodolist();

  // form goes on create state
  todoIndexInput.value = "";
  todoTextInput.value = "";

  toggleSubmitBtns(false);
});

renderTodolist();

todoList.addEventListener("click", function (event) {
  // console.log(event.target);

  // 1. event.target.matches()
  // 2. event.target.querySelector()

  // select only input[checkbox] with "todo-li" class
  if (event.target.matches(`input.todo-checkbox[type="checkbox"]`)) {
    const index = event.target.closest("li").dataset.index;

    todos[index].is_done = event.target.checked;

    renderTodolist();
  }

  // edit
  if (event.target.matches(`button.todo-edit-btn[type="button"]`)) {
    const index = event.target.closest("li").dataset.index;

    const todo = todos[index];

    todoTextInput.value = todo.text;
    todoIndexInput.value = index;

    toggleSubmitBtns(true);
  }

  // delete
  if (event.target.matches(`button.todo-delete-btn[type="button"]`)) {
    const index = event.target.closest("li").dataset.index;

    // console.log(index);

    todos.splice(index, 1);
    // console.log(todos);

    renderTodolist();
  }
});

function toggleSubmitBtns(edit = false) {
  if (edit) {
    addTodoBtn.classList.replace("inline-flex", "hidden");
    editTodoBtn.classList.replace("hidden", "inline-flex");
  } else {
    addTodoBtn.classList.replace("hidden", "inline-flex");
    editTodoBtn.classList.replace("inline-flex", "hidden");
  }
}

document
  .getElementById("completed-nav")
  .addEventListener("click", function (event) {
    const completed_todos = todos.filter((todo) => todo.is_done);

    // console.log(completed_todos);

    let todo_list = "";
    completed_todos.forEach(function (todo, index, array) {
      todo_list += `<li data-index=${index} class="bg-gray-50 min-h-[50px] flex items-center py-2 gap-2 px-3.5 rounded shadow group">
                    <input type="checkbox" id="todo-checkbox-${index}" class="todo-checkbox peer flex-none" ${
                      todo.is_done ? "checked" : ""
                    } />
                    <label for="todo-checkbox-${index}" class="peer-checked:line-through peer-checked:text-gray-600 grow select-none">
                      ${todo.text}
                    </label>

                    <!-- actions -->
                    <div class="flex-none hidden group-hover:flex items-center justify-center gap-2">
                      <!-- delete button -->
                      <button type="button" class="todo-delete-btn hover:bg-red-500 hover:text-gray-100 hover:shadow-lg rounded-full text-sm p-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline-block select-none pointer-events-none">
                          <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                </li>`;
    });
    todoList.innerHTML = todo_list;
  });
