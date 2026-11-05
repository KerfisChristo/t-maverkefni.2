
const tasks = [
    { id: 1, title: "Klára HTML verkefni", done: false },
    { id: 2, title: "Æfa CSS", done: true },
    { id: 3, title: "Læra JavaScript", done: false }
];

let currentFilter = "all";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

// Birta verkefnin
function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.done);
    } else if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.done);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";

        if (task.done) {
            li.classList.add("completed");
        }

        const label = document.createElement("label");
        label.className = "task-label";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.done;

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
        });

        const span = document.createElement("span");
        span.className = "task-title";
        span.textContent = task.title;

        label.appendChild(checkbox);
        label.appendChild(span);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eyða";
        deleteButton.className = "delete-btn";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        li.appendChild(label);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });

    emptyMessage.hidden = filteredTasks.length !== 0;

    updateStats();
}

// Uppfæra tölfræði
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.done).length;
    const remaining = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("remainingTasks").textContent = remaining;
}

// Bæta við nýju verkefni
function addTask(title) {
    const newTask = {
        id: Date.now() + Math.random(),
        title: title,
        done: false
    };

    tasks.push(newTask);
    renderTasks();
}

// Merkja verkefni sem lokið eða ólokið
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);

    if (task) {
        task.done = !task.done;
    }

    renderTasks();
}

// Eyða verkefni
function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);

    if (index !== -1) {
        tasks.splice(index, 1);
    }

    renderTasks();
}

// Form event listener
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = taskInput.value.trim();

    if (title === "") {
        alert("Vinsamlegast skrifaðu verkefni!");
        return;
    }

    addTask(title);
    taskInput.value = "";
    taskInput.focus();
});

// Síur
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", function() {
        currentFilter = button.dataset.filter;

        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        renderTasks();
    });
});

// Birta upphafsverkefni þegar síðan opnast
renderTasks();
