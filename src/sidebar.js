import { filter, todos } from "./main";
import { getDate } from "./utils";

// dynamic sidebar
const sidebar = document.getElementById("sidebar");
const menus = [
  {
    name: "Today",
    value: "today",
    icon: `<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-5 inline-block pointer-events-none"
            >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
            </svg>`,
  },
  {
    name: "Planned",
    value: "planned",
    icon: `<svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 inline-block pointer-events-none"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>`,
  },
  {
    name: "Important",
    value: "important",
    icon: `<svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 inline-block pointer-events-none"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>`,
  },
  {
    name: "All Tasks",
    value: "all",
    icon: `<svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 inline-block pointer-events-none"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                />
              </svg>`,
  },
  {
    name: "Completed",
    value: "completed",
    icon: `<svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 inline-block pointer-events-none"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
                  clip-rule="evenodd"
                />
              </svg>`,
  },
];

function countTodos(filter = "all") {
  const filtered_todos = todos.filter((todo) => {
    if (filter == "all") {
      return true;
    } else if (filter == "today") {
      const current_date = getDate(new Date());
      const todo_due_date = getDate(todo.due_date);

      return current_date === todo_due_date;
    } else if (filter == "planned") {
      return todo.due_date;
    } else if (filter == "important") {
      return todo.is_important;
    } else if (filter == "completed") {
      return todo.is_done;
    }
  });

  return filtered_todos.length;
}

export function renderSidebar() {
  let sidebar_list = "";

  menus.forEach(function (menu, index, array) {
    const li = `<li sidebar-item data-filter="${
      menu.value
    }" class="bg-stone-200 flex items-center justify-between gap-2 rounded p-2 select-none ${
      filter === menu.value ? "active" : ""
    }">
        <span class="inline-flex items-center gap-2 pointer-events-none">${
          menu.icon
        }${menu.name}</span>
        <span class="count px-3.5 py-1 bg-gray-100 rounded text-xs pointer-events-none">${countTodos(
          menu.value
        )}</span>
    </li>`;

    sidebar_list += li;
  });

  sidebar.innerHTML = sidebar_list;
}
