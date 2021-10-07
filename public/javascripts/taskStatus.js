const statusById = {
  open: 1,
  inProgress: 2,
  done: 3,
};

const taskByStatus = document.querySelector(".all-columns");
const taskOpen = document.querySelectorAll(".requested");
const buttonChange = document.querySelector(".button-change-status");

function changeStatus(taskId) {
  fetch("/task-details", {
    method: "POST",
    body: JSON.stringify({ taskId }),
    headers: {
      "Content-type": "application/json",
    },
  }).catch(console.log);
}
