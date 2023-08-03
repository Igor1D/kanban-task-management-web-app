// Btns active
let btns = document.querySelectorAll(".board-btn");

//Tasks

let columnDiv = document.getElementById("column-div");
let selectedBoard = 'Platform Launch';



async function main() {

  let results = await fetch(`http://localhost:3000/tasks`);
  let tasks = await results.json();


  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", () => {
      document.querySelector('.active')?.classList.remove('active');
      btns[i].classList.add('active')
      
      selectedBoard = btns[i].innerText;
      console.log("Button clicked:", selectedBoard);
      showTasks();
      
    });
  }

  function showTasks() {
    columnDiv.innerHTML = `<div id="todo-head-div" class ="column-head-div"><span class="dot" id="todo-dot"></span><h4>TODO (4)</h4></div>`;
    
    const filteredTasks = tasks.filter(task => task.board === selectedBoard);
    console.log(filteredTasks);
    console.log(selectedBoard);

    for (let i = 0; i < filteredTasks.length; i++) {
      let taskDiv = document.createElement('div');
      taskDiv.innerText = filteredTasks[i].title; // changed from tasks[i].title to filteredTasks[i].title
      taskDiv.classList.add('task-div');
      columnDiv.appendChild(taskDiv);

      
    }

    
  }


  showTasks();

}

main();


