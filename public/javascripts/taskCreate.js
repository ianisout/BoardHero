const startDateInput = document.getElementById('start_date');
const endDateInput = document.getElementById("end_date");
const endDateCheckbox = document.getElementById("enable_end_date");

const currentDate = new Date();
const yyyy = currentDate.getFullYear();
let mm = currentDate.getMonth() + 1;
let dd = currentDate.getDate();

if (mm < 10) {
  mm = '0' + mm;
}

if (dd < 10) {
  dd = '0' + dd;
}

const today = yyyy + '-' + mm + '-' + dd;

startDateInput.min = today;
startDateInput.defaultValue = today;

endDateInput.min = today;

endDateCheckbox.addEventListener("click", ()=>{
  if (endDateCheckbox.checked) {
    endDateInput.disabled = false;
    endDateInput.defaultValue = today;
  } else {
    endDateInput.disabled = true;
    endDateInput.defaultValue = "";
  }
});