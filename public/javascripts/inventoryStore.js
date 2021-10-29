const tryOutOfChoice = document.getElementById("tryout-of-choice");
let itemSelectedForBuying;

const itemsForSale = document.querySelectorAll(".item-img");
for (let i = 0; i < itemsForSale.length; i++) {
  itemsForSale[i].addEventListener('click', equip => {
    tryOutOfChoice.src = itemsForSale[i].currentSrc;
    itemSelectedForBuying = itemsForSale[i].currentSrc;
  })
}

// ONLY FUNCTION NOT WORKING PROPERLY YET

function makePurchase(element_id) {
  // debugger;
  fetch("/inventory", {
    method: 'POST',
    body: JSON.stringify({element_id}),
    headers: {
      'Content-type': 'application/json'
    }
  }).then(() => location.reload()) 
  .catch(console.log);
}


/* set phrase in case user character doesn't own any items yet */

const itemList = document.querySelector(".item-list");
const introPhrase = document.getElementById("intro-phrase")

if (itemList.childNodes.length === 3) {
  introPhrase.style.display = 'unset'
}


/* equip and unequip items front-side */

const ownedItems = document.querySelectorAll(".item");
const uniqueImages = document.querySelectorAll(".unique-image");

function changeButtonStatus(btnText) {
  if (btnText.innerText === "Equip") {
    btnText.innerText = "Unequip";
  } else if (btnText.innerText === "Unequip") {
    btnText.innerText = "Equip";
  }
}

ownedItems.forEach(item => item.onclick = () => {
  const srcBtn = item.childNodes[1].src.substr(item.childNodes[1].src.lastIndexOf('/') + 1).slice(0, -4);
  
  for (let i = 0; i < uniqueImages.length; i ++) {
    if (srcBtn === uniqueImages[i].id && uniqueImages[i].classList.contains('show-item')) {
      uniqueImages[i].classList.remove('show-item');
      break;
    } else if (srcBtn === uniqueImages[i].id) {
      uniqueImages[i].classList.toggle('equipToggle');
      break;
    }
  }

  changeButtonStatus(item.childNodes[5]);
});


/* equip and unequip items back-side */

function equipUnequip(id) {
  fetch("/inventory", {
    method: 'PATCH',
    body: JSON.stringify({id}),
    headers: {
      'Content-type': 'application/json'
    }
  })
  .catch(console.log);
}