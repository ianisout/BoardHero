let sidebar = document.querySelector(".sidebar");
let [ closeBtn, closeBtn1 ] = document.querySelectorAll("#btn");

let characterInfo = document.querySelector(".character-info");
let sidebarContent = document.querySelector(".sidebar-content");
changeCharacterDisplay();

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function (optional)
});

closeBtn1.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function (optional)
});

// following are the code to change sidebar button (optional)
function menuBtnChange() {
 if (sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the icons class
 } else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu"); //replacing the icons class
 }
 changeCharacterDisplay();
}

function changeCharacterDisplay() {
  if (characterInfo.style.display === "") {
    characterInfo.style.display="none";
    sidebarContent.style.paddingTop="30px";
  }
  else {
    characterInfo.style.display="";
    sidebarContent.style.paddingTop="0";
  }
}