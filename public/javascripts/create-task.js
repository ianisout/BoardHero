const currentDate = new Date();
let endDateCheckbox = document.querySelector("#enable_end_date");
let endDateInput = document.querySelector("#end_date");

document.getElementById('start_date').valueAsDate = currentDate;

endDateCheckbox.addEventListener("click", ()=>{
  if (endDateCheckbox.checked) {
    endDateInput.disabled = false;
    endDateInput.valueAsDate = currentDate;
  } else {
    endDateInput.disabled = true;
    endDateInput.valueAsDate = null;
  }
});