

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
console
console.log(editBtnsDiv.style.display);




// Form
let form = document.getElementById("new-task-modal-window");

//DDL
let ddl = document.getElementById("select-status")
console.log(ddl.value)

// Board local storage
let selectedBoard;
let boardLocalStorage = localStorage.getItem('selectedBoard');



console.log(boardLocalStorage);

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
  const response = await fetch(`http://localhost:3000/tasks`, {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)


  });
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
const changeTask = async (id, task) => {
console.log(id, task)

  const results = await fetch(`http://localhost:3000/tasks/${id}`, {

    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)

  
  })

}
async function main() {

  let results = await fetch(`http://localhost:3000/tasks`);
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

    console.log(filteredTasks, tasks, selectedBoard)
    

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
      console.log(filteredTasks[j].id)


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

          
          changeTask(
            filteredTasks[j].id,{
              status: e.target.value
            }

            


          );
          

        })

        

        document.addEventListener("click", (event) => {
          if (event.target != editTaskModalWindow && !editTaskModalWindow.contains(event.target)) {
            console.log('beginning of the off click');
            console.log(editBtnsDiv.style.display);
            editTaskModalWindow.style.display = 'none';
            filterDiv.style.display = 'none';
            editBtnsDiv.style.display = 'none';

            console.log('end of the off click');
            console.log(editBtnsDiv.style.display);

          }
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
        threeDotsBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          console.log('clicked');
         

          console.log(editBtnsDiv.style.display)
          // if (editBtnsDiv.style.display === 'none' || editBtnsDiv.style.display === ''){
            if (editBtnsDiv.style.display !== 'flex'){
            console.log('if part')
            editBtnsDiv.style.display = 'flex';

          } else {
            console.log('else part')
            editBtnsDiv.style.display = 'none';

          };

          console.log('end of eventlistener')
          console.log(editBtnsDiv.style.display)



        })


        //Edit task btn
        editTaskBtn.addEventListener('click', () => {
          // taskTitle.contentEditable = true;
          



        })

      });





    }



  }


  showTasks();

}





main();


