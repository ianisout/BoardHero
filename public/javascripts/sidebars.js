
(function () {
  'use strict'
  let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()


// let btn = document.querySelector("#btn");
// let sidebar = document.querySelector(".sidebar");


// btn.onclick = function() {
//   sidebar.classList.toggle("active");
//   if(btn.classList.contains("bx-menu")){
//     btn.classList.replace("bx-menu" , "bx-menu-alt-right");
//   }else{
//     btn.classList.replace("bx-menu-alt-right", "bx-menu");
//   }
// }
// searchBtn.onclick = function() {
//   sidebar.classList.toggle("active");
// }