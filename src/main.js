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
  let todo_list = "";
  todos.forEach(function (todo, index, array) {
    //   console.log(todo, index);

    todo_list += `<li>
                    <input type="checkbox" class="peer mr-2" ${
                      todo.is_done ? "checked" : ""
                    } />
                    <span class="peer-checked:line-through peer-checked:text-gray-600">${
                      todo.text
                    }</span>
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
