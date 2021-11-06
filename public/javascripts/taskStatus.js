const column = document.querySelectorAll(".col-6 col-md-4");
const titleColumn = document.querySelectorAll("column-title");
const createBoard = document.createElement("div");
createBoard.setAttribute("class", "card tasks-dashboard");

column.appendChild(createBoard);
createBoard.insertAdjacentElement("afterend", titleColumn);

const bodyBoard = document.createElement("div");
bodyBoard.setAttribute("class", "card-body");
createBoard.appendChild(bodyBoard);

const topContentBoard = document.createElement("div");
topContentBoard.setAttribute("class", "top-content");
bodyBoard.appendChild(topContentBoard);

const titleBoard = document.createElement("div");
titleBoard.setAttribute("class", "task-title");
topContentBoard.appendChild(titleBoard);
const taskName = document.createElement("h5");
titleBoard.appendChild(taskName);

const taskInfo = document.createElement("div");
taskInfo.setAttribute("class", "task-info");
topContentBoard.appendChild(taskInfo);
const anchorDetails = document.createElement("a");
anchorDetails.setAttribute("href" /* task.id */);
taskInfo.appendChild(anchorDetails);

const divSpan = document.createElement("div");
divSpan.setAttribute("class", "span-tag");
bodyBoard.appendChild(divSpan);
const spanDetails = document.createElement("span");
spanDetails.setAttribute("class", "span-tags");
divSpan.appendChild(spanDetails);

const descriptionBoard = document.createElement("div");
descriptionBoard.setAttribute("class", "card-text");

const paragraphBoard = document.createElement("p");
paragraphBoard.setAttribute("class", "card-text");
descriptionBoard.appendChild(paragraphBoard);
bodyBoard.appendChild(descriptionBoard);


