const tryOutOfChoice = document.getElementById("tryout-of-choice");
let itemSelectedForBuying;

const itemsForSale = document.querySelectorAll(".item-img");
console.log('-----------------------------------------------------------')
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

}


/* set phrase in case user character doesn't own any items yet */
const itemList = document.querySelector(".item-list");
const introPhrase = document.getElementById("intro-phrase")

if (itemList.childNodes.length === 3) {
  introPhrase.style.display = 'unset'
}

