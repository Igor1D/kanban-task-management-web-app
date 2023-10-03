
//Logo
let logo = document.getElementById('logo');
console.log(logo)

// Btns 
let btns = document.querySelectorAll(".board-btn");

//Tasks
let columnDivs = document.getElementsByClassName("column-div");

let headerBoardName = document.getElementById('header-board-name');
let columnHeaders = document.getElementsByClassName('columnHeader');


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
// console.log(deleteTaskBtn);
// console.log(editBtnsDiv.style.display);

// Side Bar
let boardNavLinksDiv = document.getElementById("boards-nav-links-div")
// console.log(boardNavLinksDiv)
let sideBar = document.getElementsByClassName('side-bar')[0];
let sideBarDiv = document.getElementById('side-bar-div')
// console.log(sideBar);
let hideSideBarBtn = document.getElementById('hide-side-bar-btn');
let showSideBarBtn = document.getElementById('show-side-bar-btn');
let headerDiv = document.getElementById('header');
// console.log(showSideBarBtn);
let containerDiv = document.getElementsByClassName('container')[0];

//Theme Toggle

let toggleDiv = document.getElementsByClassName('toggle-div')[0];



// Create New board

// Form
let form = document.getElementById("new-task-modal-window");

//DDL
let ddl = document.getElementById("select-status")
// console.log(ddl.value)

// Board - three dots
let editBoardBtn = document.getElementById('edit-board-btn');
let deleteBoardDiv = document.getElementById('editBoardDiv');
let deleteBoardBtn = document.getElementById('deleteBoardBtn');
// console.log(deleteBoardDiv.style.display == 'none');

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
  // console.log(sideBarState);
  sideBarState = 'none';
  sideBar.style.display = sideBarState;
  showSideBarBtn.style.display = "block";
  localStorage.setItem("sideBarState", sideBarState)


}

function openSideBar() {
  // console.log(sideBarState);
  sideBarState = 'flex';
  sideBar.style.display = sideBarState;
  showSideBarBtn.style.display = "none";
  localStorage.setItem("sideBarState", sideBarState)


}




hideSideBarBtn.addEventListener('click', closeSideBar);
showSideBarBtn.addEventListener('click', openSideBar);

//Theme

// let toggleState;
// let toggleLocalStorage = localStorage.getItem('checkBoxState');

// if(!toggleLocalStorage) {
//   toggleState = 'false';
// } else {
//   toggleState = toggleLocalStorage;
// }


// if (toggleState === 'false') {
//   document.body
// } else {
//   document.body.classList.toggle('.light-theme');

// }



// function lightTheme() {
//   toggleState = 'true';
//   document.body.classList.toggle('light-theme');
  
//   if(document.body.classList.contains('light-theme')){
//     logo.src = './assets/logo-dark.svg'
//   } else {
//     logo.src = './assets/logo-light.svg'
//   }
//   localStorage.setItem('toggleState', toggleState)
  
  

// }

// themeToggle.addEventListener('change',lightTheme )
let themeToggle = document.getElementById('switch');
let lightTheme = localStorage.getItem('light-theme')

function enableLightMode() {
  document.body.classList.toggle('light-theme');
  logo.src = './assets/logo-dark.svg'
  localStorage.setItem('light-theme', 'enabled')
  themeToggle.setAttribute('checked', 'true'); 
  // themeToggle.checked = true;
}


function disableLightMode() {
  console.log('disabled mode triggered')
  document.body.classList.remove('light-theme');
  logo.src = './assets/logo-light.svg'
  localStorage.setItem('light-theme', 'disabled')
}

if (lightTheme === "enabled") {
  enableLightMode()
} else {
  disableLightMode()
}

themeToggle.addEventListener('change', ()=>{
  lightTheme = localStorage.getItem('light-theme');
  if (lightTheme === 'disabled') {
    enableLightMode()
    
  } else {
    disableLightMode()
  }
})
// console.log(themeToggle.contains())


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
  // console.log(id, task)

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
  // console.log(id, task)
  const results = await fetch(`https://kanban-backend-server.onrender.com/tasks/${id}`, {

    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)


  })
  location.reload();


}

const deleteTask = async (id, refresh) => {
  // console.log(id, task)
  const results = await fetch(`https://kanban-backend-server.onrender.com/tasks/${id}`, {

    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    


  })
  console.log('task' + id + 'deleted')
  if (refresh == true) {
    location.reload();
  }
  
}




async function main() {

  let results = await fetch(`https://kanban-backend-server.onrender.com/tasks`);
  let tasks = await results.json();
  console.log(tasks);

  function createNewBoardBtn() {
    const createBoardBtn = document.createElement('button');
    createBoardBtn.id = 'create-board-btn';
    createBoardBtn.innerHTML = `<img src="./assets/icon-board.svg" alt="icon-board" class="icon-new-board">+ Create New Board`;
    boardNavLinksDiv.append(createBoardBtn);

    
    createBoardBtn.addEventListener("click", handleCreateNewBoard)
    // console.log(createNewBoardForm)
  }

  // console.log(tasks[0].board)
  let allBoards = [];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].board) {
      allBoards.push(tasks[i].board);
    }
  }


  const mySet = new Set(allBoards)

  let uniqueBoards = [...mySet]

  
  for (let i = 0; i < uniqueBoards.length; i++) {
    let boardBtn = document.createElement('button')

    boardBtn.classList.add("board-btn");
    // boardBtn.className = "board-btn";


    boardBtn.id = "board-btn";
    boardBtn.innerHTML = `<img src="./assets/icon-board.svg" alt="icon-board" class="icon-board">${uniqueBoards[i]}</button>`
    boardNavLinksDiv.appendChild(boardBtn);
    // console.log("button" + i + "appended")
    
    // boardBtn.classList = 'active';
  }
  
  createNewBoardBtn();


  function handleCreateNewBoard(e) {
    e.stopPropagation();
    let createNewBoardForm = document.createElement('form');
    createNewBoardForm.classList = "modal-window";
    createNewBoardForm.id = "new-board-form";
    createNewBoardForm.innerHTML = `<h4 class="modal-title" >Add New Board</h4>
          <div class="input-div">
            <label class="label-modal-window" id="form-title-input" for="title-input">Board Name</label>
            <input type="text" class="modal-input" id="board-title-input" value="">
          </div>
          <button type="submit" class="submit-btn" id="create-new-board" >Create New Board</button>`
    
    createNewBoardForm.style.display = 'flex';
    document.body.appendChild(createNewBoardForm);
    createNewBoardForm.style.opacity = 0;
    filterDiv.style.opacity = 0;
    filterDiv.style.display = 'block';
    setTimeout(() => {
      createNewBoardForm.style.marginTop = 0;
      createNewBoardForm.style.opacity = 1;
      filterDiv.style.opacity = 1;
    }, 100);
    
    let boardTitleInput = document.getElementById('board-title-input');
    // console.log(boardTitleInput)
    
    // console.log(createNewBoardSubmit)
    

    createNewBoardForm.addEventListener("submit", (event) => {
      event.preventDefault();
      createNewTask({
        "title": boardTitleInput.value,
        "description":"",
        "status":"",
        "board": boardTitleInput.value,
      });
    })

    // createBoardBtn.removeEventListener("click", handleCreateNewBoard)


    function createNewBoardOffClick(event) {
      let newBoardForm = document.getElementById('new-board-form')
      if (event.target !== newBoardForm && !newBoardForm.contains(event.target)) {
        // console.log(event.target)
        newBoardForm.remove();
        filterDiv.style.display = 'none';
  
        console.log('end-------createNewBoardOffClick');
  
        // threeDotsBtn.removeEventListener('click', createNewBoardOffClick)
        // editTaskBtn.removeEventListener("click", handleEditTaskBtn)
        // console.log(editTaskForm.style.display)
  
        document.removeEventListener("click", createNewBoardOffClick)
      } 
      // else {
      //   newBoardForm.style.display = 'flex';
      //   filterDiv.style.display = 'block';
      // }
    }
    document.addEventListener("click", createNewBoardOffClick)


  }


  // let createNewBoardSubmit = document.getElementById('create-new-board');
  // console.log(createNewBoardSubmit);

  let boardBtns = document.querySelectorAll(".board-btn");


  if (!boardLocalStorage || !uniqueBoards.includes(boardLocalStorage)) {
    selectedBoard = boardBtns[0].innerText;
  } else {
    selectedBoard = boardLocalStorage;
  }



  // console.dir(boardBtns[0]);

  if (selectedBoard) {
    const activeButton = Array.from(boardBtns).find(boardBtn => boardBtn.innerText === selectedBoard);
    if (activeButton) {
      activeButton.classList.add('active');
    }
  }
  headerBoardName.innerText = selectedBoard;



  



  for (let i = 0; i < boardBtns.length; i++) {
    // console.log(boardBtns)
    boardBtns[i].addEventListener("click", () => {
      // console.log("clicked")
      document.querySelector('.active')?.classList.remove('active');
      boardBtns[i].classList.add('active');

      selectedBoard = uniqueBoards[i];

      headerBoardName.innerText = selectedBoard;
      console.log("Button clicked:", selectedBoard);
      localStorage.setItem("selectedBoard", selectedBoard)//added here localStorage.setItem("selectedBoard", selectedBoard)
      // console.log(selectedBoard);
      showTasks();



    })
    
    

  }
  
 

  



  

  // for (let i = 0; i < btns.length; i++) {
  //   btns[i].addEventListener("click", () => {

  //     document.querySelector('.active')?.classList.remove('active');
  //     btns[i].classList.add('active');

  //     selectedBoard = btns[i].innerText;

  //     headerBoardName.innerText = selectedBoard;
  //     console.log("Button clicked:", selectedBoard);
  //     localStorage.setItem("selectedBoard", selectedBoard)//added here localStorage.setItem("selectedBoard", selectedBoard)
  //     console.log(selectedBoard);
  //     showTasks();



  //   });


  // }

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
 

  // Edit board three dots btn

  function editBoardHandler() {
    if (deleteBoardDiv.style.display === 'none' || deleteBoardDiv.style.display === '') {
      deleteBoardDiv.style.display = 'flex';
    } else {
      deleteBoardDiv.style.display = 'none'
    }
  }


  editBoardBtn.addEventListener('click' , editBoardHandler);

  

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
      taskDiv.innerText = filteredTasks[j].title; 
      taskDiv.classList.add('task-div');
      // taskDivs.push(taskDiv);

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

        function handleEditTaskBtn() {
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


          console.log(editTaskForm.style.display)

          function editTaskOffClick(event) {
            console.log('Start-------editTaskOffClick')
            if (event.target != editTaskBtn && !editTaskForm.contains(event.target)) {
              console.log(event.target)
              editTaskForm.remove();
              filterDiv.style.display = 'none';
              editBtnsDiv.style.display = 'none';


              console.log('end-------editTaskOffClick');

              threeDotsBtn.removeEventListener('click', handleThreeDots)
              // editTaskBtn.removeEventListener("click", handleEditTaskBtn)
              console.log(editTaskForm.style.display)

              document.removeEventListener("click", editTaskOffClick)
            } else {
              editTaskForm.style.display = 'flex';
              filterDiv.style.display = 'block';
            }
          }
          document.addEventListener("click", editTaskOffClick)



          // removing the event listener
          editTaskBtn.removeEventListener('click', handleEditTaskBtn);
        }

        // document.removeEventListener("click", handleEditTaskBtn)



        //Edit task btn - we are adding an event handler to a btn that we never actually remove(btn) 
        // because of that we need to remove the event handler from the btn to avoid adding event handler thousand times
        editTaskBtn.addEventListener('click', handleEditTaskBtn);


        deleteTaskBtn.addEventListener('click', () => {




          deleteTask(
            filteredTasks[j].id,
            true
          );


        })

        

      


      });

      function deleteBoardWindowHandler(e) {
        e.stopPropagation();
        let deleteBoardWindowDiv = document.createElement('form');
        deleteBoardWindowDiv.classList = "modal-window";
        deleteBoardWindowDiv.id = "delete-board-window";
        deleteBoardWindowDiv.innerHTML = `<h4 class="modal-title" id="modal-board" >Delete this board?</h4>
              <div class="deleteBoardWindowText">
                <p class="board-modal-p">Are you sure you want to delete the <b>${selectedBoard}</b> board? 
                This action will remove all tasks and cannot be reversed.</p>
              </div>
              <div class="deleteBoardWindowBtns">
              <button type="submit" class="submit-btn" id="delete-board" >Delete</button>
              <button type="button" class="submit-btn" id="cancel-btn">Cancel</button>
              </div>`
        
        deleteBoardWindowDiv.style.display = 'flex';
        document.body.appendChild(deleteBoardWindowDiv);
        deleteBoardDiv.style.display = 'none'
        deleteBoardWindowDiv.style.opacity = 0;
        filterDiv.style.opacity = 0;
        filterDiv.style.display = 'block';
        setTimeout(() => {
          deleteBoardWindowDiv.style.marginTop = 0;
          deleteBoardWindowDiv.style.opacity = 1;
          filterDiv.style.opacity = 1;
        }, 100);


        deleteBoardWindowDiv.addEventListener('submit', async (e)=> {
          e.preventDefault();
          
          async function deleteTasks(){ 
            
            for (let task of filteredTasks) {

            await deleteTask(
            task.id,
            false

          );

          }}
          await deleteTasks();
          console.log('tasks deleted')
          location.reload();



        })


      }
    
    
      deleteBoardBtn.addEventListener('click', deleteBoardWindowHandler);
    




    }

    // console.log(columnDivs[0].children.length)
    let firstColumn = columnDivs[0].children.length - 1
    let secondColumn = columnDivs[1].children.length - 1
    let thirdColumn = columnDivs[2].children.length - 1
    columnHeaders[0].innerText = 'TODO (' + firstColumn + ')';
    columnHeaders[1].innerText = 'DOING (' + secondColumn + ')';
    columnHeaders[2].innerText = 'DONE (' + thirdColumn + ')';
    console.log(columnHeaders.innerText);

  }

  


  showTasks();
}





main();



