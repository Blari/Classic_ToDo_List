const tasks = [
    {
        _id: "5d2ca9e2e03d40b326596aa7",
        completed: true,
        body:
            "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
        title: "Eu ea incididunt sunt consectetur fugiat non."
    },
    {
        _id: "5d2ca9e29c8a94095c1288e0",
        completed: false,
        body:
            "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
        title:
            "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
    },
    {
        _id: "5d2ca9e2e03d40b3232496aa7",
        completed: true,
        body:
            "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
        title: "Eu ea incididunt sunt consectetur fugiat non."
    },
    {
        _id: "5d2ca9e29c8a94095564788e0",
        completed: false,
        body:
            "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
        title:
            "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
    }
];

(function(arrOfTasks) {
    const objectOfTasks = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;
    }, {});

    //Elements UI
    const listConteiner = document.querySelector(
        ".task-list-section .list-group"
    );
    const form = document.forms["addTask"];
    const inputTitle = form.elements["title"];
    const inputBody = form.elements["body"];

    renderAllTasks(objectOfTasks);
    form.addEventListener("submit", onFormSubmitHendler);
    listConteiner.addEventListener("click", onDeletehandler);

    function renderAllTasks(tasksList) {
        if (!tasksList) {
            console.error("Передайте список задач");
            return;
        }

        const fragment = document.createDocumentFragment();
        Object.values(tasksList).forEach(task => {
            const li = listItemTemplate(task);
            fragment.appendChild(li);
        });
        listConteiner.appendChild(fragment);
    }

    function listItemTemplate({ _id, title, body } = {}) {
        const li = document.createElement("li");
        li.classList.add(
            "list-group-item",
            "d-flex",
            "align-items-center",
            "flex-wrap",
            "mt-2"
        );

        li.setAttribute("data-task-id", _id);

        const span = document.createElement("span");
        span.textContent = title;
        span.style.fontWeight = "bold";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete task";
        deleteBtn.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");

        const article = document.createElement("p");
        article.textContent = body;
        article.classList.add("mt-2", "w-100");
        li.appendChild(span);
        li.appendChild(deleteBtn);
        li.appendChild(article);

        return li;
    }

    function onFormSubmitHendler(e) {
        e.preventDefault();
        const titleValue = inputTitle.value;
        const bodyValue = inputBody.value;

        if (!titleValue || !bodyValue) {
            alert("Пожалуйста введите заголовок и тело сообщения");
            return;
        }
        const task = createNewTask(titleValue, bodyValue);
        const listItem = listItemTemplate(task);
        listConteiner.insertAdjacentElement("afterbegin", listItem);
        form.reset();
    }
    function createNewTask(title, body) {
        const newTask = {
            title,
            body,
            completed: false,
            _id: `task-${Math.random()}`
        };

        objectOfTasks[newTask._id] = newTask;
        return { ...newTask };
    }

    function deleteTask(id) {
        const { title } = objectOfTasks[id];
        const isConfirm = confirm(`Удаляем задачу ${title}?`);
        if (!isConfirm) return isConfirm;
        delete objectOfTasks[id];
        return isConfirm;
    }

    function deleteTaskFromHtml(confirmed, el) {
        if (!confirmed) return;
        el.remove();
    }

    function onDeletehandler({ target }) {
        if (target.classList.contains("delete-btn")) {
            const parent = target.closest("[data-task-id]");
            const id = parent.dataset.taskId;
            const confirmed = deleteTask(id);
            deleteTaskFromHtml(confirmed, parent);
        }
    }
})(tasks);
