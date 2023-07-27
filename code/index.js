// Btns active

let btns = document.getElementsByClassName("board-btn");

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");

    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }

    // Add the active class to the current/clicked button
    this.className += " active";
  });
}








async function main() {
    let selectedBoard = 'Platform Launch' 
    let results = await fetch(`http://localhost:3000/tasks`);
    let tasks = await results.json();

    function showTasks() {
        // go over this on the next class
        const filtredTasks = tasks.filter(task => task.board == selectedBoard);
        console.log(filtredTasks);


    }


    showTasks();

} 

main();


// for ( let i=0; i < tasks.length; i++) {
//     //     let newP = document.createElement('p');
//     //     newP = tasks[i].title;
//     //     document.body.append(newP);
//     //     console.log(tasks[i].board);
//     // }