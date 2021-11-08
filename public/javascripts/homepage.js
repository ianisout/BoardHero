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

function setupInitialization() {
  checkLoginCookie();
  checkWelcomeMessage();
  const homeSection = document.querySelector('.home-section');
  const url = localStorage.getItem("background_image");
  homeSection.style.backgroundImage = `url(${url})`;
  setAlert();
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
  
  if (alertDiv.style.display = "unset") {
    playSound('sound-success');
    setTimeout(() => {
      alertDiv.style.display = "none"
    }, 5000)
  }
}

function dismissAlert() {
  document.querySelector('.alert-change').style.display = "none";
}

function playSound(soundObj) {
  const sound = document.getElementById(soundObj);
  sound.style.display = "unset";
}

function checkLoginCookie() {
  const cookieName = 'loginCookie'
  const cookies = document.cookie;
  if (cookies.includes(cookieName)) {
    const sound = document.getElementById('sound-start');
    sound.style.display = "unset";
  }
}

function checkWelcomeMessage() {
  const cookieName = 'firstLogin'
  const cookies = document.cookie;
  if (cookies.includes(cookieName)) {
    const welcomeDivMain = document.querySelector('.welcome-main');
    welcomeDivMain.style.visibility = "visible";
    const url = localStorage.getItem("background_image");
    if (url) localStorage.clear();
  }
}

function closeWelcomeMessage() {
  document.querySelector('.welcome-main').remove();
}