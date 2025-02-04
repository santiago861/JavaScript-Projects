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

let quantityCurrencies = [];
for (let i = 0; i < currencyValues.length; i++) {
  quantityCurrencies.push(Math.round(cid[i][1] / currencyValues[i]));
}


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
  } else if (entry > cid.reduce((acc, el) => acc + el[1], 0)) {
    displayStatus()
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
  let changeDue = customerMoney - price;

  for (let i = (cid.length) - 1; i >= 0; i--) {
    let count = quantityCurrencies[i];
    let coinsUsed = 0;
    
    if (changeDue > currencyValues[i]) {
      while (count > 0 && changeDue > currencyValues[i]) {
        console.log(cid[i][0])
        changeDue -= currencyValues[i];
        count -= 1;
        coinsUsed += 1;
        quantityCurrencies[i] = count;
        cid[i][1] = quantityCurrencies[i] * currencyValues[i]
      }
      console.log(changeDue)
      changeText.innerHTML += `<div>${cid[i][0]}: $${currencyValues[i] * coinsUsed}</div>`
      console.log(quantityCurrencies)
    }
  }
  
}

const displayStatus = () => {
  const totalCashInDrawer = cid.reduce((acc, el) => acc + el[1], 0);
  if (totalCashInDrawer < input.value - price) {
    changeText.textContent = 'Status: INSUFFICIENT_FUNDS';
  } else if (totalCashInDrawer === input.value - price) {
    changeText.textContent = 'Status: CLOSED';
  } else if (totalCashInDrawer > input.value - price) {
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
    updateScreenCashInDrawer(cid);  
  }
})
input.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    updateScreenCashInDrawer(cid);
    if (verifyInput(input)) {
      displayStatus()
      calculateChange(input.value);
      updateScreenCashInDrawer(cid);
    }
  }
})
