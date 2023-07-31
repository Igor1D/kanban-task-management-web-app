// Btns active
let btns = document.getElementsByClassName("board-btn");

//Tasks

let columnDiv = document.getElementById("column-div");





for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");

    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }

    // Added the active class to the current/clicked button
    this.className += " active";
  });
}




async function main() {
    let selectedBoard = 'Platform Launch' 
    let results = await fetch(`http://localhost:3000/tasks`);
    let tasks = await results.json();

    

    function showTasks() {
        // go over this on the next class
        const filteredTasks = tasks.filter(task => task.board == selectedBoard);
         

        for ( let i=0; i < filteredTasks.length; i++) {
          let newP = document.createElement('p');
          let taskDiv = document.createElement('div');
          newP = tasks[i].title;
          taskDiv.innerHTML = newP;
          taskDiv.classList.add('task-div');
          columnDiv.appendChild(taskDiv);
          console.log(filteredTasks);
      }
    }


    showTasks();

} 

main();


