function setBackgroundSelectionDiv() {
  const optionsDiv = document.querySelector('.background-selection');
  optionsDiv.style.display = "unset"  
}

function setBackgroundFromSystem(url) {
  const homeSection = document.querySelector('.home-section');
  homeSection.style.backgroundImage = `url(${url})`;
  document.querySelector('.background-selection').style.display = "none";
  localStorage.setItem('background_image', url);
}

function setBackgroundFromStorage() {
  const homeSection = document.querySelector('.home-section');
  const url = localStorage.getItem("background_image");
  homeSection.style.backgroundImage = `url(${url})`;
  setAlert()
}

async function getImage () {
  try {
    await axios.get('https://picsum.photos/1920/1080/?blur=2')
    .then((res) => {
      const backgroundUrl = res.request.responseURL;
      const homeSection = document.querySelector('.home-section')
      homeSection.style.backgroundImage = `url('${backgroundUrl}')`;
      document.querySelector('.background-selection').style.display = "none";
      localStorage.setItem('background_image', backgroundUrl);
    });
  } catch (err) {
    console.error(err);
  }
};

function setAlert() {
  const alertDiv = document.querySelector('.alert-change');
  
  if (alertDiv.style.display = "unset !important") {
    setTimeout(() => {
      alertDiv.style.display = "none"
    }, 10000)
  }
}
