// return change to the customer based on the price of the item, the amount of cash provided by the customer, and the amount of cash in the cash drawer

// show different messages to the user in different scenarios, such as when the customer provides too little cash or when the cash drawer doesn't have enough to issue the correct change

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
let cash = 0; // cash provided for the customer (via input on the web page)


// "Status: INSUFFICIENT_FUNDS": if cash-in-drawer is less than the change due, or if you cannot return the exact change.
// "Status: CLOSED": if cash-in-drawer is equal to the change due.
// "Status: OPEN": if cash-in-drawer is greater than the change due and you can return change, with the change due in coins and bills sorted in highest to lowest order.