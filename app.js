document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let important = document.getElementById("importante").checked;
  let color = document.getElementById("color").value;

  let task = {
    title,
    description,
    important,
    color,
  };

  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formTask').reset();
  e.preventDefault();
}

function deleteTask(title) {
  console.log(title)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';

    for(let i = 0; i < tasks.length; i++) {
      let title = tasks[i].title;
      let description = tasks[i].description;
      let important = tasks[i].important;
      let color = tasks[i].color;

        if(important){

          tasksView.innerHTML += `<div style="background: ${color}" class="card mb-3" id="${important}">
          <div>
          <center><h4 class="btn-danger" style="padding: 15px">¡IMPORTANTE!</h4></center>
          <div class="card-body">
          <p style="color: white">${title} - ${description}
          <a style="color: white" href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">Eliminar</a>
          </p>
        </div>
          </div>
        </div>`;
        }else{

          tasksView.innerHTML += `<div style="background: ${color}" class="card mb-3" id="${important}">
          <div>
          <center><h4 style="padding: 15px; background: #62a0ea; color: white">Irrelevante</h4></center>
          <div class="card-body">
          <p style="color: white">${title} - ${description}
          <a style="color: white" href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">Eliminar</a>
          </p>
        </div>
          </div>
        </div>`;
        }
    }

}

getTasks();
