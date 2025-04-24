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

// render todos {read}
function renderTodolist() {
  // console.log(todos);

  let todo_list = "";
  todos.forEach(function (todo, index, array) {
    todo_list += `<li data-index=${index}>
                    <input type="checkbox" class="todo-checkbox peer mr-2" ${
                      todo.is_done ? "checked" : ""
                    } />
                    <span class="peer-checked:line-through peer-checked:text-gray-600">${
                      todo.text
                    }</span>

                    <button type="button" class="todo-delete-btn duration-300 transform hover:bg-red-500 hover:text-gray-100 hover:shadow-lg rounded-full text-sm mx-2 p-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 inline-block select-none pointer-events-none">
                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                      </svg>
                    </button>
                </li>`;
  });
  todoList.innerHTML = todo_list;
}

// add new toto {create}
addTodoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const new_todo = todoTextInput.value;
  todos.push({
    text: new_todo,
    is_done: false,
  });

  renderTodolist();

  todoTextInput.value = "";
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

  if (event.target.matches(`button.todo-delete-btn[type="button"]`)) {
    const index = event.target.closest("li").dataset.index;

    // console.log(index);

    todos.splice(index, 1);
    // console.log(todos);

    renderTodolist();
  }
});
