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

/* equip and unequip items front-side */

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

/* 
  UNDER DEVELOPMENT - IAN

  function removeImg(url) {
  console.log('here i received the url: ' + url)
  divsToBeDeleted = []

  uniqueImages.forEach(item => {
    if (item.style.backgroundImage === url) {
      console.log('item addded to the divsToBeDeleted' + item)
      divsToBeDeleted.push(item);
      console.log('divs to be deleted = ' + divsToBeDeleted[0])
    }
  });

  for (let i = 0; i < divsToBeDeleted.length; i++) {
    console.log('i should be deleting this: ' + divsToBeDeleted[i])
    divsToBeDeleted[i].remove();
  }
}

btnEquip.forEach(item => item.onclick = () => {
    const urlImg = `url("${item.parentElement.childNodes[1].currentSrc.substring(21)}")`
    console.log(item.parentElement.childNodes[1].src)

    removeImg(urlImg)
})


function getNumberOfImgs() {
  const equipIds = [];
  const numberNow = document.querySelectorAll(".unique-image");
  for (let i = 0; i < numberNow.length; i ++) {
    if(numberNow[i].id) equipIds.push(numberNow[i].id);
  }

  console.log(equipIds)
} */

ownedItem.forEach(item => item.onclick = () => {
  const equipItemDiv = document.createElement("div");
  const imageUrl = item.childNodes[1].currentSrc;
  equipItemDiv.classList = "unique-image";
  equipItemDiv.style.backgroundImage = `url('${imageUrl.substring(21)}')`;
  
  imageToBeInsertedAfter.insertAdjacentElement('afterend', equipItemDiv);

  changeButtonStatus(item.lastChild);
});


/* equip and unequip items back-side */

function equipUnequip(id, ownInfo) {
  fetch("/inventory", {
    method: 'PATCH',
    body: JSON.stringify({id}),
    headers: {
      'Content-type': 'application/json'
    }
  })/* .then(setTimeout(() => {
    removeImg(`url("${ownInfo.parentElement.childNodes[1].src.substring(21)}")`)
  }, 100)) */
  .catch(console.log);
}