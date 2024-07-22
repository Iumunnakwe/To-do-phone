const addButton = document.getElementById('addTasks');
const clearButton = document.getElementById('clearTasks');
const itemInput = document.getElementById('Tasks');
const taskList = document.getElementById('taskList');

// Function to load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach(task => {
        const listItem = createTaskElement(task.text, task.completed);
        taskList.appendChild(listItem);
    });
}

// Function to save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create a new task element
function createTaskElement(taskText, completed = false) {
    const listItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', function() {
        const isChecked = this.checked;
        if (isChecked) {
            label.classList.add('strikethrough');
        } else {
            label.classList.remove('strikethrough');
        }
        updateTaskStatus(taskText, isChecked);
    });

    const label = document.createElement('span');
    label.textContent = taskText;
    if (completed) {
        label.classList.add('strikethrough');
    }

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = '';
    editButton.addEventListener('click', () => {
        const newText = prompt('Edit your task:', taskText);
        if (newText) {
            label.textContent = newText;
            updateTaskText(taskText, newText);
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = '';
    deleteButton.addEventListener('click', () => {
        listItem.remove();
        removeTask(taskText);
    });

    

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

// Function to add a new task
function addTask(taskText, completed = false) {
    const listItem = createTaskElement(taskText, completed);
    taskList.appendChild(listItem);
    const tasks = getTasksFromLocalStorage();
    tasks.push({ text: taskText, completed });
    saveTasks(tasks);
}

// Function to remove a task
function removeTask(taskText) {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    saveTasks(updatedTasks);
}

// Function to update task completion status
function updateTaskStatus(taskText, completed) {
    const tasks = getTasksFromLocalStorage();
    const taskToUpdate = tasks.find(task => task.text === taskText);
    if (taskToUpdate) {
        taskToUpdate.completed = completed;
        saveTasks(tasks);
    }
}

// Function to update task text
function updateTaskText(oldText, newText) {
    const tasks = getTasksFromLocalStorage();
    const taskToUpdate = tasks.find(task => task.text === oldText);
    if (taskToUpdate) {
        taskToUpdate.text = newText;
        saveTasks(tasks);
    }
}

// Function to clear all tasks
function clearTasks() {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
}

// Function to get tasks from localStorage
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Load tasks on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// Add button click event
addButton.addEventListener('click', () => {
    const newItemText = itemInput.value.trim();
    if (newItemText) {
        addTask(newItemText);
        itemInput.value = '';
    } else {
        alert('Please enter a task');
    }
});

// Clear button click event
clearButton.addEventListener('click', () => {
    clearTasks();
});



