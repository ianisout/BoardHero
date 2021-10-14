const tryOutOfChoice = document.getElementById("tryout-of-choice");
let itemSelectedForBuying;

const itemsForSale = document.querySelectorAll(".item-img");
for (let i = 0; i < itemsForSale.length; i++) {
  itemsForSale[i].addEventListener('click', equip => {
    tryOutOfChoice.src = itemsForSale[i].currentSrc;
    itemSelectedForBuying = itemsForSale[i].currentSrc;
    console.log(itemSelectedForBuying);
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
ownedItem.forEach(item => item.onclick = () => {
  const equipItemDiv = document.createElement("div");
  equipItemDiv.classList = "unique-image";
  const imageUrl = item.childNodes[1].currentSrc;
  equipItemDiv.style.backgroundImage = `url('${imageUrl.substring(21)}')`;
  const characterDiv = document.getElementsByClassName("character-image");
  characterDiv[1].insertAdjacentElement("beforebegin", equipItemDiv)
});