// CHARACTER SET
const characterElements = {
  "skincolor": "3",
  "dress": null,
  "eyes": null,
  "glasses": null,
  "hairback": null,
  "hairfront": null,
  "mouth": null,
  "pants": null,
  "shirt": null,
  "shoe": null,
  "beard": null,
  "tie": null,
};

function setCharacterElements(elementType, elementId) {
  const obj = {}
  obj[elementType] = elementId;
  if (elementType in characterElements) {
    characterElements[elementType] = elementId.substr(elementId.length - 1);
  }
  return characterElements;
}

// CLEAR PREVIOUS ELEMENT SECTIONS DIV
function manipulateElementsDiv() {
  let introPhrase = document.getElementById('intro-phrase');
  if (introPhrase) introPhrase.remove();

  let elementsDiv = document.getElementById('option-list');
  if (elementsDiv.style.display === 'none') elementsDiv.style.display = 'flex';

  const elements = document.getElementsByClassName('choice');
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

// LIST CATEGORIES
function loadElementOptions(source) {
  const optionsList = document.getElementById('option-list');

  const element = document.createElement('div');
  element.setAttribute('class', 'choice');
  element.setAttribute('id', source.substr(source.lastIndexOf('/') + 1).slice(0, -4));

  const elementImage = document.createElement('img');
  elementImage.setAttribute('class', 'item-of-choice');
  elementImage.src = source;

  element.appendChild(elementImage);
  optionsList.appendChild(element);
}


// REMOVING A PREVIOUSLY SELECTEC ELEMENT
function removeSelection(btnUndo) {
  const elementClass = btnUndo.previousSibling.id.replace(/[0-9]/g, '');
  const element = document.getElementsByClassName(`${elementClass}`);
 
  if (element) {
    element[0].remove()
    characterElements[elementClass] = null;
    btnUndo.remove();
  }
}

function generateUndoButton() {
  const existingBtn = document.querySelector(".btn-undo");

  if (existingBtn) existingBtn.remove();

  const optionsList = document.getElementById('option-list');
  const btnUndo = document.createElement('button');
  btnUndo.setAttribute('class', 'btn-undo');
  btnUndo.innerText = "Undo\nselection";
  btnUndo.style.width = "100px"
  optionsList.appendChild(btnUndo);

  btnUndo.addEventListener("click", function() {removeSelection(btnUndo)});
}

// GETTING ID OF CATEGORY BUTTON CLICKED + FETCH URL
const getImages = async (id) => {
  manipulateElementsDiv();
  const existingBtn = document.querySelector(".btn-undo");

  if (existingBtn) existingBtn.remove();

  for (let i = 1; i < 13; i++) {
    try {
      await axios.get(`/images/clothing-items/${id}/${id + i}.png`).then((res) => {
          const source = res.config.url;
          loadElementOptions(source);
        });
      } catch (err) { null };
    }
  
  const choice = document.getElementsByClassName('item-of-choice');
  setElementByChoice(choice)
};

// REMOVE ELEMENTS SO THERE'S NO DUPLICATE
function removeElementByClass(className){
  const elements = document.getElementsByClassName(className);

  while(elements.length > 1){
    elements[0].parentNode.removeChild(elements[0]);
  }
}

// SELECTING ELEMENT -> ATTACHING TO CHARACTER
const userCharacter = document.querySelector('#character-visual-background');

function setElementByChoice(choice) {
  for (let i = 0; i < choice.length; i++) {
    choice[i].addEventListener('click', (event) => {
      generateUndoButton()

      const selectedCategory = event.target.nodeName === 'IMG';
      if (!selectedCategory) return;
      
      const idChoice = choice[i].src.substr(choice[i].src.lastIndexOf('/') + 1).slice(0, -4);
      const classType = choice[i].src.substr(choice[i].src.lastIndexOf('/') + 1).slice(0, -5).replace(/[0-9]/g, '');
      
      const getType = document.querySelectorAll(`.${classType}`);
      
      const choiceSelected = document.createElement('div');
      choiceSelected.setAttribute('class', `character-visual ${classType}`);
      choiceSelected.setAttribute('id', idChoice);
      
      if (!getType || choiceSelected.style.backgroundImage !== `url("${choice[i].src}")`) {
        choiceSelected.style.backgroundImage = `url("${choice[i].src}")`;
        userCharacter.appendChild(choiceSelected);
        removeElementByClass(classType);
        setCharacterElements(classType, idChoice);
      }
    });
  }
}

function saveData() {
  const characterDataInForm = document.createElement("input");
  characterDataInForm.setAttribute("type", "text");
  characterDataInForm.setAttribute("name", "CHARACTER_SET");

  const form = document.getElementById("createdCharacter");
  characterDataInForm.style.display = "none";
  characterDataInForm.value = JSON.stringify(characterElements);

  form.appendChild(characterDataInForm);
}