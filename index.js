

// Btns 
let btns = document.querySelectorAll(".board-btn");

//Tasks
let columnDivs = document.getElementsByClassName("column-div");

let headerBoardName = document.getElementById('header-board-name');
let toDoTasksAmount = document.getElementById('toDoText');

// Modal
let createNewTaskBtn = document.getElementById("add-new-task-btn");
let modalWindow = document.getElementById("new-task-modal-window");
let filterDiv = document.getElementById("filterDiv");
let titleInput = document.getElementById("title-input");
let descInput = document.getElementById("desc-input");

//Edit task Modal window
let editTaskModalWindow = document.getElementsByClassName("edit-task-modal-window")[0];
let taskTitle = editTaskModalWindow.getElementsByClassName("task-title")[0];
let taskDesc = editTaskModalWindow.getElementsByClassName("edit-task-description")[0];
let editDdl = document.getElementById("edit-select-status");
let threeDotsBtn = document.getElementById("edit-btn");
let editBtnsDiv = document.getElementById("editBtnsDiv");
let editTaskBtn = document.getElementById("editTaskBtn");
let deleteTaskBtn = document.getElementById('deleteTaskBtn');
console.log(deleteTaskBtn);
console.log(editBtnsDiv.style.display);

// Side Bar
let sideBar = document.getElementsByClassName('side-bar')[0];
console.log(sideBar);
let hideSideBarBtn = document.getElementById('hide-side-bar-btn');
let showSideBarBtn = document.getElementById('show-side-bar-btn');
let headerDiv = document.getElementById('header');
console.log(showSideBarBtn);

let containerDiv = document.getElementsByClassName('container')[0];

// Form
let form = document.getElementById("new-task-modal-window");

//DDL
let ddl = document.getElementById("select-status")
// console.log(ddl.value)

// Board local storage
let selectedBoard;
let boardLocalStorage = localStorage.getItem('selectedBoard');

// Side bar local storage
// let flexSideBar = sideBar.style.setProperty('display', 'flex');
// let noneSideBar = sideBar.style.setProperty('display', 'none')
let sideBarState;
// true or false - boolean
// 'flex' or 'none'
let sideBarLocalStorage = localStorage.getItem('sideBarState');



if (!sideBarLocalStorage) {
  sideBarState = 'flex'
} else {
  // here sideBarLocalStorage may be 'flex' or it may be 'none
  sideBarState = sideBarLocalStorage;
}

if (sideBarState === 'flex') {
  showSideBarBtn.style.display = "none";
} else {
  showSideBarBtn.style.display = "block";
}

sideBar.style.setProperty('display', sideBarState);


function closeSideBar() {
  console.log(sideBarState);
  sideBarState = 'none';
  sideBar.style.display = sideBarState;
  showSideBarBtn.style.display = "block";
  localStorage.setItem("sideBarState", sideBarState)
  
    
}

function openSideBar() {
  console.log(sideBarState);
  sideBarState = 'flex';
  sideBar.style.display = sideBarState;
  showSideBarBtn.style.display = "none";
  localStorage.setItem("sideBarState", sideBarState)
  

}




hideSideBarBtn.addEventListener('click',closeSideBar);
showSideBarBtn.addEventListener('click', openSideBar);



//Board local storage
// console.log(boardLocalStorage);

if (!boardLocalStorage) {
  selectedBoard = "Platform Launch";
} else {
  selectedBoard = boardLocalStorage;
}


// ask Lazar about the following:
if (selectedBoard) {
  const activeButton = Array.from(btns).find(btn => btn.innerText === selectedBoard);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}
headerBoardName.innerText = selectedBoard;

const createNewTask = async (task) => {
  const response = await fetch(`https://kanban-backend-server.onrender.com/tasks`, {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)


  });
  location.reload();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  createNewTask({
    "title": titleInput.value,
    "description": descInput.value,
    "status": ddl.value,
    "board": selectedBoard
  });
})

// func that takes an ID and the task OBJ and updates it on the server
const patchTask = async (id, task) => {
  console.log(id, task)

  const results = await fetch(`https://kanban-backend-server.onrender.com/tasks/${id}`, {

    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)


  })
  location.reload();

}

const putTask = async (id, task) => {
  console.log(id, task)
  const results = await fetch(`https://kanban-backend-server.onrender.com/tasks/${id}`, {

  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(task)


})
location.reload();


}

const deleteTask = async (id, task) => {
  console.log(id, task)
  const results = await fetch(`https://kanban-backend-server.onrender.com/tasks/${id}`, {

  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(task)


})
location.reload();


}




async function main() {

  let results = await fetch(`https://kanban-backend-server.onrender.com/tasks`);
  let tasks = await results.json();


  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", () => {

      document.querySelector('.active')?.classList.remove('active');
      btns[i].classList.add('active');

      selectedBoard = btns[i].innerText;

      headerBoardName.innerText = selectedBoard;
      console.log("Button clicked:", selectedBoard);
      localStorage.setItem("selectedBoard", selectedBoard)//added here localStorage.setItem("selectedBoard", selectedBoard)
      console.log(selectedBoard);
      showTasks();



    });


  }

  createNewTaskBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    modalWindow.style.display = 'flex';


    modalWindow.style.marginTop = '40px';
    modalWindow.style.opacity = 0;
    filterDiv.style.opacity = 0;
    filterDiv.style.display = 'block';
    setTimeout(() => {
      modalWindow.style.marginTop = 0;
      modalWindow.style.opacity = 1;
      filterDiv.style.opacity = 1;
    }, 100);

    document.addEventListener("click", (event) => {
      if (event.target != modalWindow && !modalWindow.contains(event.target)) {
        modalWindow.style.display = 'none';
        filterDiv.style.display = 'none';
        titleInput.value = '';
        descInput.value = '';



      }
    })

  })


  function showTasks() {

    for (let i = 0; i < columnDivs.length; i++) {

      let header = columnDivs[i].children[0];
      columnDivs[i].innerHTML = '';
      columnDivs[i].appendChild(header);
    }


    const filteredTasks = tasks.filter(task => task.board === selectedBoard);

    // console.log(filteredTasks, tasks, selectedBoard)


    for (let j = 0; j < filteredTasks.length; j++) {


      let taskDiv = document.createElement('div');
      taskDiv.innerText = filteredTasks[j].title; // changed from tasks[i].title to filteredTasks[i].title
      taskDiv.classList.add('task-div');

      if (filteredTasks[j].status == 'todo') {
        columnDivs[0].appendChild(taskDiv);
      } else if (filteredTasks[j].status == 'doing') {
        columnDivs[1].appendChild(taskDiv);
      } else if (filteredTasks[j].status == 'done') {
        columnDivs[2].appendChild(taskDiv);
      }
      // console.log(filteredTasks[j].id)


      // Modal window task
      taskDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        editTaskModalWindow.style.display = 'flex';
        editTaskModalWindow.style.marginTop = '40px';
        editTaskModalWindow.style.opacity = 0;
        filterDiv.style.opacity = 0;
        filterDiv.style.display = 'block';
        setTimeout(() => {
          editTaskModalWindow.style.marginTop = 0;
          editTaskModalWindow.style.opacity = 1;
          filterDiv.style.opacity = 1;
        }, 100);

        taskTitle.innerText = filteredTasks[j].title;
        taskDesc.innerText = filteredTasks[j].description;
        editDdl.value = filteredTasks[j].status;

        // status change
        editDdl.addEventListener("change", (e) => {


          patchTask(
            filteredTasks[j].id, {
            status: e.target.value
          }


          );


        })




        // Three dots
        // threeDotsBtn.addEventListener('click', (e) => {
        //   e.stopPropagation();
        //   console.log('clicked');

        //   if (editBtnsDiv.classList.contains('show')) {
        //     editBtnsDiv.classList.remove('show');
        //   } else {
        //     editBtnsDiv.classList.add('show');
        //   }
        // });
        function handleThreeDots(e) {
          e.stopPropagation();
          console.log('------------');

          // console.log(editBtnsDiv.style.display)
          if (editBtnsDiv.style.display === 'none' || editBtnsDiv.style.display === '') {

            editBtnsDiv.style.display = 'flex';

          } else {
            // console.log('else part')
            editBtnsDiv.style.display = 'none';

          };

          console.log('3 dots')
          console.log('------------')

        }

        // Three dots
        threeDotsBtn.addEventListener('click', handleThreeDots)

        function offClick(event) {
          console.log('----------')
          if (event.target != editTaskModalWindow && !editTaskModalWindow.contains(event.target)) {
            editTaskModalWindow.style.display = 'none';
            filterDiv.style.display = 'none';
            editBtnsDiv.style.display = 'none';

            console.log('end of the off click');
            console.log('---------');
            threeDotsBtn.removeEventListener('click', handleThreeDots)
            document.removeEventListener("click", offClick)
          }
        }

        document.addEventListener("click", offClick)




        
        
        //Edit task btn
        editTaskBtn.addEventListener('click', () => {

          editTaskModalWindow.style.display = "none";
          threeDotsBtn.removeEventListener('click', handleThreeDots)
          document.removeEventListener("click", offClick)
          // taskTitle.contentEditable = true;

          // let inputField = document.createElement('input');
          // inputField.className = 'task-title-input';
          // inputField.type ='text';
          // inputField.value = taskTitle.innerText;
          // taskTitle.parentElement.replaceChild(inputField, taskTitle);

          let editTaskForm = document.createElement('form');
          editTaskForm.className = "modal-window";
          editTaskForm.id = "new-task-modal-window";
          editTaskForm.innerHTML = `<h4 class="modal-title" >Edit Task</h4>
          <div class="input-div">
            <label class="label-modal-window" id="modal-title-input" for="title-input">Title</label>
            <input type="text" class="modal-input" id="title-input-edit-task" value="${filteredTasks[j].title}">
          </div>
          <div class="input-div">
            <label class="label-modal-window" id="modal-desc-input" for="desc-input-edit-task">Description</label>
          <textarea name="description" id="desc-input-edit-task">${filteredTasks[j].description}</textarea>
          </div>
          <div class="input-div">
            <label class="label-modal-window" id="modal-select-status-task" for="edit-select-status-task">Status</label>
            <select name="status"  id="edit-select-status-task">
              <option value="todo" ${(filteredTasks[j].status == 'todo') ? 'selected' : ''}>Todo</option>
              <option value="doing" ${(filteredTasks[j].status == 'doing') ? 'selected' : ''}>Doing</option>
              <option value="done" ${(filteredTasks[j].status == 'done') ? 'selected' : ''}>Done</option>>
            </select>
          </div>
          <button type="submit" class="submit-btn" id="change-task-btn" >Save Changes</button>`
          editTaskForm.style.display = 'flex';
          document.body.appendChild(editTaskForm);
          let saveChangesBtn = document.getElementById('change-task-btn');
          let titleInputEditTask = document.getElementById('title-input-edit-task');
          // console.log(titleInputEditTask.value)
          let descInputEditTask = document.getElementById('desc-input-edit-task');
          // console.log(descInputEditTask.value)
          let ddlEditTask = document.getElementById('edit-select-status-task');
          // console.log(ddlEditTask.value)
          // console.log(saveChangesBtn);

          // editTaskBtn.removeEventListener('click', handleEditTaskBtn);

          editTaskForm.addEventListener('submit', (event) => {
            event.preventDefault();


            putTask(
              filteredTasks[j].id, {
              title: titleInputEditTask.value,
              description: descInputEditTask.value,
              status: ddlEditTask.value,
              board: selectedBoard
            }
  
  
            );
            console.log('changed')
  
          })

          // function handleEditTaskBtn() {
            
          //   if (editTaskForm.style.display === 'none'|| editTaskForm.style.display === '') {
              
          //     editTaskForm.style.display = 'flex'
  
          //   } else {
          //     editTaskForm.style.display = 'none'
          //   }
          // }
          // console.log(editTaskForm.style.display)

          function editTaskOffClick(event) {
            console.log('Start-------editTaskOffClick')
            if (event.target != editTaskBtn && !editTaskForm.contains(event.target)) {
              console.log(event.target)
              editTaskForm.remove();
              filterDiv.style.display = 'none';
              editBtnsDiv.style.display = 'none';

  
              console.log('end-------editTaskOffClick');
             
              threeDotsBtn.removeEventListener('click', handleThreeDots)
              document.removeEventListener("click", editTaskOffClick)
            } else {
              editTaskForm.style.display = 'flex';
              filterDiv.style.display = 'block';
            }
          }
          document.addEventListener("click", editTaskOffClick)
          
          
          // editTaskBtn.removeEventListener('click', handleEditTaskBtn);
          
          console.log(editTaskForm.style.display)

        })
        
        
        deleteTaskBtn.addEventListener('click', ()=> {
          // threeDotsBtn.removeEventListener('click', handleThreeDots)
          // document.removeEventListener("click", offClick)
          
          
          
          deleteTask(
            filteredTasks[j].id, {
            title: filteredTasks[j].title,
            description: filteredTasks[j].description,
            status: filteredTasks[j].status,
            board: selectedBoard
          }


          );


        })




      });





    }



  }


  showTasks();

}





main();


