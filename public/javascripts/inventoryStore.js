const tryOutOfChoice = document.getElementById("tryout-of-choice");
let itemSelectedForBuying;

const itemsForSale = document.querySelectorAll(".item-img");
for (let i = 0; i < itemsForSale.length; i++) {
  itemsForSale[i].addEventListener('click', equip => {
    tryOutOfChoice.src = itemsForSale[i].currentSrc;
    itemSelectedForBuying = itemsForSale[i].currentSrc;
  })
}

function makePurchase(element_id) {
  fetch("/inventory", {
    method: 'POST',
    body: JSON.stringify({element_id}),
    headers: {
      'Content-type': 'application/json'
    }
  }).catch(console.log);

  window.location.reload();
}


/* set phrase in case user character doesn't own any items yet */
const itemList = document.querySelector(".item-list");
const introPhrase = document.getElementById("intro-phrase")

if (itemList.childNodes.length === 3) {
  introPhrase.style.display = 'unset'
}


const ownedItem = document.querySelectorAll(".item");
const uniqueImages = document.querySelectorAll(".unique-image");
const imageToBeInsertedAfter = uniqueImages[uniqueImages.length -1];
const btnEquip = document.querySelectorAll('.btnEquip');

function changeButtonStatus(btnText) {
  if (btnText.innerText === "Equip") {
    btnText.innerText = "Unequip";
  } else if (btnText.innerText === "Unequip") {
    btnText.innerText = "Equip";
  }
}

ownedItem.forEach(item => item.onclick = () => {
  const equipItemDiv = document.createElement("div");
  equipItemDiv.classList = "unique-image";
  const imageUrl = item.childNodes[1].currentSrc;
  equipItemDiv.style.backgroundImage = `url('${imageUrl.substring(21)}')`;
  
  imageToBeInsertedAfter.insertAdjacentElement('afterend', equipItemDiv);

  changeButtonStatus(item.lastChild);
});


function equipUnequip(id) {
  fetch("/inventory", {
    method: 'PATCH',
    body: JSON.stringify({id}),
    headers: {
      'Content-type': 'application/json'
    }
  }).catch(console.log);
}