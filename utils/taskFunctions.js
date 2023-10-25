export const createNewTask = async (task) => {
    const response = await fetch(
      `https://kanban-backend-server.onrender.com/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
    location.reload();
  };

  // func that takes an ID and the task OBJ and updates it on the server
export const patchTask = async (id, task) => {
    // console.log(id, task)
  
    const results = await fetch(
      `https://kanban-backend-server.onrender.com/tasks/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
    location.reload();
  };

  export const putTask = async (id, task) => {
    // console.log(id, task)
    const results = await fetch(
      `https://kanban-backend-server.onrender.com/tasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
    location.reload();
  };

  export const deleteTask = async (id, refresh) => {
    // console.log(id, task)
    const results = await fetch(
      `https://kanban-backend-server.onrender.com/tasks/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("task" + id + "deleted");
    if (refresh == true) {
      location.reload();
    }
  };