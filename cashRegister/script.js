// return change to the customer based on the price of the item, the amount of cash provided by the customer, and the amount of cash in the cash drawer

let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
const currencyValues = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
const reversedCurrencyValues = currencyValues.slice().reverse();
let reversedCid = cid.slice().reverse();

let reversedQuantityCurrencies = [];
for (let i = 0; i < reversedCurrencyValues.length; i++) {
  reversedQuantityCurrencies.push(Math.round(reversedCid[i][1] / reversedCurrencyValues[i]));
}
console.log(reversedQuantityCurrencies);


const changeText = document.getElementById('change-due');
const input = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');

const textPrice = document.getElementById('price');
textPrice.textContent = `Total: $${price}`;

const cidContainer = document.getElementById('cid');

const verifyInput = (inp) => {
  const entry = input.value;
  if (!entry) {
    alert('Please, enter some money');
  } else if(entry < price) {
    alert('Customer does not have enough money to purchase the item');
  } else {
    return true;
  }
}
const updateScreenCashInDrawer = (arr) => {
  cidContainer.innerHTML = '';
  for (let i = 0; i < cid.length; i++) {
    const quantity = cid[i][1] / currencyValues[i];
    cidContainer.innerHTML += `<div><span>${cid[i][0].charAt(0) + cid[i][0].slice(1).toLowerCase()}</span>: $${cid[i][1]} --- ${Math.round(quantity)} u</div>`
  } 
}
updateScreenCashInDrawer(cid);

const calculateChange = (customerMoney) => {
  const changeDue = customerMoney - price;
  // for (let i = 0; i < reversedCid.length; i++) {
  //   if changeDue
  // }
  // console.log(reversedCid)
}

const displayStatus = () => {
  const totalCashInDrawer = cid.reduce((acc, el) => acc + el[1], 0);
  if (totalCashInDrawer < input.value - price) {
    changeText.textContent = 'Status: INSUFFICIENT_FUNDS';
  } else if (totalCashInDrawer === input.value - price) {
    changeText.textContent = 'Status: CLOSED';
  } else if (totalCashInDrawer > input.value - price) { // with the change due in coins and bills sorted in highest to lowest order.
    changeText.textContent = 'Status: OPEN';
  }
  console.log(input.value - price)
}


// Event Listeners
purchaseBtn.addEventListener('click', () => {
  updateScreenCashInDrawer(cid);
  if (verifyInput(input)) {
    displayStatus()
    calculateChange(input.value);
    
  }
})
input.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    updateScreenCashInDrawer(cid);
    if (verifyInput(input)) {
      displayStatus()
      calculateChange(input.value);
      
    }
  }
})


// mi idea fue invertir el dinero en caja e invertir la cantidad de currency que tenemos de cada mondeda, de ahí vamos a iterar y verificar si el cambio
// es menor al valor de cada currency y si tenemos unidades en caja