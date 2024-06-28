let users = [];
let currentUser = null;
let tasks = [];

function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        users.push({ username, password });
        alert('Signup successful! Please login.');
    } else {
        alert('Please enter both username and password.');
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        currentUser = user;
        document.getElementById('auth').style.display = 'none';
        document.getElementById('nav').style.display = 'block';
        document.getElementById('AppName').style.display= 'none';
        showProfile();
        updateWelcomeMessage(username);
        alert('Login successful!');
    } else {
        alert('Invalid username or password.');
    }
}
function updateWelcomeMessage(username) {
    const welcomeLabel = document.querySelector('.welcome');
    if (username) {
        welcomeLabel.textContent = 'Welcome, ' +`${username}`;
    } else {
        welcomeLabel.textContent = 'Welcome';
    }
}


function showProfile() {
    document.getElementById('profile').style.display = 'block';
    document.getElementById('todo').style.display = 'none';
}

function showTodo() {
    document.getElementById('profile').style.display = 'none';
    document.getElementById('todo').style.display = 'block';
}

function editProfile() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    if (newUsername) currentUser.username = newUsername;
    if (newPassword) currentUser.password = newPassword;
    alert('Profile updated!');
}

function resetPassword() {
    const newPassword = document.getElementById('newPassword').value;
    if (newPassword) {
        currentUser.password = newPassword;
        alert('Password reset successful!');
    } else {
        alert('Please enter a new password.');
    }
}

function addTask() {
    const taskInput = document.getElementById('taskInput').value;
    const taskDate = document.getElementById('taskDate').value;
    const taskTime = document.getElementById('taskTime').value;
    if (taskInput && taskDate && taskTime) {
        const task = { description: taskInput, date: taskDate, time: taskTime, status: 'To Do' };
        tasks.push(task);
        renderTasks();
        document.getElementById('taskInput').value = '';
        document.getElementById('taskDate').value = '';
        document.getElementById('taskTime').value = '';
    } else {
        alert('Please enter all task details.');
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task-content">
                <div class="task-header">
                    <b>${task.description}</b>
                    <div class="top-right-div">
                        <select onchange="changeStatus(${index}, this)">
                            <option ${task.status === 'To Do' ? 'selected' : ''}>To Do</option>
                            <option ${task.status === 'Urgent' ? 'selected' : ''}>Urgent</option>
                            <option ${task.status === 'Done' ? 'selected' : ''}>Done</option>
                        </select>
                    </div>
                </div>
                <div class="task-datetime">
                    <div>Date: ${task.date}</div>
                    <div>Time: ${task.time}</div>
                </div>
            </div>
        `;
        const select = li.querySelector('select');
        updateSelectColor(select, task.status);
        taskList.appendChild(li);
    });
}



function changeStatus(index, selectElement) {
    const status = selectElement.value;
    tasks[index].status = status;
    updateSelectColor(selectElement, status);
}

function updateSelectColor(selectElement, status) {
    switch (status) {
        case 'To Do':
            selectElement.style.backgroundColor = 'white';
            selectElement.style.color = 'black';
            break;
        case 'Urgent':
            selectElement.style.backgroundColor = 'red';
            selectElement.style.color = 'white';
            break;
        case 'Done':
            selectElement.style.backgroundColor = 'green';
            selectElement.style.color = 'white';
            break;
        default:
            selectElement.style.backgroundColor = 'white';
            selectElement.style.color = 'black';
    }
}