// const elementsById = [
//   {
//     skin_color: {
//       "black": 1,
//       "brown": 2,
//       "white": 4
//     }
//   },
//   {
//     dress: 2,
//   },
//   {
//     eyes: 4,
//   },
//   {
//     glasses: 5,
//   },
//   {
//     hair_back: 6,
//   },
//   {
//     hair_front: 7,
//   },
//   {
//     mouth: 8,
//   },
//   {
//     pants: 9,
//   },
//   {
//     shirt: 11,
//   },
//   {
//     shoe: 12,
//   },
//   {
//     tie: 14,
//   }
// ];

const getElementsById = {
  skinColor: 1,
  dress: 2,
  eyes: 4,
  glasses: 5,
  hairBack: 6,
  hairFront: 7,
  mouth: 8,
  pants: 9,
  shirt: 11,
  shoe: 12,
  tie: 14,
};

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

// GETTING ID OF CATEGORY BUTTON CLICKED + FETCH URL
const getImages = async (id) => {
  manipulateElementsDiv();

  for (let i = 1; i < 5; i++) {
    try {
      await axios.get(`/images/clothing-items/${id}/${id + i}.png`).then((res) => {
          const source = res.config.url;
          loadElementOptions(source);
        });
    } catch (err) { console.error(err) };
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

// SELECTING SKIN COLOR -> ATTACHING TO CHARACTER
const userCharacter = document.querySelector('#character-visual-background');

function setElementByChoice(choice) {
  for (let i = 0; i < choice.length; i++) {
    choice[i].addEventListener('click', (event) => {
      const selectedCategory = event.target.nodeName === 'IMG';
      if (!selectedCategory) return;
      
      const idChoice = choice[i].src.substr(choice[i].src.lastIndexOf('/') + 1).slice(0, -4);
      console.log(idChoice)
      const classType = choice[i].src.substr(choice[i].src.lastIndexOf('/') + 1).slice(0, -5);
      
      const getType = document.querySelectorAll(`.${classType}`);
      
      const choiceSelected = document.createElement('div');
      choiceSelected.setAttribute('class', `character-visual ${classType}`);
      choiceSelected.setAttribute('id', idChoice);
      
      if (!getType || choiceSelected.style.backgroundImage !== `url("${choice[i].src}")`) {
        choiceSelected.style.backgroundImage = `url("${choice[i].src}")`;
        userCharacter.appendChild(choiceSelected);
        removeElementByClass(classType) 
      }
    });
  }
}

function saveData() {
  let data = document.forms[0];
  // console.log(data)
}