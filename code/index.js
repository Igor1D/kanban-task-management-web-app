// Btns active
let btns = document.getElementsByClassName("board-btn");

//Tasks

let columnDiv = document.getElementById("column-div");
let selectedBoard = 'Platform Launch';






async function main() {
    
    let results = await fetch(`http://localhost:3000/tasks`);
    let tasks = await results.json();
    console.log(tasks);

    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        let current = document.getElementsByClassName("active");
    
        if (current.length > 0) {
          current[0].className = current[0].className.replace(" active", "");
        }
    
        // Added the active class to the current/clicked button
        this.className += " active";
        
        selectedBoard = btns[i].innerText;
        showTasks();
        console.log(selectedBoard);
      });
    }

    function showTasks() {
        columnDiv.innerHTML = `<div id="todo-head-div" class ="column-head-div"><span class="dot" id="todo-dot"></span><h4>TODO (4)</h4></div>`;
        
        const filteredTasks = tasks.filter((task) => {
          // console.log(task.board);
          return task.board == selectedBoard;
          
        });
         



        for ( let i=0; i < filteredTasks.length; i++) {
          let taskDiv = document.createElement('div');
          taskDiv.innerText = tasks[i].title;
          taskDiv.classList.add('task-div');
          columnDiv.appendChild(taskDiv);
         
          
      }
    }


    showTasks();

} 

main();


