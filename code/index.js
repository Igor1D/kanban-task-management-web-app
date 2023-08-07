// Btns 
let btns = document.querySelectorAll(".board-btn");

//Tasks
let columnDivs = document.getElementsByClassName("column-div");
let selectedBoard = 'Platform Launch';
let headerBoardName = document.getElementById('header-board-name');
let toDoTasksAmount = document.getElementById('toDoText');

// Modal

let createNewTaskBtn = document.getElementById("add-new-task-btn");
let modalWindow =  document.getElementById("new-task-modal-window");

console.log(modalWindow);




async function main() {

  let results = await fetch(`http://localhost:3000/tasks`);
  let tasks = await results.json();


  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", () => {

      document.querySelector('.active')?.classList.remove('active');
      btns[i].classList.add('active')

      selectedBoard = btns[i].innerText;
      headerBoardName.innerText = selectedBoard;

      console.log("Button clicked:", selectedBoard);
      showTasks();

    });
  }

  createNewTaskBtn.addEventListener("click", () => {
    modalWindow.style.display = 'flex';
    
  })

  // window.addEventListener("click", (event) => {
  //   if(event.target == modalWindow) {
  //     modalWindow.style.display = 'none';
  //   }
  // })
  
  
  


  function showTasks() {

    for (let i = 0; i < columnDivs.length; i++) {
      
      let header = columnDivs[i].children[0];
      columnDivs[i].innerHTML = '';
      columnDivs[i].appendChild(header);


    }


    const filteredTasks = tasks.filter(task => task.board === selectedBoard);
    console.log(filteredTasks);
    console.log(selectedBoard);



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


