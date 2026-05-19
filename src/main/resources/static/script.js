const apiUrl = "http://localhost:8080/tasks";



function goToAddTask(){

    window.location.href = "/addtask.html";
}

function showTasks(){

    window.location.href = "/showtasks.html";
}

function goHome(){

    window.location.href = "/LandingPage.html";
}



async function addTask(){

    const title =
        document.getElementById("title").value;

    const description =
        document.getElementById("description").value;

    if(title.trim() === "" ||
       description.trim() === ""){

        alert("Please fill all fields");

        return;
    }

    const task = {

        title:title,

        description:description,

        completed:false
    };

    await fetch(apiUrl,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(task)
    });

    alert("Task Added Successfully");

    document.getElementById("title").value = "";

    document.getElementById("description").value = "";
}



async function getTasks(){

    const response = await fetch(apiUrl);

    const tasks = await response.json();

    let output = "";

    tasks.forEach(task => {

        output += `

        <div class="task-card">

            <h3>${task.title}</h3>

            <p>${task.description}</p>

            <p>
                Status:
                ${task.completed ? "Completed" : "Pending"}
            </p>

            <button class="delete-btn"
                    onclick="deleteTask(${task.id})">
                    Delete
            </button>

            <button class="update-btn"
                    onclick="updateTask(${task.id},
                    '${task.title}',
                    '${task.description}')">
                    Update
            </button>

            <button onclick="completeTask(${task.id})">
                    Complete
            </button>

        </div>
        `;
    });

    document.getElementById("taskList").innerHTML = output;
}



async function deleteTask(id){

    await fetch(`${apiUrl}/${id}`,{

        method:"DELETE"
    });

    getTasks();
}



async function updateTask(id,oldTitle,oldDescription){

    const newTitle =
        prompt("Update Title", oldTitle);

    const newDescription =
        prompt("Update Description", oldDescription);

    if(newTitle === null ||
       newDescription === null){

        return;
    }

    const task = {

        title:newTitle,

        description:newDescription,

        completed:false
    };

    await fetch(`${apiUrl}/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(task)
    });

    getTasks();
}



async function completeTask(id){

    const response =
        await fetch(`${apiUrl}/${id}`);

    const task = await response.json();

    task.completed = true;

    await fetch(`${apiUrl}/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(task)
    });

    getTasks();
}