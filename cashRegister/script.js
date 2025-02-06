// return change to the customer based on the price of the item, the amount of cash provided by the customer, and the amount of cash in the cash drawer
let price = 1.87;
let cid = [['PENNY', 1.01], ['NICKEL', 2.05], ['DIME', 3.1], ['QUARTER', 4.25], ['ONE', 90], ['FIVE', 55], ['TEN', 20], ['TWENTY', 60], ['ONE HUNDRED', 100]];
// 
// let price = 19.5;
// let cid = [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]
// let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]

const currencyValues = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
const changeText = document.getElementById('change-due');
const input = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const textPrice = document.getElementById('price');
textPrice.textContent = `Total: $${price}`;
const cidContainer = document.getElementById('cid');
let quantityCurrencies = [];
for (let i = 0; i < currencyValues.length; i++) {
  quantityCurrencies.push(Math.round(cid[i][1] / currencyValues[i]));
}



// Functions -------------------------------------------------------------------------
const verifyInput = () => {
  let sumCashInDrawer = parseFloat((cid.reduce((acc, el) => acc + el[1], 0)).toFixed(2))
  let inputValue = parseFloat((parseFloat(input.value)).toFixed(2));
  let change = parseFloat((parseFloat(inputValue - price)).toFixed(2));

  if (change === sumCashInDrawer){
    return true;
  } 
  if (!inputValue) {
    alert('Please, enter some money');
  } else if(inputValue < price) {
    alert('Customer does not have enough money to purchase the item');
  } else if (change > sumCashInDrawer) {
    displayStatus()
  } else {
    return true;
  }
}



// function that updates the visual screen on the HTML
const updateScreenCashInDrawer = (arr) => {
  cidContainer.innerHTML = '';
  for (let i = 0; i < cid.length; i++) {
    const quantity = cid[i][1] / currencyValues[i];
    cidContainer.innerHTML += `<div><span>${cid[i][0].charAt(0) + cid[i][0].slice(1).toLowerCase()}</span>: $${cid[i][1]} --- ${Math.round(quantity)} u</div>`
  } 
}
updateScreenCashInDrawer(cid); // call function to see the initial balance in the cash drawer




const calculateChange = (customerMoney) => {
  let changeDue = parseFloat((customerMoney - price).toFixed(2));
  let possible = false;

// the flag possible was declared to verify if it is possible to return the change with the denominations available

  if (changeDue == 0) {
    possible = true;
  }

  for (let i = (cid.length) - 1; i >= 0; i--) {
    if (changeDue >= currencyValues[i]) {
      let sumToLeft = 0
      for (let j = i; j >= 0; j--) {
        sumToLeft += cid[j][1];
      }
      if (sumToLeft >= changeDue) {
        possible = true;
      }
    }  
  }

  if (possible) {
    for (let i = (cid.length) - 1; i >= 0; i--) {
      let coinsAvailable = quantityCurrencies[i];
      let coinsUsed = 0;
      
      if (changeDue >= currencyValues[i] && quantityCurrencies[i] != 0) { 
        console.log(cid[i][0])
        while (coinsAvailable > 0 && changeDue >= currencyValues[i]) {
          coinsAvailable -= 1;
          coinsUsed += 1;
  
          quantityCurrencies[i] = coinsAvailable;
          changeDue -= parseFloat(currencyValues[i].toFixed(2));
          changeDue = parseFloat(changeDue.toFixed(2));
        }
        cid[i][1] = parseFloat((quantityCurrencies[i] * currencyValues[i]).toFixed(2));
        
        console.log(changeDue)
        changeText.innerHTML += `<p>${cid[i][0]}: $${parseFloat(parseFloat(currencyValues[i] * coinsUsed).toFixed(2))}</p>`
        console.log(quantityCurrencies)
      } else {
        console.log(`${currencyValues[i]} no se uso`)
      }
    }
  } else {
    changeText.innerHTML = '';
    changeText.innerHTML += `<p>Status: INSUFFICIENT_FUNDS</p>`;
  }
  
}

// function that displays the status
const displayStatus = () => {
  changeText.innerHTML = ''
  const totalCashInDrawer = parseFloat(cid.reduce((acc, el) => acc + el[1], 0).toFixed(2));
  const change = parseFloat((input.value - price).toFixed(2));
  
  if (totalCashInDrawer < change) {
    changeText.innerHTML += `<p>Status: INSUFFICIENT_FUNDS</p>`;
  } else if (totalCashInDrawer === change) {
    changeText.innerHTML += `<p>Status: CLOSED</p>`;
  } else if (totalCashInDrawer > change) {
    changeText.innerHTML += `<p>Status: OPEN</p>`;
  } 
  if (input.value == price) {
    changeText.textContent = 'No change due - customer paid with exact cash';
  }
}


// Event Listeners -------------------------------------------------------------------------
purchaseBtn.addEventListener('click', () => {
  updateScreenCashInDrawer(cid);
  if (verifyInput()) {
    displayStatus()
    calculateChange(parseFloat((parseFloat(input.value)).toFixed(2)));
    updateScreenCashInDrawer(cid);  
  } else {
    console.log('invalid input')
  }
})
input.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    updateScreenCashInDrawer(cid);
    if (verifyInput()) {
      displayStatus()
      calculateChange(parseFloat((parseFloat(input.value)).toFixed(2)));
      updateScreenCashInDrawer(cid);
    }
    else {
      console.log('invalid input')
    }
  }
})
