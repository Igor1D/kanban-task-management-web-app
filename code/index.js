

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

// Form
let form = document.getElementById("new-task-modal-window");

//DDL
let ddl = document.getElementById("select-status")
// console.log(ddl.value)

// Board local storage
let selectedBoard;
let boardLocalStorage = localStorage.getItem('selectedBoard');


// console.log(form);
console.log(boardLocalStorage);

  if (!boardLocalStorage) {
    selectedBoard = "Platform Launch";
  } else {
    selectedBoard = boardLocalStorage;
  }
  // localStorage.setItem("selectedBoard", boardLocalStorage);
  console.log(boardLocalStorage, selectedBoard);



form.addEventListener("submit", (event) => {
  event.preventDefault();

  const createNewTask = async () => {
    const response = await fetch(`http://localhost:3000/tasks`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // "id": 11,
        "title": titleInput.value,
        "description": descInput.value,
        "status": ddl.value,
        "board": selectedBoard
      })


    });
    // console.log(response, 'abra');
  }
  createNewTask();
})


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
      localStorage.setItem("selectedBoard", boardLocalStorage)
      console.log(boardLocalStorage);
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


    }







  }


  showTasks();
  
}

main();


